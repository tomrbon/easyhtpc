---
title: "Complete NAS Setup Guide for Home Media"
description: "Build your own Netflix with a NAS—hardware selection, software setup, and optimization tips"
date: 2026-02-17
categories: ["storage"]
category: "storage"
image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop"
tags: ["storage", "streaming", "htpc"]
layout: article.njk
---

## Why a NAS Changes Everything

If you've been running Plex or Jellyfin from your desktop computer, you know the drill:
- Your movie stops when your PC goes to sleep
- You worry about drive failures wiping your library
- You can't expand storage easily
A Network Attached Storage (NAS) device solves all of this. It's a always-on, purpose-built server that stores your media, runs your software, and protects your data with redundancy.

Think of it as the difference between keeping your books in a pile on your floor versus having a proper library with organized shelves and a backup copy in storage.

---

## NAS vs External Drive vs Cloud: The Real Comparison

<figure>
  <img src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&h=400&fit=crop" alt="NAS server rack" loading="lazy">
  <figcaption>NAS server rack</figcaption>
</figure>


Before we get into specifics, let's settle the storage debate.

### External Hard Drives

**Pros:**
- Cheap ($80-150 for 8TB)
- Simple—plug it in and go
- Portable

**Cons:**
- No redundancy—if it dies, your data dies
- Slower performance (USB limits)
- Can't run server software directly
- Not designed for 24/7 operation

**Verdict**: Fine for storing files, terrible for a media server.

### Cloud Storage (Google Drive, Dropbox, etc.)

**Pros:**
- Off-site backup (disaster protection)
- Access from anywhere
- Someone else handles hardware

**Cons:**
- Expensive ($10-20/month for 2TB)
- Upload bandwidth limits
- Privacy concerns
- Can't run Plex/Jellyfin directly

**Verdict**: Good for backups, impractical as primary media storage.

### Dedicated NAS

**Pros:**
- Data redundancy (RAID protection)
- Runs Plex, Jellyfin, and dozens of other apps
- Expandable storage
- Fast local network speeds
- Designed for 24/7 operation
- One-time cost, no monthly fees

**Cons:**
- Higher upfront cost ($300-1000+)
- Learning curve for setup
- Ongoing maintenance

**Verdict**: The right choice for serious home media.

---

## Choosing the Right NAS

This is where most people get overwhelmed. There are dozens of NAS options, and the specifications look like alphabet soup.

Let me simplify it.

### The Two Big Players

**Synology** and **QNAP** dominate the home NAS market. Both make excellent products, but they differ in philosophy:

| Aspect | Synology | QNAP |
|--------|----------|------|
| Software | Best-in-class DSM | Feature-packed but complex |
| Ease of use | Simple, polished | Powerful, technical |
- Support | Excellent community | Good community |
| Price | Premium | Often better value |
| Plex support | Native package | Native package |

**My recommendation**: If you're new to NAS, go Synology. The software is more intuitive, and the community support is unmatched. If you're technical and want maximum flexibility, QNAP gives you more options.

### Synology Options for Media Servers

#### Synology DS224+ (2-Bay Entry Level)

**Specs:**
- Intel Celeron J4125 processor
- 2GB RAM (expandable to 6GB)
- 2 drive bays
- 1GbE network port

**Best for**: First-time NAS users, small libraries (under 8TB)

**Price**: Around $300 Synology DS224+

**Can it transcode?** Yes, but limited. Intel QuickSync handles 1080p easily, 4K is hit-or-miss.

#### Synology DS923+ (4-Bay Sweet Spot)

**Specs:**
- AMD Ryzen R1600 processor
- 4GB RAM (expandable to 32GB)
- 4 drive bays
- 1GbE + optional 10GbE expansion

**Best for**: Serious media collectors, growing libraries, multiple simultaneous streams

**Price**: Around $599 Synology DS923+

**Can it transcode?** No hardware transcode (no Intel QuickSync), but excellent for direct play.

