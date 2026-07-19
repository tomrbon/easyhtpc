---
title: "VPN Split Tunneling for Streaming: Protect Your Traffic Without Killing Local Access"
description: "Split tunneling lets you route only the apps you want through a VPN while everything else — local Plex, smart home gear, printers — stays fast and reachable. Here's how to set it up on every platform."
date: 2026-07-19
categories: ["vpn"]
category: "vpn"
image: "https://images.unsplash.com/photo-1614064548237-096f735f344f?w=800&h=400&fit=crop"
tags: ["vpn", "split-tunneling", "streaming", "networking", "plex"]
layout: article.njk
---

# VPN Split Tunneling for Streaming: Protect Your Traffic Without Killing Local Access

Turn on a full-tunnel VPN at home and two things break almost immediately: your phone can't see your [Plex server](/media-servers/) on the local network anymore, and your smart TV app insists you're "too far away" to stream your own library. The fix most people reach for is turning the VPN off entirely — which defeats the point of having one. The actual fix is split tunneling: routing only the traffic that needs VPN protection through the tunnel, while everything else — local streaming, smart home devices, printers, game consoles — talks directly to your router like normal.

This is the single most useful VPN feature nobody configures, mostly because it's buried in an "advanced" menu and the terminology varies by platform. Here's what it does, when to use it, and exactly how to turn it on everywhere that matters for an HTPC setup.

## What Split Tunneling Actually Does

A normal VPN connection is all-or-nothing: every packet leaving your device gets encrypted and routed through the VPN server, full stop. Split tunneling adds a rule layer on top that says "except for this" — by app, by IP range, or by both, depending on the client.

There are two flavors:

- **App-based split tunneling** — pick specific apps to include or exclude from the tunnel. "Everything goes through the VPN except Plex and Chrome" or "only my torrent client uses the VPN, everything else is direct."
- **IP-based split tunneling** — exclude entire address ranges instead of apps. This is what you want for local network access: exclude your home subnet (typically `192.168.1.0/24` or `192.168.0.0/16`) so any device talking to another device on your LAN skips the tunnel automatically, regardless of which app is doing the talking.

For most HTPC and media-server situations, IP-based exclusion of your local subnet is the more durable fix — it works no matter what app you're using, and it's a one-time setting instead of a per-app whitelist you have to keep updating.

## Why This Matters for a Media Server Setup

A full-tunnel VPN causes three specific headaches for anyone running [Plex, Jellyfin, or Emby](/media-servers/jellyfin-plex-emby-comparison/) at home:

1. **Local playback breaks or transcodes unnecessarily.** Your phone on the same Wi-Fi as your server should connect directly at full LAN speed. With a full tunnel, that traffic instead goes out to a VPN server and back, sometimes tripping the server's "remote access" bandwidth limits and forcing a lower-quality transcode for content that's three feet away on the same switch.
2. **Device discovery fails.** DLNA, Chromecast, AirPlay, and Plex's own local server discovery all rely on multicast/broadcast traffic that doesn't survive a VPN tunnel. Your [Fire TV Stick](/vpn/vpn-on-fire-tv-stick-setup-guide/) or Chromecast simply stops showing up.
3. **Smart home and IoT devices lose connectivity.** Printers, smart plugs, security cameras, and game consoles typically don't need or tolerate VPN routing at all, and many break silently when forced through one.

Split tunneling solves all three at once: keep the VPN active for the traffic that actually needs privacy or geo-unblocking (a streaming app checking your public IP, a browser, a torrent client) while your LAN devices keep talking to each other at native speed.

## When You Want the Opposite: Full Tunnel

Split tunneling isn't always the right call. Keep everything routed through a full tunnel when:

- You're unblocking geo-restricted content and want zero risk of leaking your real IP through an excluded app
- You're on a public or untrusted network (hotel, airport, coffee shop) and want every packet encrypted
- Your ISP throttles specific traffic types and you want the VPN masking all of it, not just some

The router-level setup in our [whole-home VPN guide](/vpn/vpn-on-router-whole-home-streaming/) is a full-tunnel approach by design — it protects every device on the network uniformly. Split tunneling is what you layer on top of a client-based VPN (running on a laptop, phone, or streaming box) when you want protection for some traffic but not all of it.

## Platform-by-Platform Setup

Exact menu names differ, but the concept is identical everywhere: find the split tunneling section in your VPN app's settings, then either exclude your local subnet or pick which apps skip the tunnel.

### Windows (NordVPN, ExpressVPN, Surfshark)

1. Open the VPN app → **Settings** → **Split Tunneling**
2. Toggle it on
3. Choose **"Exclude these apps"** to keep specific apps outside the tunnel (e.g., Plex Media Server, your Jellyfin client) — or add your local subnet under **advanced/custom routes** if the client exposes it
4. Reconnect the VPN for the rule to take effect

NordVPN and Surfshark both expose per-app split tunneling directly in the desktop client. ExpressVPN's split tunneling lives under **Settings → Split Tunneling** and offers the same include/exclude app list.

### Android

Android's split tunneling is app-based and usually the cleanest implementation:

1. VPN app → **Settings** → **Split Tunneling** (sometimes called **"App Exceptions"**)
2. Select apps to exclude — add your Plex/Jellyfin/Emby app, your local network scanner, and any smart home apps
3. Save and reconnect

