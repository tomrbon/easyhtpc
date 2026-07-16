---
title: "Docker Compose for Media Servers: Build Your Whole Stack in One File"
description: "Stop installing media server apps by hand. One docker-compose.yml gives you Jellyfin, downloads, and dashboards — reproducible, updatable, and movable to any machine. A beginner-friendly walkthrough with a working template."
date: 2026-07-15
categories: ["media-servers"]
category: "media-servers"
image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=400&fit=crop"
tags: ["media-servers", "docker", "docker-compose", "jellyfin", "self-hosted"]
layout: article.njk
---

# Docker Compose for Media Servers: Build Your Whole Stack in One File

There are two kinds of home servers: the ones where nobody remembers how anything was installed, and the ones with a `docker-compose.yml`. The first kind dies with its SD card. The second kind can be resurrected on new hardware in ten minutes with two commands.

This guide gets you from "Docker sounds complicated" to a reproducible media stack — and explains the handful of concepts (volumes, PUID, networks) that trip up every beginner.

## Why Compose Beats Installing Apps Directly

- **Reproducible**: the YAML file *is* your server's documentation. New machine? Copy the file, run `docker compose up -d`, done.
- **Isolated**: each app carries its own dependencies. No "upgrading one thing broke another."
- **Updatable**: pull new images, recreate containers, keep your data. Rolling back is equally trivial.
- **Portable**: the same file runs on a [used OptiPlex](/mini-pcs/used-office-mini-pcs-home-server-2026/), an N100 box, or a NAS.

If you've read our [CasaOS guide](/media-servers/casaos-setup-guide/), CasaOS is training wheels for exactly this — Compose is the same idea with full control.

## Setup in Four Commands

On Debian/Ubuntu:

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER   # log out/in after
mkdir -p ~/srv && cd ~/srv
nano docker-compose.yml         # paste the template below
```

## A Working Starter Stack

Jellyfin plus a dashboard and auto-updates — deliberately small; grow it later:

```yaml
services:
  jellyfin:
    image: jellyfin/jellyfin:latest
    container_name: jellyfin
    ports:
      - "8096:8096"
    volumes:
      - ./jellyfin/config:/config
      - ./jellyfin/cache:/cache
      - /mnt/media:/media:ro
    devices:
      - /dev/dri/renderD128:/dev/dri/renderD128  # Intel Quick Sync
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York
    restart: unless-stopped

  homepage:
    image: ghcr.io/gethomepage/homepage:latest
    container_name: homepage
    ports:
      - "3000:3000"
    volumes:
      - ./homepage:/app/config
    restart: unless-stopped

  watchtower:
    image: containrrr/watchtower
    container_name: watchtower
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    command: --cleanup --schedule "0 0 5 * * *"
    restart: unless-stopped
```

Start it:

```bash
docker compose up -d
```

Jellyfin is at `http://server-ip:8096`, your dashboard at `:3000`, and Watchtower updates everything at 5 AM.

## The Concepts That Actually Matter

**Volumes are your data.** Everything left of the colon lives on your disk (`./jellyfin/config`); the container path is on the right. Containers are disposable — volumes are not. Back up the left sides and the YAML and you can rebuild everything ([backup strategy here](/storage/backup-media-library-3-2-1-guide/)).

**PUID/PGID prevent permission hell.** Run `id` on your host; use those numbers. Every container then reads/writes your media as *you*, not as root — the #1 beginner stumbling block solved in two lines.

**Mount media read-only where possible.** The `:ro` on Jellyfin's media mount means a misbehaving container can't delete your library. Only downloaders need write access.

**The GPU line makes transcoding free.** That `/dev/dri` device mapping plus our [Quick Sync setup guide](/media-servers/jellyfin-hardware-transcoding-guide/) turns a $150 box into a multi-stream transcoder.

**Keep the YAML in git.** `git init && git add . && git commit` — version control *and* offsite documentation in one move.

## Growing the Stack

The joy of Compose: each new service is a copy-paste block. Popular next additions — a request manager (Jellyseerr), download automation, Home Assistant, Pi-hole. Add the block, `docker compose up -d`, and only the new container starts. The same pattern scales from three containers to thirty; when you outgrow one box, the whole [media server comparison](/media-servers/media-server-software-comparison-2026/) of alternatives is one image-name swap away.

## Hardware Notes

Any 4-core box with 8–16GB handles a starter stack; the [N100 vs N305 question](/mini-pcs/intel-n100-vs-n305-home-server-2026/) is really a "how many containers" question. Put Docker and configs on the SSD tier, media on spinners — the [two-tier layout](/storage/ssd-vs-hdd-media-server-2026/) exists for exactly this.

<!-- AFFILIATE PLACEHOLDER: replace search URL with specific ASIN link -->
<div class="affiliate-box">
  <div class="affiliate-box-content">
    <div class="affiliate-box-title">Beelink Mini PC (Intel N100, 16GB)</div>
    <div class="affiliate-box-description">A perfect first Docker box — silent, 6W idle, Quick Sync transcoding included</div>
  </div>
  <a href="https://www.amazon.com/s?k=beelink+n100+16gb+mini+pc&tag=easyhtpc-20" target="_blank" rel="nofollow sponsored noopener" class="affiliate-box-link">Check Price on Amazon →</a>
</div>

## Troubleshooting Cheatsheet

- **Container won't start** → `docker compose logs <name>` tells you why, 95% of the time a volume path or port conflict
- **Permission denied on media** → PUID/PGID don't match `id`, or the host folder is owned by root
- **Port already in use** → change the left side of the port mapping (`"8097:8096"`)
- **Transcoding falls back to CPU** → the render group and device mapping steps in the [transcoding guide](/media-servers/jellyfin-hardware-transcoding-guide/)

## Related Reading

- [CasaOS: The Easy On-Ramp](/media-servers/casaos-setup-guide/)
- [Jellyfin Hardware Transcoding Setup](/media-servers/jellyfin-hardware-transcoding-guide/)
- [Used Office Mini PCs as Home Servers](/mini-pcs/used-office-mini-pcs-home-server-2026/)