> **Important**: If you need transcoding on Synology, the DS224+ (Intel processor) is actually better than the DS923+ (AMD), despite being cheaper. Synology made an odd choice with the AMD chip.

#### Synology DS1522+ (5-Bay Workstation)

**Specs:**
- AMD Ryzen R1600 processor
- 8GB RAM (expandable to 32GB)
- 5 drive bays
- 1GbE + optional 10GbE

**Best for**: Power users, large libraries (50TB+), running multiple services

**Price**: Around $799 Synology DS1522+

### QNAP Options for Media Servers

#### QNAP TS-464 (4-Bay Value)

**Specs:**
- Intel Celeron N5095 processor
- 8GB RAM (expandable to 16GB)
- 4 drive bays
- 2.5GbE network port

**Best for**: Value-conscious users who want transcoding

**Price**: Around $450 QNAP TS-464

**Can it transcode?** Yes. Intel QuickSync handles 4K pretty well.

#### QNAP TVS-674 (6-Bay Workstation)

**Specs:**
- Intel Core i3 processor
- 8GB RAM (expandable to 64GB)
- 6 drive bays
- Dual 10GbE ports

**Best for**: Power users who want serious transcoding performance

**Price**: Around $1,200 QNAP TVS-674

### My Top Picks

| Budget | Recommendation | Why |
|--------|----------------|-----|
| Under $400 | Synology DS224+ | Best software, good starter NAS |
| $400-600 | QNAP TS-464 | Best value for transcoding |
| $600+ | Synology DS923+ | Best balance for large libraries |

---

## Hard Drive Selection: Don't Cheap Out

Here's where people make their biggest mistake. They buy a nice NAS and fill it with cheap hard drives designed for occasional use.

**The wrong drives:**
- WD Blue, Seagate Barracuda (desktop drives)
- SMR (Shingled Magnetic Recording) drives
- Random external drives shucked from enclosures

**The right drives:**
- NAS-specific drives with CMR recording
- Designed for 24/7 operation
- Higher reliability ratings

### CMR vs SMR: A Quick Explanation

CMR (Conventional Magnetic Recording) writes data in traditional tracks. SMR (Shingled Magnetic Recording) overlaps tracks like shingles on a roof to squeeze in more data.

SMR drives are cheaper but significantly slower when writing data—and they can cause problems in RAID arrays.

**Rule**: Always choose CMR for your NAS.

### Recommended NAS Drives

#### WD Red Plus (CMR, 5400-7200 RPM)

- Quiet and cool
- 3-year warranty
- Good value
- **Price**: ~$180 for 8TB WD Red Plus 8TB

#### WD Red Pro (CMR, 7200 RPM)

- Faster than Red Plus
- 5-year warranty
- 24/7 workload rating
- **Price**: ~$250 for 8TB WD Red Pro 8TB

#### Seagate IronWolf (CMR, 7200 RPM)

- Comparable to WD Red Pro
- Includes Seagate's IronWolf Health Management
- Good for Synology/QNAP
- **Price**: ~$200 for 8TB Seagate IronWolf 8TB

#### Seagate Exos (Enterprise Class)

- Overkill for home use? Maybe.
- Incredible reliability (2.5M hour MTBF)
- 5-year warranty
- Often cheaper than IronWolf due to enterprise pricing
- **Price**: ~$200 for 16TB (!) Seagate Exos 16TB

### Capacity Planning

A rough guide for media storage:

| Media Type | Space per item | 8TB holds |
|------------|----------------|-----------|
| DVD-quality movies (2GB) | 2GB | ~4,000 movies |
| 1080p movies (8GB) | 8GB | ~1,000 movies |
| 4K HDR movies (40GB) | 40GB | ~200 movies |
| TV show season (1080p) | 25GB | ~320 seasons |
| Music albums (FLAC) | 500MB | ~16,000 albums |

