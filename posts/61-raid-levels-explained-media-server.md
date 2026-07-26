---
title: "RAID Levels Explained: Which RAID Setup Is Right for Your Media Server?"
description: "RAID 0, 1, 5, 6, 10, or ZFS's RAID-Z — every level trades capacity, speed, and drive-failure protection differently. Here's how to pick the right one for a Plex or Jellyfin server without wasting money or risking your library."
date: 2026-07-26
categories: ["storage"]
category: "storage"
image: "https://images.unsplash.com/photo-1762163516269-3c143e04175c?w=800&h=400&fit=crop"
tags: ["raid", "storage", "nas", "zfs", "media-server"]
layout: article.njk
---

# RAID Levels Explained: Which RAID Setup Is Right for Your Media Server?

RAID gets treated like a checkbox — "yes, my NAS has RAID, so my media library is safe." That's the single most common misunderstanding in home server storage. RAID protects against a drive dying. It does nothing for the file you accidentally deleted, the ransomware that encrypted your share, or the power surge that fried every drive in the array at once. Get that straight first, because it changes which RAID level actually makes sense for you — and whether you need one at all.

This guide breaks down every RAID level you'll actually encounter in a home media server — RAID 0, 1, 5, 6, 10, and ZFS's RAID-Z family — in terms of what matters to a Plex or Jellyfin build: usable capacity, read/write speed, how many drives can die before you lose everything, and rebuild risk.

## What RAID Actually Does

RAID (Redundant Array of Independent Disks) combines multiple physical drives into one logical volume using one of two mechanisms:

- **Striping** — splitting data across drives to increase speed (and, with no redundancy, increase risk)
- **Mirroring or parity** — duplicating data or storing recovery math so the array survives a drive failure

Every RAID level is some combination of those two ideas. None of them are a backup. If you want an actual safety net for accidental deletion or site-wide disaster, that's a separate job — see our [3-2-1 backup guide for media libraries](/storage/backup-media-library-3-2-1-guide/).

## RAID 0: Striping, No Redundancy

RAID 0 splits data evenly across two or more drives with zero redundancy. Lose one drive, lose the entire array.

- **Usable capacity**: 100% (all drives combined)
- **Speed**: Fastest of any RAID level — reads and writes scale with drive count
- **Fault tolerance**: None — a single drive failure destroys everything

RAID 0 has essentially no place in a media server. The tiny speed gain (media streaming needs ~15-25 MB/s per 4K stream — any single modern drive clears that alone) isn't worth multiplying your failure risk. Skip it.

## RAID 1: Mirroring

RAID 1 writes identical data to two (or more) drives. Either drive can die and the array keeps running.

- **Usable capacity**: 50% (with 2 drives) — you pay for redundancy in raw storage
- **Speed**: Read speed can improve (two drives can serve different reads simultaneously); write speed matches a single drive
- **Fault tolerance**: Survives 1 drive failure (with a 2-drive mirror)

RAID 1 is the right call for small, two-bay setups — a compact NAS holding your active library where simplicity matters more than capacity efficiency. It's also the easiest RAID level to understand and recover: a failed drive swap is a straightforward rebuild.

## RAID 5: Single Parity

RAID 5 stripes data across three or more drives and distributes parity information across all of them, so any single drive can fail without data loss.

- **Usable capacity**: (n-1) drives — a 4-drive RAID 5 gives you 3 drives' worth of space
- **Speed**: Good read speed; writes take a parity-calculation hit
- **Fault tolerance**: Survives exactly 1 drive failure

RAID 5 was the default recommendation for years, and it's still fine for smaller arrays. The catch that gets people: on large drives (think 12TB+), a rebuild after a failure can take 12-24+ hours, during which a second drive failure — not unlikely, given rebuild stress hits every remaining drive hard — wipes the array. This is the widely-cited "RAID 5 is dead" argument, and it's legitimate once you're using drives above roughly 6-8TB.

## RAID 6: Double Parity

RAID 6 is RAID 5's answer to that rebuild-window risk: it writes two independent parity blocks across four or more drives.

- **Usable capacity**: (n-2) drives — a 6-drive RAID 6 gives you 4 drives' worth of space
- **Speed**: Similar read speed to RAID 5; write speed is slower due to double-parity overhead
- **Fault tolerance**: Survives 2 simultaneous drive failures

For any array built with modern high-capacity drives (10TB+), RAID 6 is the safer default over RAID 5. The extra parity drive costs you capacity, but it buys real insurance during the multi-hour rebuild window where you're most exposed.

## RAID 10: Mirroring + Striping

RAID 10 (1+0) combines mirrored pairs with striping across those pairs — you need a minimum of four drives.

- **Usable capacity**: 50% regardless of drive count
- **Speed**: Excellent for both reads and writes — no parity calculation overhead
- **Fault tolerance**: Survives multiple failures, as long as you don't lose both drives in the same mirrored pair

RAID 10 is overkill for pure media storage — the write-speed advantage matters for databases and VMs, not for serving video files. It earns its keep if your server also runs demanding write workloads (a *arr stack hammering a download-and-import cycle, or a database-heavy app) alongside the media library.

## ZFS and RAID-Z: The Modern Alternative

ZFS isn't hardware RAID — it's a filesystem with RAID-like redundancy built in (RAID-Z1, RAID-Z2, RAID-Z3, roughly mapping to RAID 5/6/triple-parity), plus features traditional RAID doesn't have:

- **Checksumming** on every block, catching silent data corruption ("bit rot") that RAID alone never notices
- **Snapshots** that are near-instant and cost almost nothing until data changes
- **Self-healing** — on a redundant array, ZFS repairs corrupted blocks automatically using the healthy copy

This is why TrueNAS and Unraid-adjacent ZFS pools have become the go-to recommendation over classic hardware RAID for new builds — see our full [Unraid vs TrueNAS vs Synology DSM comparison](/storage/unraid-vs-truenas-vs-synology-dsm-2026/) for how each platform implements it. The tradeoff is RAM: ZFS wants more memory than a comparable RAID 5/6 array (roughly 1GB per TB is the old rule of thumb, though modern ZFS is more flexible), which matters if you're building on a lean [N100 box](/mini-pcs/intel-n100-vs-n305-home-server-2026/).

## Side-by-Side Comparison

| RAID Level | Min. Drives | Usable Capacity | Fault Tolerance | Best For |
|---|---|---|---|---|
| RAID 0 | 2 | 100% | None | Never, for media |
| RAID 1 | 2 | 50% | 1 drive | Small 2-bay NAS |
| RAID 5 | 3 | (n-1) drives | 1 drive | Small/mid arrays, smaller drives |
| RAID 6 | 4 | (n-2) drives | 2 drives | Mid/large arrays, 10TB+ drives |
| RAID 10 | 4 | 50% | 1 per mirror pair | Mixed media + database workloads |
| RAID-Z2 (ZFS) | 4 | (n-2) drives | 2 drives + bit-rot protection | New builds, TrueNAS/Unraid |

## What Actually Matters for a Media Server

A few things cut through the noise once you strip RAID down to what a Plex or Jellyfin server needs:

1. **Streaming doesn't need RAID's speed.** Even 4K remuxes need ~15-25 MB/s; any modern drive or even a 1GbE network link handles that alone, mirrored or not. Choose RAID for **failure tolerance**, not throughput.
2. **Capacity efficiency vs. safety margin is the real tradeoff.** RAID 5 gives you more usable space; RAID 6 or RAID-Z2 gives you a second drive's worth of insurance. On arrays with 10TB+ drives, take the insurance.
3. **RAID is not a backup.** A dead controller, a fire, a ransomware hit, or a fat-fingered `rm -rf` takes out a RAID array exactly as fast as a single drive. Pair whatever RAID level you pick with an actual [3-2-1 backup strategy](/storage/backup-media-library-3-2-1-guide/) for anything irreplaceable.
4. **If you're not running true RAID at all, that's a legitimate choice too.** [Mergerfs + SnapRAID](/media-servers/mergerfs-snapraid-guide/) pools drives without striping and snapshots parity on a schedule instead of live — cheaper hardware requirements, slower parity updates, and drives you can read individually even if the pool breaks.

<!-- AFFILIATE PLACEHOLDER: replace search URL with specific ASIN link -->
<div class="affiliate-box">
  <div class="affiliate-box-content">
    <div class="affiliate-box-title">Synology DS923+ 4-Bay NAS</div>
    <div class="affiliate-box-description">Runs SHR (Synology's flexible RAID) or classic RAID 5/6 out of the box, no Linux knowledge needed</div>
  </div>
  <a href="https://www.amazon.com/s?k=synology+ds923%2B+nas&tag=easyhtpc-20" target="_blank" rel="nofollow sponsored noopener" class="affiliate-box-link">Check Price on Amazon →</a>
</div>

## Choosing a RAID Level: Quick Decision Guide

- **Two bays, want it simple**: RAID 1
- **Three to four bays, drives under 8TB**: RAID 5
- **Four-plus bays, drives 10TB+, or you've been burned by a rebuild before**: RAID 6 or RAID-Z2
- **Running VMs/databases alongside media**: RAID 10
- **Building fresh on TrueNAS/Unraid with ZFS available**: RAID-Z2 — take the bit-rot protection and snapshots
- **Budget build, mismatched drive sizes, want individually-readable disks**: Skip RAID, use Mergerfs + SnapRAID instead

Whatever you land on, buy drives rated for the job — RAID rebuild stress is exactly where consumer desktop drives fail. Our [NAS hard drive guide](/storage/best-nas-hard-drives-2026/) covers why CMR, NAS-class drives matter here, and if you're deciding between an all-flash and spinning-disk approach first, see [SSD vs HDD for media servers](/storage/ssd-vs-hdd-media-server-2026/).

## Bottom Line

For most home media servers being built today: **RAID 6 or ZFS's RAID-Z2** is the sweet spot — it survives two simultaneous drive failures, which is exactly the scenario that turns a routine rebuild into a data-loss event on today's high-capacity drives. Drop to RAID 5 or RAID 1 only if you're working with a small array or older, smaller drives where the extra parity drive isn't worth the capacity cost. And no matter which level you choose, RAID is uptime insurance, not a backup — keep a real copy of anything you can't re-download.

## Related Reading

- [Unraid vs TrueNAS vs Synology DSM: Which NAS Operating System Fits Your Media Server?](/storage/unraid-vs-truenas-vs-synology-dsm-2026/)
- [How to Back Up a Media Library: The 3-2-1 Strategy for Home Servers](/storage/backup-media-library-3-2-1-guide/)
- [Mergerfs + SnapRAID: The Budget RAID Alternative](/media-servers/mergerfs-snapraid-guide/)
