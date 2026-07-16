---
title: "How to Name and Organize Media Files So Plex and Jellyfin Match Everything"
description: "Wrong posters, missing episodes, and 'unmatched' items are almost always naming problems. The folder structure and file naming rules that make Plex, Jellyfin, and Emby identify your entire library perfectly."
date: 2026-07-12
categories: ["media-servers"]
category: "media-servers"
image: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=800&h=400&fit=crop"
tags: ["media-servers", "plex", "jellyfin", "organization", "naming"]
layout: article.njk
---

# How to Name and Organize Media Files So Plex and Jellyfin Match Everything

Every "Plex matched my kids' movie as a horror film" screenshot and every mysteriously missing season traces back to the same root cause: file names the scanner couldn't parse. Media servers don't watch your files — they read the names, guess the title and year, and look them up in metadata databases. Feed them clean names and matching becomes boring and perfect.

Here's the naming scheme that works across Plex, Jellyfin, and Emby, plus the tools that fix an existing messy library automatically.

## The Golden Rules

1. **One movie or episode per file, one title per folder.**
2. **Always include the year** — it's the single strongest disambiguator (`Heat (1995)` vs `Heat (2013)`).
3. **Name folders and files identically** for movies.
4. **Use `SxxEyy` for episodes.** Not `1x01`, not `Episode 1`, not date formats (except daily shows).
5. **Keep junk out of the parse zone**: release-group tags and quality junk confuse scanners less when they come *after* the year/episode markers, but cleanest is to drop them entirely.

## Movies

```
Movies/
├── Heat (1995)/
│   └── Heat (1995).mkv
├── Dune Part Two (2024)/
│   ├── Dune Part Two (2024).mkv
│   └── Dune Part Two (2024).en.srt
└── The Matrix (1999)/
    └── The Matrix (1999) - 4K HDR.mkv
```

Notes:

- Anything after ` - ` in the filename is treated as an **edition/quality label** and ignored for matching — a safe place for "4K HDR" or "Director's Cut."
- Subtitles sit next to the video with a language code: `.en.srt`, `.en.forced.srt`.
- Ambiguous match? Add the database ID to the folder name and the scanner obeys unconditionally: `Heat (1995) {imdb-tt0113277}` (Plex and Jellyfin both honor this).

## TV Shows

```
TV/
└── Severance (2022)/
    ├── Season 01/
    │   ├── Severance (2022) - S01E01 - Good News About Hell.mkv
    │   └── Severance (2022) - S01E02.mkv
    └── Season 02/
        └── Severance (2022) - S02E01.mkv
```

Notes:

- Episode titles after the `SxxEyy` are optional decoration — the scanner keys on the code.
- **Specials go in `Season 00/`** with `S00Exx` numbers matching the metadata database's specials list.
- Multi-episode files: `S01E01-E02`. Daily shows: `Show Name - 2026-07-01.mkv`.
- Anime is the eternal edge case — absolute numbering vs seasons. Let the tools below map it against AniDB rather than fighting by hand.

## The Mass-Rename Tools

Nobody renames 800 files by hand. The established options:

- **FileBot** (~$6/yr, GUI, all platforms): drag in a mess, it fetches metadata and renames to any pattern. The de facto standard for one-time library cleanups.
- **Sonarr/Radarr** (free, self-hosted): manage TV and movies going forward — they rename on import automatically and can retroactively rename existing libraries. Natural additions to a [Docker stack](/media-servers/docker-compose-media-server-stack-2026/).
- **tinyMediaManager** (free tier): GUI manager that also writes local `.nfo` metadata — useful for libraries you want portable across server software.

The workflow that works: **FileBot once** to fix history, **automation forever after** so new files land pre-named.

## Local Metadata: The Portability Trick

Plex, Jellyfin, and Emby all read local artwork and `.nfo` files placed next to your media:

```
Heat (1995)/
├── Heat (1995).mkv
├── movie.nfo
├── poster.jpg
└── fanart.jpg
```

Exporting local metadata means your curation — posters, edited summaries, custom collections — survives switching server software (relevant if the [Plex vs Jellyfin debate](/media-servers/jellyfin-plex-emby-comparison/) ever tips you over) and survives database corruption, which pairs nicely with a [real backup strategy](/storage/backup-media-library-3-2-1-guide/).

## Scanner Hygiene

- **Separate libraries by type**: Movies and TV in different root folders, always — mixed folders are the #1 cause of chaos matches.
- **Never point libraries at download folders**: half-finished files get scanned, matched, and cached wrong. Downloads complete elsewhere, then move in ([the two-tier layout](/storage/ssd-vs-hdd-media-server-2026/) has a scratch area for exactly this).
- **After mass renames**: Plex → "Scan Library Files" then "Refresh All Metadata"; Jellyfin → "Replace All Metadata." Old wrong matches don't fix themselves.
- **Optimize the database occasionally** (Plex: Settings → Troubleshooting) — big rename sessions leave cruft.

## Storage That Helps

A tidy tree is easier to maintain when the storage layer is simple: one big pool path (`/mnt/media/Movies`, `/mnt/media/TV`) rather than files scattered across drive letters. That's the core sell of [Mergerfs pooling](/media-servers/mergerfs-snapraid-guide/) — the naming scheme lives in one place no matter how many disks sit underneath.

<!-- AFFILIATE PLACEHOLDER: replace search URL with specific ASIN link -->
<div class="affiliate-box">
  <div class="affiliate-box-content">
    <div class="affiliate-box-title">Seagate IronWolf 8TB NAS Drive</div>
    <div class="affiliate-box-description">Room to reorganize — a spare bay of headroom makes library restructuring painless</div>
  </div>
  <a href="https://www.amazon.com/s?k=seagate+ironwolf+8tb+nas&tag=easyhtpc-20" target="_blank" rel="nofollow sponsored noopener" class="affiliate-box-link">Check Price on Amazon →</a>
</div>

## Related Reading

- [Jellyfin vs Plex vs Emby](/media-servers/jellyfin-plex-emby-comparison/)
- [Docker Compose Media Stack](/media-servers/docker-compose-media-server-stack-2026/)
- [Back Up Your Media Library: 3-2-1](/storage/backup-media-library-3-2-1-guide/)
