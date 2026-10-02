---
title: "Mergerfs + SnapRAID Setup Guide: A Real 18TB Encrypted Array, Configs Included"
description: "How to pool mixed drives with mergerfs and protect them with SnapRAID parity — using the real configuration from an 18TB, 6-drive, LUKS-encrypted home media server, including the mistakes its first week of logs exposed."
date: 2026-10-02
categories: ["media-servers"]
category: "media-servers"
image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=400&fit=crop"
tags: ["media-servers", "mergerfs", "snapraid", "storage", "linux"]
layout: article.njk
---

## Why This Guide Exists

Most mergerfs + SnapRAID guides are written from memory. This one is written from a running server: every config file, schedule and log excerpt below comes from the machine that serves my own media library, captured the week I finished upgrading it.

That upgrade is also the honest part of the story. From June to late September, my mergerfs pool held about 9TB of media across four drives **with no parity at all**. One dead drive would have taken a quarter of the library with it. In the last week of September I added a fifth data drive and a dedicated parity drive and set up SnapRAID. Its first week of logs taught me more than the setup did, and both lessons are in here.

If you just want the configs, skip ahead to **The Real Configuration** below.

## The Short Version: What Each Tool Does

**mergerfs** pools several drives into one folder. My five data drives are mounted individually at `/mnt/disks/disk1` through `disk5`, and mergerfs presents them as a single 18TB `/mnt/storage`. Media servers, download tools and Docker containers only ever see `/mnt/storage`. Every file is still an ordinary file on an ordinary ext4 drive: pull any disk out, plug it into another Linux box, and its files are right there. No striping, no lock-in.

**SnapRAID** adds parity on a schedule. Once a night it reads the data drives and writes parity to a dedicated parity drive. If a data drive dies, SnapRAID rebuilds its contents from the surviving drives plus parity. It's not real-time: anything written since the last sync isn't protected until the next one. For a media library, where files are written once and then only read, that trade-off is almost free.

Together they give you most of what home users want from RAID, with three advantages traditional RAID can't match:

- **Mixed drive sizes.** The parity drive only has to be as large as your *largest* data drive.
- **Add drives one at a time.** No rebuilding the whole array to grow it.
- **Failure is contained.** Lose more drives than you have parity for, and you lose *those drives' files*, not the entire array.

## When Not to Use It

- **Databases, VMs, and anything with constant small writes.** Parity lags behind changes, and a file that changes mid-sync can't be protected reliably. (It's why my container configs live on the NVMe, not the pool.)
- **Data you can't afford to lose since the last sync.** Nightly parity means up to a day of exposure.
- **As a backup.** Parity protects against drive failure. It does nothing against ransomware, a mistaken `rm -rf`, a fire, or a bad sync that faithfully records the damage. See our [3-2-1 backup guide](/storage/backup-media-library-3-2-1-guide/).

For a library of movies, shows and music, it's an excellent fit.

## The Real Hardware

| Component | What's in the box |
|---|---|
| CPU | Intel Core i9-10900 (10 cores / 20 threads) |
| OS | Linux Mint 22.2 on a Crucial P3 1TB NVMe |
| Data drives 1–4 | 4 × Seagate BarraCuda 2.5" 4TB (ST4000LM024), **shucked** from Seagate Portable external drives |
| Data drive 5 | Seagate IronWolf 4TB (ST4000VN006), new in the upgrade |
| Parity drive | Seagate IronWolf 4TB (ST4000VN006), new in the upgrade |
| Pool | mergerfs 2.33.5, **18TB, 11TB used (61%)** |
| Encryption | Every data and parity drive is a LUKS container |

### SMR Data Drives, CMR Parity: Why the Mix Works

The four shucked BarraCudas are **SMR** drives. That's the drive technology most NAS guides, including [our own hard drive guide](/storage/best-nas-hard-drives-2026/), tell you to avoid. For a traditional RAID array that's sound advice: SMR drives slow to a crawl under the sustained random writes of a RAID rebuild.

SnapRAID changes the maths. During a sync it only *reads* the data drives. The drive that gets written on every sync is the **parity** drive. A media library mostly receives large, sequential writes, which SMR handles reasonably well. In this array the cheap shucked SMR drives sit in the data slots, and a CMR IronWolf sits in the parity slot, where write behaviour matters most. If you're mixing drive types, that's the arrangement to aim for.

