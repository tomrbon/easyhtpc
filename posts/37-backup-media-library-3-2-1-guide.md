---
title: "How to Back Up a Media Library: The 3-2-1 Strategy for Home Servers"
description: "RAID is not a backup. Learn how to actually protect a multi-terabyte media library with the 3-2-1 strategy — what to back up, what to skip, and the cheapest tools and drives that make it painless."
date: 2026-06-10
categories: ["storage"]
category: "storage"
image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=800&h=400&fit=crop"
tags: ["storage", "backup", "3-2-1", "media-server", "snapraid"]
layout: article.njk
---

# How to Back Up a Media Library: The 3-2-1 Strategy for Home Servers

Somewhere out there is a person restoring a 40TB media library from scratch, one download and one disc rip at a time, because a power surge took out their NAS and "RAID was the backup." Don't be that person.

The good news: backing up a media server is cheaper and lazier than most guides admit, because *most of your data doesn't need real backup*. This guide shows you how to apply the classic 3-2-1 rule intelligently — full protection for the irreplaceable, cheap parity for the merely inconvenient.

## The 3-2-1 Rule, Briefly

- **3** copies of your data (the original plus two backups)
- **2** different media/devices
- **1** copy offsite

That standard is designed for data you cannot recreate. Applying it to 40TB of movies would cost more than the movies. So the first step is triage.

## Step 1: Split Your Data Into Tiers

**Tier 1 — Irreplaceable (full 3-2-1, no excuses):**

- Family photos and home video
- Documents
- Server configuration: Docker compose files, Plex/Jellyfin databases, watch history, metadata edits
- Any media you created or digitized from media you no longer own

This tier is usually under 500GB. Backing it up properly costs almost nothing.

**Tier 2 — Re-acquirable media (parity + inventory):**

- Ripped discs you still own, downloaded/purchased content

Losing a drive here costs time, not memories. Protect it with parity (SnapRAID) and keep a *list* of what you had so you can re-rip or re-acquire.

## Step 2: Parity for the Bulk Media (SnapRAID)

For big media arrays on a DIY server, SnapRAID gives you drive-failure protection without RAID's lockstep constraints: mixed drive sizes, files stay readable individually, and you can add drives anytime. One parity drive survives one failed data drive; two parity drives survive two.

We cover the full setup in our [Mergerfs + SnapRAID guide](/media-servers/mergerfs-snapraid-guide/). If you run a Synology/QNAP NAS instead, SHR/RAID5 fills the same role — with the same caveat:

> Parity protects against **drive failure**. It does nothing against accidental deletion you don't notice, ransomware, fire, flood, or a failed controller writing garbage. That's what backups are for.

## Step 3: Real Backups for Tier 1

### Local copy: one external drive

A single USB hard drive covers "second copy, different device." Plug it in weekly (or leave it attached and schedule it), sync Tier 1, disconnect if you're worried about ransomware.

<!-- AFFILIATE PLACEHOLDER: replace search URL with specific ASIN link -->
<div class="affiliate-box">
  <div class="affiliate-box-content">
    <div class="affiliate-box-title">WD Elements 12TB External Drive</div>
    <div class="affiliate-box-description">Cheap cold-storage per terabyte — ideal as a weekly backup target</div>
  </div>
  <a href="https://www.amazon.com/s?k=wd+elements+12tb+external&tag=easyhtpc-20" target="_blank" rel="nofollow sponsored noopener" class="affiliate-box-link">Check Price on Amazon →</a>
</div>

Good tools, all free:

- **restic** or **borg** — deduplicated, encrypted, versioned snapshots (Linux/macOS)
- **rsync** — simple mirroring when versioning doesn't matter
- **Hyper Backup / Active Backup** — built into Synology

### Offsite copy: cloud or a drive elsewhere

- **Backblaze B2 / Wasabi**: ~$5–6/TB/month. For a 300GB Tier 1, that's pocket change. Both plug directly into restic, borg via rclone, and NAS backup apps.
- **The buddy system**: swap encrypted USB drives with a friend or leave one at work/family. Free and surprisingly robust — update it monthly.

For huge Tier 1 sets (say, a lifetime of home video), a second external drive stored offsite beats cloud on price.

## Step 4: Protect the Server's Brain

The most annoying loss isn't media — it's the months of curation living in your server databases. Automate this:

1. **Plex**: back up the `Plex Media Server` data directory (watch states, collections, intro markers). Plex's built-in scheduled database backups only cover part of it.
2. **Jellyfin**: back up `/config` (database, metadata, users).
3. **Docker stacks**: your compose files + volume mounts. Keep compose files in a git repo — it's version control *and* an offsite copy in one move.
4. **A media inventory**: a nightly `find /mnt/media -type f > inventory.txt` into the backup set turns a catastrophic loss into a shopping list.

## A Concrete Cheap Setup

For a typical 20–40TB home server:

| Layer | Tool | Cost |
|---|---|---|
| Drive failure (all media) | SnapRAID, 1–2 parity drives | 1–2 drives |
| Local backup (Tier 1) | restic → external USB drive | ~$100–200 once |
| Offsite backup (Tier 1) | restic → Backblaze B2 | ~$2–5/month |
| Config/inventory | git + nightly cron | Free |

Total: a couple of drives and a coffee's worth of cloud storage per month — versus rebuilding a library from nothing.

## Test the Restore

An untested backup is a hope, not a plan. Twice a year: pull three random files and one database from each backup layer and confirm they open. Five minutes, and you'll find problems while they're still fixable.

## Related Reading

- [Mergerfs + SnapRAID Setup Guide](/media-servers/mergerfs-snapraid-guide/)
- [Best NAS Hard Drives in 2026](/storage/best-nas-hard-drives-2026/)
- [Best External Hard Drives for HTPC Storage](/storage/best-external-hard-drives-htpc-2026/)
