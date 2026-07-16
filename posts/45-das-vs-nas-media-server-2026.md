---
title: "DAS vs NAS: Which Storage Setup Fits Your Media Server?"
description: "Direct-attached storage is cheaper and faster; network-attached storage is more flexible. We compare DAS enclosures against NAS boxes for Plex and Jellyfin setups — cost, speed, expandability, and which one you actually need."
date: 2026-07-13
categories: ["storage"]
category: "storage"
image: "https://images.unsplash.com/photo-1606765962248-7ff407b51667?w=800&h=400&fit=crop"
tags: ["storage", "das", "nas", "media-server", "enclosure"]
layout: article.njk
---

# DAS vs NAS: Which Storage Setup Fits Your Media Server?

Your media library outgrew the drives inside your server — everyone's does. Now you're staring at two acronyms: **DAS** (direct-attached storage — a box of drives cabled straight to your server) and **NAS** (network-attached storage — a box of drives that lives on your network as its own computer).

The internet defaults to "buy a Synology," but that's often $400 of computer you already own. Here's the actual decision.

## The Core Difference

- **DAS** is dumb and direct: a multi-bay USB enclosure that turns your existing server into the storage host. The drives appear as local disks. All the intelligence — file sharing, parity, apps — stays on your server.
- **NAS** is a second computer: its own CPU, RAM, OS, and network identity. It serves files to everything on the LAN and runs its own apps, whether or not your HTPC is on.

If you already run a capable server ([used OptiPlex](/mini-pcs/used-office-mini-pcs-home-server-2026/), N100 box, old desktop), DAS adds bays to it. NAS adds a second machine to administer.

## Head to Head

| | DAS (4-bay USB enclosure) | NAS (4-bay Synology-class) |
|---|---|---|
| Cost (empty) | $120–200 | $400–600 |
| Speed to host | USB 3.x: 400–1,000+ MB/s | Network: ~110 MB/s (1GbE) / ~280 (2.5GbE) |
| Needs the server on | Yes | No |
| Serves other devices directly | No (through the server) | Yes |
| Own apps/ecosystem | None | DSM/QTS: backups, sync, Docker |
| Power draw | Drives only (~5W + drives) | 20–40W + drives |
| Failure modes | Enclosure bridge, cable | Its own OS, updates, security patches |

Two numbers deserve emphasis. First, **speed**: USB 3 DAS outruns gigabit networking by a wide margin — though for streaming this rarely matters, since even 4K remuxes need only ~15 MB/s. Second, **cost**: the NAS premium is $300+ for compute you may already own.

## When DAS Is the Right Answer

- You run **one server** and everything (Plex, the *arr stack, downloads) lives on it
- Budget goes to **drives, not boxes**
- You use **Mergerfs + SnapRAID** for pooling and parity — the classic DIY setup ([full guide](/media-servers/mergerfs-snapraid-guide/)) works identically over USB bays
- You want the **simplest possible mental model**: one machine, more disks

**The one rule of DAS**: buy a quality enclosure with a reputable USB-to-SATA bridge and per-bay power. Cheap enclosures with flaky bridges are where "USB storage is unreliable" horror stories come from. Avoid hardware-RAID modes in the enclosure — let the OS manage disks individually so a dead enclosure never takes your data hostage.

<!-- AFFILIATE PLACEHOLDER: replace search URL with specific ASIN link -->
<div class="affiliate-box">
  <div class="affiliate-box-content">
    <div class="affiliate-box-title">Terramaster D4-300 4-Bay USB DAS</div>
    <div class="affiliate-box-description">Well-built 4-bay USB-C enclosure — presents drives individually, perfect for Mergerfs</div>
  </div>
  <a href="https://www.amazon.com/s?k=terramaster+d4-300+das+enclosure&tag=easyhtpc-20" target="_blank" rel="nofollow sponsored noopener" class="affiliate-box-link">Check Price on Amazon →</a>
</div>

## When NAS Is the Right Answer

- **Multiple machines and people** need the files independently of any one PC
- You want storage that's **always on** while the HTPC sleeps
- **Turnkey matters**: DSM's setup, SHR flexibility, snapshots, and Hyper Backup are genuinely excellent and need zero Linux knowledge
- You'll use the NAS itself as the media server — a mid-tier model with Quick Sync runs Plex directly (see [best NAS for Plex](/storage/best-nas-for-plex-2026/))

<!-- AFFILIATE PLACEHOLDER: replace search URL with specific ASIN link -->
<div class="affiliate-box">
  <div class="affiliate-box-content">
    <div class="affiliate-box-title">Synology DS923+ 4-Bay NAS</div>
    <div class="affiliate-box-description">The turnkey standard — SHR flexibility, snapshots, and a mature app ecosystem</div>
  </div>
  <a href="https://www.amazon.com/s?k=synology+ds923%2B+nas&tag=easyhtpc-20" target="_blank" rel="nofollow sponsored noopener" class="affiliate-box-link">Check Price on Amazon →</a>
</div>

## The Hybrid Truth

Mature setups often end up with both: a server with DAS for the bulk media library (cheap bays, direct speed), plus a small NAS — or a friend's — as a [backup target](/storage/backup-media-library-3-2-1-guide/) for the irreplaceable tier. The DAS grows the library; the NAS protects what can't be re-downloaded.

And whichever box you choose, fill it with the right drives — CMR NAS-class disks, covered in our [NAS hard drive guide](/storage/best-nas-hard-drives-2026/).

## Bottom Line

**Already have a server? Buy DAS bays and spend the savings on drives.** Building shared, always-on storage for a household of devices and users — or want zero-maintenance turnkey — buy the NAS. The wrong answer is buying a NAS to sit next to an idle server that could have done its job.

## Related Reading

- [Best NAS for Plex in 2026](/storage/best-nas-for-plex-2026/)
- [Mergerfs + SnapRAID Setup Guide](/media-servers/mergerfs-snapraid-guide/)
- [Best NAS Hard Drives in 2026](/storage/best-nas-hard-drives-2026/)