<!-- AFFILIATE PLACEHOLDER: replace search URL with specific ASIN link -->
<div class="affiliate-box">
  <div class="affiliate-box-content">
    <div class="affiliate-box-title">Seagate IronWolf 4TB (ST4000VN006)</div>
    <div class="affiliate-box-description">The CMR NAS drive in this server's parity slot and fifth data bay</div>
  </div>
  <a href="https://www.amazon.com/s?k=seagate+ironwolf+4tb+st4000vn006&tag=easyhtpc-20" target="_blank" rel="nofollow sponsored noopener" class="affiliate-box-link">Check Price on Amazon →</a>
</div>

### If You Encrypt, Encrypt the Parity Drive Too

SnapRAID works on the *decrypted* filesystems, so parity is computed from your plaintext data. Drives fill unevenly, though, so there are regions of the parity file where only one data drive contributes. In those regions, the parity block **is** that drive's plaintext. An unencrypted parity drive next to encrypted data drives leaks real data. In my array the parity drive is LUKS-encrypted like the rest.

## The Real Configuration

### Drive Layout

```
NAME            SIZE  TYPE   MOUNTPOINT
sda             3.6T  disk   (LUKS) → pool_disk2   → /mnt/disks/disk2
sdb             3.6T  disk   (LUKS) → pool_disk1   → /mnt/disks/disk1
sdc             3.6T  disk   (LUKS) → pool_disk4   → /mnt/disks/disk4
sdd             3.6T  disk   (LUKS) → pool_disk3   → /mnt/disks/disk3
sde             3.6T  disk   (LUKS) → pool_disk5   → /mnt/disks/disk5
sdf             3.6T  disk   (LUKS) → parity_disk1 → /mnt/parity1
nvme0n1         931G  disk   (LUKS + LVM) → /  (OS, Docker, container configs)
```

Notice that `sda` is disk2 and `sdb` is disk1. Device letters are assigned by detection order and can change between boots. Never reference `/dev/sdX` in configs. Mount by mapper name, label or UUID.

### fstab

Each data drive mounts individually, then mergerfs pools them:

```
/dev/mapper/pool_disk1   /mnt/disks/disk1  ext4  defaults,nofail,x-systemd.device-timeout=120  0 2
/dev/mapper/pool_disk2   /mnt/disks/disk2  ext4  defaults,nofail,x-systemd.device-timeout=120  0 2
/dev/mapper/pool_disk3   /mnt/disks/disk3  ext4  defaults,nofail,x-systemd.device-timeout=120  0 2
/dev/mapper/pool_disk4   /mnt/disks/disk4  ext4  defaults,nofail,x-systemd.device-timeout=120  0 2
/dev/mapper/pool_disk5   /mnt/disks/disk5  ext4  defaults,nofail,x-systemd.device-timeout=120  0 2
/dev/mapper/parity_disk1 /mnt/parity1      ext4  defaults,nofail,x-systemd.device-timeout=120  0 2

/mnt/disks/disk1:/mnt/disks/disk2:/mnt/disks/disk3:/mnt/disks/disk4:/mnt/disks/disk5  /mnt/storage  mergerfs  allow_other,cache.files=partial,category.create=pfrd,func.getattr=newest,dropcacheonclose=false,x-systemd.requires=/mnt/disks/disk1,x-systemd.requires=/mnt/disks/disk2,x-systemd.requires=/mnt/disks/disk3,x-systemd.requires=/mnt/disks/disk4,x-systemd.requires=/mnt/disks/disk5  0 0
```

The options that matter:

- **Explicit branches, not a glob.** Many guides use `/mnt/disk*`. Listing every disk explicitly means the pool's membership is written down, and the health check below can verify exactly that list.
- **`category.create=pfrd`** ("percentage free, random distribution") places each new file on a random drive, weighted toward drives with more free space. It's mergerfs's current default, and it fills drives evenly without the trap below.
- **`func.getattr=newest`.** When a folder exists on several drives, report the newest modification time. Media-server library scanners use folder timestamps to spot new content, so this helps them notice changes.
- **`cache.files=partial`** lets the kernel cache file data, which helps repeated reads.
- **`x-systemd.requires=`** for every branch makes the pool mount wait for each drive.
- **`nofail`** lets the machine boot even if a drive is missing. That's convenient, and also dangerous, which is what the health check is for.