This is particularly useful on a phone that doubles as a remote for your HTPC — exclude the remote-control app so it always finds your media server on the local network, while your browser still goes through the VPN.

### iOS

Apple's platform restricts full split tunneling in most third-party VPN apps due to how iOS handles network extensions, but the major providers work around it:

1. VPN app → **Settings** → look for **"Split Tunneling"** or **"Local Network"** toggle
2. If a dedicated split tunneling menu isn't available, look for a simpler **"Bypass VPN for local network"** switch — this covers the most common use case (reaching your Plex server on Wi-Fi) without full app-level control

If your provider's iOS app has no split tunneling option at all, the router-level approach below is the more reliable fix for Apple devices.

### Router-Level (Policy-Based Routing)

If you run a VPN client directly on your router — the setup covered in our [router VPN guide](/vpn/vpn-on-router-whole-home-streaming/) — split tunneling happens via policy-based routing instead of an app toggle:

1. In your router's VPN client settings (stock firmware, Merlin, DD-WRT, or OpenWrt), look for **Policy Rules** or **Selective Routing**
2. Add a rule that excludes your local subnet from the VPN's routing table — this is usually automatic since local traffic never needs to leave the LAN, but double-check if you're seeing local devices drop off
3. For more granular control, add rules by device (route only specific MAC addresses or IPs through the VPN, leave the rest on the normal WAN connection) — useful if only one streaming box needs geo-unblocking while everything else stays direct

This is the approach to use if you want, say, only your Fire TV Stick tunneled through a VPN server in another region while your Plex server, NAS, and every other device on the network uses your normal ISP connection untouched.

## A Quick Reference Table

| Situation | Recommended Setup |
|---|---|
| Phone/laptop at home, want local Plex access + VPN for browsing | App-based split tunneling, exclude media client apps |
| Single streaming box needs geo-unblocking, rest of network doesn't | Router policy-based routing, route by device |
| Whole household wants privacy on every device | Full tunnel at the router (no split tunneling) |
| Public Wi-Fi, want everything encrypted | Full tunnel on the client, split tunneling off |
| Local network devices keep disappearing after connecting VPN | Exclude local subnet (192.168.x.0/24) from the tunnel |

## Common Problems and Fixes

**Split tunneling option is greyed out.** Some VPN protocols don't support split tunneling — this is common with certain OpenVPN configurations on mobile. Switch to [WireGuard](/vpn/wireguard-vs-openvpn-streaming-2026/) if your provider supports it; it has broader split tunneling compatibility across clients.

**Excluded apps still can't reach local devices.** The app-level rule usually only affects that app's own traffic, not DNS resolution. If your Plex app finds the server but playback still fails, check whether the VPN app is also intercepting DNS queries — some clients apply DNS routing globally even with split tunneling on. Look for a "route DNS through VPN" toggle and turn it off for excluded traffic.

**Split tunneling breaks after a VPN update.** App-based rules occasionally reset after client updates. Worth a quick check in settings after any auto-update if local access suddenly stops working.

## Bottom Line

Split tunneling turns "VPN on" from a binary switch into something you can actually live with day to day. Set your media server apps and local subnet to bypass the tunnel, leave everything else routed through the VPN, and you get the privacy and geo-unblocking benefits without sacrificing the local-network speed and discovery that Plex, Jellyfin, and your smart home gear depend on. It's a five-minute setting that fixes the single most common complaint people have after installing a VPN.

<!-- AFFILIATE PLACEHOLDER: replace search URL with specific ASIN link -->
<div class="affiliate-box">
  <div class="affiliate-box-content">
    <div class="affiliate-box-title">NordVPN</div>
    <div class="affiliate-box-description">App-based split tunneling built into the desktop and Android clients</div>
  </div>
  <a href="{{ affiliates.nordvpn.affiliateUrl }}" target="_blank" rel="nofollow sponsored noopener" class="affiliate-box-link">Get NordVPN →</a>
</div>

<div class="affiliate-box">
  <div class="affiliate-box-content">
    <div class="affiliate-box-title">Surfshark</div>
    <div class="affiliate-box-description">Unlimited devices with per-app split tunneling on every platform</div>
  </div>
  <a href="{{ affiliates.surfshark.affiliateUrl }}" target="_blank" rel="nofollow sponsored noopener" class="affiliate-box-link">Get Surfshark →</a>
</div>

<div class="affiliate-box">
  <div class="affiliate-box-content">
    <div class="affiliate-box-title">ExpressVPN</div>
    <div class="affiliate-box-description">Reliable split tunneling on Windows, Mac, and Android clients</div>
  </div>
  <a href="{{ affiliates.expressvpn.affiliateUrl }}" target="_blank" rel="nofollow sponsored noopener" class="affiliate-box-link">Get ExpressVPN →</a>
</div>

## Related Reading

- [VPN on Your Router for Whole-Home Streaming](/vpn/vpn-on-router-whole-home-streaming/)
- [WireGuard vs OpenVPN for Streaming](/vpn/wireguard-vs-openvpn-streaming-2026/)
- [Best VPNs for Streaming in 2026](/vpn/best-vpn-streaming-2026/)