With RAID redundancy (using 2 drives for every 1 drive of actual storage in RAID 1, or getting ~75% capacity in RAID 5), account for:
- **RAID 1 (mirror)**: 2x 8TB = 8TB usable
- **RAID 5 (3+ drives)**: 3x 8TB = ~16TB usable; 4x 8TB = ~24TB usable
- **RAID 6 (4+ drives)**: 4x 8TB = ~16TB usable; better redundancy

---

## Setting Up Your NAS

You've bought your NAS and drives. Now what?

### Physical Setup

1. **Unbox and install drives**
   - Power off the NAS
   - Open drive bays (usually tool-less trays)
   - Insert drives, secure with screws or clips
   - Close NAS

2. **Connect to network**
   - Connect Ethernet cable to your router or switch
   - Connect power
   - Power on

3. **Find your NAS**
   - Check your router's device list, or
   - Use the manufacturer's finder tool:
     - Synology: https://find.synology.com
     - QNAP: https://www.qnap.com/go/find-my-nas

### Initial Configuration

1. **Install the OS**
   - Synology: DSM (DiskStation Manager)
   - QNAP: QTS or QuTS hero
   - Usually auto-detected, download and install

2. **Create your storage pool**
   - Select drives to use
   - Choose RAID level (RAID 1 for 2 drives, RAID 5 for 4+ drives)
   - Let the system create the pool

3. **Create a volume**
   - This is what your applications will see as storage
   - Choose file system (Btrfs for Synology, ext4 or ZFS for QNAP)

4. **Create a user account**
   - NOT "admin"—create a new admin account
   - Disable the default admin account for security

---

## Installing Media Server Software

### Plex on Synology

1. Open **Package Center**
2. Search for "Plex Media Server"
3. Click Install
4. Open Plex and claim your server
5. Point Plex to your media folders

### Jellyfin on Synology

Synology doesn't include Jellyfin in the Package Center, but it's easy to add:

1. Open Package Center → Settings
2. Add a community source: `https://packages.synocommunity.com/`
3. Search "Jellyfin" in Package Center
4. Install

### Plex on QNAP

1. Open **App Center**
2. Search "Plex Media Server"
3. Install
4. Configure your libraries

### Jellyfin on QNAP

1. Open Container Station (Docker)
2. Search for Jellyfin container
3. Deploy with recommended settings

---

## Remote Access Configuration

Your NAS is set up. Now you want to access your media from anywhere.

### Option 1: Manufacturer's Solution

**Synology QuickConnect**
- Free service from Synology
- Works through most router/firewall setups
- Some performance limitations

**Setup:**
1. Control Panel → External Access → QuickConnect
2. Enable QuickConnect
3. Register a unique ID
4. Access via `https://quickconnect.to/your-id`

**QNAP myQNAPcloud**
- Similar to QuickConnect
- Available through QNAP account

### Option 2: VPN (Recommended for Privacy)

Direct access reveals your IP to anyone. A VPN provides security and privacy.

**Setup:**
1. Install VPN Server on your NAS
2. Configure (WireGuard or OpenVPN)
3. Open ports on your router (or use UPnP)
4. Connect from anywhere

**Why VPN?**
- Encrypted connection
- Access your home network, not just media
- Privacy from ISP snooping
- NordVPN or ExpressVPN if you prefer managed VPN with NAT traversal

### Option 3: Tailscale (Easiest)

Tailscale creates a private network without port forwarding.

1. Install Tailscale from Package Center
2. Sign in with Google, Microsoft, or GitHub
3. Install Tailscale on your phone/laptop
4. Devices can now reach each other directly

Free for personal use, incredibly simple.

---

## Maintenance and Backup

A NAS isn't "set it and forget it"—but it's close.

### Regular Tasks (Monthly)

- Check drive health in Storage Manager
- Update DSM/QTS when available
- Check for security alerts
- Verify backup jobs completed

### Backup Strategy (The 3-2-1 Rule)

Keep **3** copies of important data, on **2** different media types, with **1** off-site.

**For NAS:**
1. **Primary**: Your NAS storage
2. **Secondary**: External drive attached to NAS, or cloud backup
3. **Off-site**: Cloud backup (Backblaze B2, Wasabi) or drive at a friend's house