### The Trap in "Existing Path" Policies

Older guides, including the previous version of this one, recommend `epmfs` (existing path, most free space). It keeps folders together, but it only considers drives where the target folder *already exists*. Once those drives fill up, writes fail with "No space left on device" while the pool still shows terabytes free. `pfrd` doesn't have that failure mode. If you need certain folders kept together, `epmfs` is fine; just understand why the pool will one day claim to be full.

### snapraid.conf

```
parity /mnt/parity1/snapraid.parity

content /var/snapraid/snapraid.content
content /mnt/disks/disk1/.snapraid.content
content /mnt/disks/disk2/.snapraid.content
content /mnt/disks/disk3/.snapraid.content
content /mnt/disks/disk4/.snapraid.content
content /mnt/disks/disk5/.snapraid.content

data d1 /mnt/disks/disk1
data d2 /mnt/disks/disk2
data d3 /mnt/disks/disk3
data d4 /mnt/disks/disk4
data d5 /mnt/disks/disk5

exclude *.unrecoverable
exclude /tmp/
exclude /lost+found/
exclude .DS_Store
exclude ._*
exclude *.!sync
exclude /appdata/
exclude /backups/appdata/
exclude /timeshift/
# (one site-specific exclude for an in-progress download folder trimmed)

blocksize 256
autosave 500
```

Why it looks like this:

- **Six copies of the content file.** The content file is SnapRAID's index of every file and block. Lose all copies and parity is useless. Each copy is about 740MB for 11TB of data, and there's one on every data drive plus one on the NVMe.
- **`autosave 500`** saves SnapRAID's progress every 500GB during a sync. If an initial sync of many terabytes is interrupted, you lose at most the last 500GB of work instead of starting over. (Mine was cut off by a reboot after about five minutes, too early for any autosave to have happened, so it simply ran again.)
- **Excluded: constantly changing data.** Container configs, databases and half-finished downloads change during the sync window, and changing files are what SnapRAID protects worst.
- **Parity size.** My parity file is 2.87TB, not 11TB. The parity file grows to roughly the size of the *fullest* data drive's protected data, not the total. That's why one 4TB parity drive can protect five 4TB data drives.

## The Guard: Never Start Docker on a Half-Mounted Pool

This is the piece most guides miss, and it's the piece I'd copy first.

Because of `nofail`, the server will boot happily with a drive missing. mergerfs will then pool whatever drives *did* mount. Docker starts, a container looks for its files, doesn't find them (they're on the missing drive), and writes fresh defaults onto one of the drives that is present. When the missing drive comes back, you have two copies of the same path on different drives. mergerfs shows you one of them, and it may not be the one you want.

My server blocks that with a small check that runs before Docker:

{% raw %}
```bash
#!/usr/bin/env bash
# /usr/local/bin/pool-health-check.sh
# Verify every expected mergerfs branch is mounted before Docker starts.
set -uo pipefail
DISKS=(/mnt/disks/disk1 /mnt/disks/disk2 /mnt/disks/disk3 /mnt/disks/disk4 /mnt/disks/disk5)
MISSING=()
for d in "${DISKS[@]}"; do
  mountpoint -q "$d" || MISSING+=("$d")
done
if ! mountpoint -q /mnt/storage; then
  echo "POOL FAIL: /mnt/storage is not mounted"; exit 1
fi
if [ ${#MISSING[@]} -gt 0 ]; then
  echo "POOL FAIL: branches not mounted: ${MISSING[*]}"
  echo "Docker is being held back to protect appdata from being overwritten."
  exit 1
fi
echo "POOL OK: all ${#DISKS[@]} branches mounted"
```
{% endraw %}

It runs as a one-shot systemd service, `pool-health.service`, ordered `Before=docker.service`. A drop-in makes Docker depend on it:

```ini
# /etc/systemd/system/docker.service.d/10-wait-for-storage.conf
[Unit]
RequiresMountsFor=/mnt/storage
After=mnt-storage.mount pool-health.service
Requires=pool-health.service
```

If any drive is missing, Docker doesn't start. You fix the drive, then run `sudo systemctl start docker`. An evening of downtime beats an evening untangling duplicate config folders.

