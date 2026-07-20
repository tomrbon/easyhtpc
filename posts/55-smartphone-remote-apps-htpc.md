---
title: "Best Remote Control Apps for Kodi, Plex, and Jellyfin: Turn Your Phone Into an HTPC Remote"
description: "Skip the IR remote — your phone already has a keyboard, a touchscreen, and Wi-Fi. Here's how the official and third-party remote apps for Kodi, Plex, and Jellyfin actually compare, and which one to install tonight."
date: 2026-07-20
categories: ["remotes"]
category: "remotes"
image: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=800&h=400&fit=crop"
tags: ["remotes", "kodi", "plex", "jellyfin", "apps"]
layout: article.njk
---

# Best Remote Control Apps for Kodi, Plex, and Jellyfin: Turn Your Phone Into an HTPC Remote

Every HTPC problem that a physical remote struggles with — typing a search query, entering a Wi-Fi password, scrubbing to an exact timestamp — a phone solves instantly. You already carry the hardware: a touchscreen, a full keyboard, and Wi-Fi that never needs line of sight. The only question is which app to install, because "the official app" isn't always the best answer for every platform.

This is a rundown of the real remote apps people use daily with Kodi, Plex, and Jellyfin — what each one does well, where it falls short, and when you still want a [physical remote](/remotes/best-htpc-remotes-2026/) or [game controller](/remotes/game-controller-htpc-remote-guide/) instead.

## Why a Phone Remote Beats a Physical One (Most of the Time)

- **Typing**: searching for "The Marvelous Mrs. Maisel" with a D-pad is miserable. A phone keyboard does it in three seconds.
- **No line of sight**: phone apps talk to your media server over Wi-Fi, so the box can be tucked behind the TV with zero IR sensor exposed.
- **Library browsing**: bigger screen, thumbnail grids, and swipe gestures beat scrolling through a 10-foot UI one row at a time.
- **Multi-user households**: everyone already has the app installed on their own phone — no shared remote to lose in the couch cushions.