**Synology Hyper Backup**
- Built-in backup app
- Supports local, network, and cloud destinations
- Backblaze B2 integration (excellent value)

---

## The Bottom Line

A NAS transforms your home media experience. It's the difference between "watching some movies I downloaded" and having a genuine personal streaming service.

**Start simple:**
- Synology DS224+ or QNAP TS-464
- 2x 8TB NAS drives
- Plex or Jellyfin installed

**Grow from there:**
- Add drives as your library expands
- Configure proper backups
- Explore additional NAS apps (Sonarr, Radarr, Home Assistant)

The initial investment pays for itself quickly when you consider what you'd spend on streaming services—and you own your content forever.

---

## Quick Start Shopping List

| Item | Recommendation | Price |
|------|----------------|-------|
| NAS (2-bay) | Synology DS224+ | ~$300 Synology DS224+ |
| NAS (4-bay) | QNAP TS-464 | ~$450 QNAP TS-464 |
| Hard Drives | 2x WD Red Plus 8TB | ~$360 WD Red Plus 8TB |
| Backup Drive | WD Elements 12TB | ~$200 WD Elements 12TB |
| Network Cable | Cat6 cable | ~$15 Cat6 Cable |

**Total starter investment: ~$650-800**

---

## FAQ

**How many drives do I need?**
Minimum 2 for redundancy (RAID 1). With a 4-bay NAS, start with 2 and add more as needed. You can expand RAID arrays on most systems.

**Do I need SSDs for my NAS?**
For media storage, HDDs are more cost-effective. SSDs are useful for a cache volume (speeds up some operations) but not essential. Consider NAS SSDs (like WD Red SA500) if you want a cache.

**Can I use drives I already have?**
Yes, if they're CMR NAS drives. Desktop drives (WD Blue, Seagate Barracuda) will work but are more likely to fail under 24/7 use.

**What's the minimum internet speed for remote streaming?**
For 1080p streaming, you need about 5 Mbps upload speed per simultaneous stream. For 4K, you need at least 25 Mbps upload.

**Can I run other services on my NAS?**
Absolutely. Synology and QNAP support dozens of packages including: Sonarr, Radarr, Home Assistant, Nextcloud, and more. Think of it as a mini home server.

---

*Your media library deserves a real home. Build it right, and it'll serve you for years.*
---

## NAS RAID Levels Explained
---

## NAS Recommendation by Storage Need

| Media Library Size | Recommended NAS | Drives | Approx. Cost |
|-------------------|-----------------|--------|--------------|
| **Under 10TB** | Synology DS220+ | 2x 8TB | $500-700 |
| **10-30TB** | Synology DS920+ | 4x 8TB | $900-1,200 |
| **30-60TB** | Synology DS1520+ | 5x 12TB | $1,500-2,000 |
| **60TB+** | QNAP TVS-872XT | 8x 16TB | $3,000+ |

---

## Ready to Build Your NAS?

Start simple, expand later. A 2-bay Synology with 8TB drives is perfect for most home users and can grow with your library.

---

<div class="affiliate-box">
<h3>💾 Shop NAS Hardware</h3>
<p>Recommended NAS drives and enclosures:</p>
<ul>
<li><a href="https://www.amazon.com" rel="nofollow sponsored noopener">Synology DS220+ on Amazon</a></li>
<li><a href="https://www.amazon.com" rel="nofollow sponsored noopener">Synology DS920+ on Amazon</a></li>
<li><a href="https://www.amazon.com" rel="nofollow sponsored noopener">WD Red Plus 8TB NAS Drive</a></li>
<li><a href="https://www.amazon.com" rel="nofollow sponsored noopener">Seagate IronWolf 8TB NAS Drive</a></li>
<li><a href="https://www.amazon.com" rel="nofollow sponsored noopener">Synology DS923+ on Amazon</a></li>
</ul>
</div>

---