**When you add a drive, update the `DISKS` list.** The check only knows about the drives you tell it about.

## The Schedule

```
# /etc/cron.d/snapraid
0 4 * * *   root /usr/local/bin/snapraid-sync.sh
0 5 * * 0   root snapraid scrub -p 8 -o 10 >> /var/log/snapraid.log 2>&1
```

- **Nightly sync at 4:00 AM.** On my array, routine syncs take **4.5 to 18 minutes**.
- **Weekly scrub, Sunday 5:00 AM.** `-p 8 -o 10` re-reads 8% of the array, choosing blocks not checked in the last 10 days, and verifies them against parity. That catches silent corruption and failing sectors *before* you need them for a rebuild. Over a few months, every block gets checked. If your guide never mentions scrubbing, it's only telling you half the job.

## What the First Week of Logs Exposed

### 1. My sync script reported success when the sync had failed

Here's the sync wrapper as it was written:

```bash
#!/usr/bin/env bash
set -uo pipefail
LOG=/var/log/snapraid.log
echo "=== $(date) sync ===" >> "$LOG"
snapraid sync >> "$LOG" 2>&1
echo "=== $(date) sync done (rc=$?) ===" >> "$LOG"
```

It looks right. Now here's Monday's 4 AM entry from the log:

```
=== Mon Sep 28 04:00:01 AM EDT 2026 sync ===
The lock file '/var/snapraid/snapraid.content.lock' is already in use!
SnapRAID is already in use!
=== Mon Sep 28 04:00:01 AM EDT 2026 sync done (rc=0) ===
```

The sync failed: the initial sync was still running and held the lock. Yet it logged **`rc=0`**. The bug is in the last line. Bash expands `$(date)` *before* `$?`, and running `date` resets `$?` to `date`'s own exit code, which is always 0. So this script reports success no matter what SnapRAID does. You can prove it in one line:

```bash
bash -c 'false; echo "rc=$?"'            # rc=1  — correct
bash -c 'false; echo "$(date) rc=$?"'    # ... rc=0 — wrong
```

The fix is to capture the exit code immediately and pass it on:

```bash
#!/usr/bin/env bash
set -uo pipefail
LOG=/var/log/snapraid.log
echo "=== $(date) sync ===" >> "$LOG"
snapraid sync >> "$LOG" 2>&1
rc=$?
echo "=== $(date) sync done (rc=$rc) ===" >> "$LOG"
exit "$rc"
```

Two more lessons from that night:

- **The nightly job collided with the first sync.** An initial sync of ~11TB runs for hours. Mine was running at about 255 MB/s with the CPU at 7–9%, and it was still going at 4 AM. SnapRAID's lock file correctly refused to run twice, so no harm was done. But the cron job should be disabled until the initial sync has finished.
- **A log that always says `rc=0` is worse than no log.** It trains you to stop reading it. If you alert on failures, alert on the real exit code.

### 2. The first sync stopped on read errors

The very first sync aborted with:

```
DANGER! Unexpected input/output read error in a data disk, it isn't possible to sync.
```

It had hit read errors on five files across four of the data drives. Here's what I checked, in order, before assuming a drive was dying:

1. **Where were the errors?** All five files sat inside desktop trash folders (`.Trash-1000`) on the data drives. These were deleted files the file manager had moved to a hidden per-drive trash, about 105GB in total. They were spread almost evenly across four drives. A failing drive doesn't sort its bad sectors into the trash folder.
2. **Did the kernel log any disk errors?** No I/O, medium-error, link-reset or filesystem errors, in that boot or since.
3. **Can the files be read now?** All five read cleanly from start to finish.
4. **What was happening at the time?** The server rebooted four times that evening while drives were being installed. The first sync started at 7:27 PM, and the machine rebooted at 7:32.

I haven't pinned down the root cause. The pattern points at something transient during the upgrade session rather than failing hardware, and every sync since reads "Everything OK." Still, read errors earn a SMART check of every drive (`sudo smartctl -a /dev/sdX`) and close attention to the first few scrubs.

The practical lesson: **exclude desktop trash folders from SnapRAID.** Mine was protecting 105GB of files that had already been deleted:

```
exclude .Trash-*/
```