The trade-offs: your phone can't power on the TV or switch HDMI inputs (that's still [HDMI-CEC's](/remotes/hdmi-cec-explained-one-remote/) job), the app needs your phone unlocked and in hand, and screen-off idle timers mean an extra tap to wake it before every use. Most households end up running both — a phone app for search and browsing, something dumb and physical for play/pause from the couch.

## Kodi: Two Good Options, One Clear Winner

### Kodi's Official Remote

Kodi ships an official companion app (Android and iOS) that connects over the local network once you enable **Settings → Services → Control → Allow remote control via HTTP**. It covers the basics — navigation, playback, volume — and it's free, but the interface is dated and text entry is clunky compared to the alternative below.

### Yatse: The One Everyone Actually Uses

**Yatse** (Android, with a paid "unlocker" for extra features) is the app most serious Kodi users install instead. It adds:

- A proper on-screen keyboard with predictive search that pushes queries straight into Kodi's search
- A library browser with poster art, so you can queue up something without touching the TV screen at all
- Trakt and IMDb integration for browsing what to watch next
- Support for controlling multiple Kodi instances from one app — handy if you've built more than one [Kodi mini PC](/mini-pcs/best-mini-pcs-kodi-2026/) in the house
- A widget for one-tap play/pause without opening the full app

Setup is the same HTTP-control toggle as the official app, plus optionally enabling Kodi's JSON-RPC over the network if you want Yatse's full remote-control feature set (auto-discovered on the same subnet).

| App | Platform | Cost | Best for |
|---|---|---|---|
| Kodi Official Remote | Android, iOS | Free | Casual use, basic playback control |
| Yatse | Android only | Free tier + paid unlock | Power users, library browsing, multi-box setups |

## Plex: The Official App Is the Whole Story

Plex doesn't leave much room for third parties because the official **Plex app** already does everything: it's your media browser, your remote control, and — critically — a **second-screen remote** for the desktop client. Open Plex on your phone, tap the cast-like remote icon, and it turns into a full playback controller (play/pause, seek, subtitle and audio track switching, volume) for whatever's playing on the [Plex HTPC client](/media-servers/fix-plex-buffering-guide/) on the TV.

That second-screen mode is genuinely the best remote experience of the three ecosystems — it's built by the same company that runs the server, so there's no version-mismatch or API breakage to worry about. The catch: it requires Plex Pass on some platforms for full remote-control functionality, and it only controls the official Plex apps, not arbitrary media players.

For live TV, the same app doubles as your [Plex DVR guide](/streaming/plex-live-tv-guide-2026/) remote, including channel changing and recording controls.

<!-- AFFILIATE PLACEHOLDER: replace search URL with specific ASIN link -->
<div class="affiliate-box">
  <div class="affiliate-box-content">
    <div class="affiliate-box-title">Anker PowerCore Slim 10000</div>
    <div class="affiliate-box-description">Keep the "remote" phone topped up during marathon movie nights</div>
  </div>
  <a href="https://www.amazon.com/s?k=anker+powercore+slim+10000+power+bank&tag=easyhtpc-20" target="_blank" rel="nofollow sponsored noopener" class="affiliate-box-link">Check Price on Amazon →</a>
</div>

## Jellyfin: Official App, Community Polish

Jellyfin's official mobile apps (Android and iOS, both open source and free — no subscription tier to unlock) work as browsers and players in their own right, but the remote-control feature is what matters here: from the app, tap the cast icon next to anything playing on **Jellyfin Media Player** or **Jellyfin Web** on your HTPC, and the phone becomes the controller — play/pause, seek, subtitle/audio track selection, volume.

It's not quite as polished as Plex's second-screen mode, but it's improved a lot and it's completely free, which fits Jellyfin's whole philosophy. If you compared the platforms in our [Jellyfin vs. Plex vs. Emby breakdown](/media-servers/jellyfin-plex-emby-comparison/), this is one more point in the "free and good enough" column — reinforced further by how these apps fit into a [broader media server software comparison](/media-servers/media-server-software-comparison-2026/).

A few third-party Jellyfin clients (Findroid on iOS, for instance) add their own polish on top of the same remote-control API, but the official app covers everyone's needs without extra setup.

| Server | Remote via | Free? | Notes |
|---|---|---|---|
| Plex | Official Plex app (cast icon) | Full feature needs Plex Pass on some platforms | Best-in-class second-screen experience |
| Jellyfin | Official Jellyfin app (cast icon) | Fully free | Solid, improving fast, no paywall |
| Kodi | Yatse (or official remote) | Free tier / paid unlock | Best library browsing and search of the three |

## Setting Up: What They All Need in Common

Regardless of which app you pick, three things have to be true for phone remotes to work reliably:

1. **Same network, no client isolation.** Phone and HTPC need to be on the same subnet, and your router's "AP/client isolation" (common on guest networks and mesh systems) has to be off for the local subnet you're using.
2. **A DHCP reservation for the HTPC.** These apps auto-discover servers by IP; if your HTPC's address changes after a reboot, some apps lose the connection until you re-scan. Reserve the IP in your [router config](/media-servers/casaos-setup-guide/) once and forget it.
3. **The server's remote-control setting enabled.** Kodi needs HTTP/JSON-RPC control turned on explicitly; Plex and Jellyfin have it on by default but check under network/remote-access settings if a phone can't find the server.

## The Bottom Line

- **Kodi household** → install **Yatse**. The free official app works, but Yatse's search and library browsing are worth the small unlock fee.
- **Plex household** → just use the **official Plex app**. It's the remote, the browser, and the DVR controller in one, and nothing else integrates as tightly.
- **Jellyfin household** → the **official Jellyfin app** is free and does the job well; no reason to look elsewhere.
- **Everyone** → keep a cheap physical remote or [HDMI-CEC setup](/remotes/hdmi-cec-explained-one-remote/) as the fallback for turning the TV on and basic playback when nobody wants to unlock their phone.

Phone apps have quietly become the best HTPC remotes available — free, always in your pocket, and better at search and browsing than any dedicated hardware. Install the right one for your media server tonight and the physical remote becomes a backup, not the primary controller.

## Related Reading

- [Best HTPC Remotes 2026: Ultimate Guide to Home Theater Control](/remotes/best-htpc-remotes-2026/)
- [Jellyfin vs Plex vs Emby: The Ultimate 2026 Comparison](/media-servers/jellyfin-plex-emby-comparison/)
- [Using a Game Controller as Your HTPC Remote: Complete Setup Guide](/remotes/game-controller-htpc-remote-guide/)