### 3. SnapRAID told me I need more parity

Every run prints:

```
WARNING! For 5 disks, it's recommended to use two parity levels.
```

It's right. With one parity drive, the array survives **one** drive failure. A second failure during the rebuild costs that drive's files. With five data drives, four of them shucked and of unknown age, a second parity drive is the next upgrade. Adding one is a single config line plus a sync:

```
2-parity /mnt/parity2/snapraid.2-parity
```

## Adding a Drive: What the Upgrade Involved

Growing the pool from four data drives to five, plus adding parity, came down to these steps:

1. **Install the drives** and identify them with `lsblk`. Note the model names, not the `sdX` letters.
2. **Encrypt each drive** with LUKS and set it to unlock at boot, the same way as the existing drives. (Skip this step if you don't encrypt.)
3. **Create ext4 filesystems** on the unlocked devices.
4. **Add an fstab line for each drive**, using the mapper name, with `nofail`.
5. **Add the new data drive to the mergerfs line**, both the branch list *and* an `x-systemd.requires=` entry, then remount the pool.
6. **Add the drive to the health check's `DISKS` list.**
7. **Add `data` and `content` lines** for the new drive, and a `parity` line for the parity drive, to `snapraid.conf`.
8. **Disable the nightly sync cron job**, run the initial `snapraid sync` by hand, then re-enable it.

No data moved. The existing drives kept their files, and with `pfrd` the new, mostly empty drive simply receives more of the new writes from now on.

## Recovering From a Failed Drive

When a data drive dies:

1. **Stop writing to the pool.** Every change since the last sync shrinks what parity can rebuild.
2. **Replace the drive** with one at least as large, then set it up (LUKS, ext4) and mount it at the **same path** as the old one.
3. **Rebuild it:**
   ```bash
   sudo snapraid -d d3 -l fix.log fix
   ```
   Replace `d3` with the failed drive's name from `snapraid.conf`.
4. **Verify it:**
   ```bash
   sudo snapraid -d d3 -a check
   ```
5. **Sync** once everything checks out.

To **practise** recovery without risking anything, copy a single file off the pool, delete the original, and restore it with `sudo snapraid fix -f "/path/to/that/file"` (the path as it sits on its data drive, which `snapraid diff` or `ls /mnt/disks/*/...` will show you). **Never** practise by commenting a drive out of `snapraid.conf` and running `sync`. That recomputes parity *without* the drive, and its files are left unprotected without any warning. (An earlier version of this guide recommended exactly that. It's gone.)

## Useful Commands

```bash
sudo snapraid status      # array health, sync age, scrub coverage
sudo snapraid diff        # what the next sync will change (good before syncing after big deletions)
sudo snapraid smart       # SMART summary and failure-probability estimate for every drive
sudo snapraid scrub -p 5  # verify a slice of the array against parity
df -h /mnt/disks/* /mnt/parity1 /mnt/storage
```

Run `snapraid diff` before syncing after large deletions. If it shows thousands of files removed that you didn't remove, a drive may have failed to mount. Don't sync, because the sync would record those files as gone.

## Bottom Line

mergerfs + SnapRAID is the best storage setup I know of for a home media library. It's cheap, it grows a drive at a time, it tolerates mixed and shucked drives, and a failure costs you a weekend rather than your library. But it's only as good as the parts nobody puts in the tutorials:

- A **guard** that stops services starting on a half-mounted pool
- **Weekly scrubs**, not just nightly syncs
- A sync script whose exit codes you can **trust**
- **Parity proportional to your drive count**
- And, as with anything, a **real backup** of what you can't replace

Mine ran for four months with no parity at all, then had a sync script that couldn't report failure. Both are fixed now. Check yours.

## Related Reading

- [Best NAS Hard Drives: CMR, SMR, and When It Matters](/storage/best-nas-hard-drives-2026/)
- [RAID Levels Explained for Media Servers](/storage/raid-levels-explained-media-server/)
- [How to Back Up a Media Library: The 3-2-1 Strategy](/storage/backup-media-library-3-2-1-guide/)
- [SSD vs HDD for Media Servers](/storage/ssd-vs-hdd-media-server-2026/)
- [Jellyfin Hardware Transcoding on the Same Server](/media-servers/jellyfin-hardware-transcoding-guide/)
