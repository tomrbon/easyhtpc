# Internal Linking Strategy for EasyHTPC

This document outlines the internal linking architecture to improve SEO, user engagement, and content discoverability.

---

## 🎯 Linking Principles

1. **Relevance First** - Only link to genuinely relevant content
2. **User Value** - Links should help users find what they need
3. **Natural Flow** - Links should feel organic, not forced
4. **Descriptive Anchors** - Use descriptive anchor text
5. **Strategic Depth** - Link from high-authority pages to newer content

---

## 🔗 Related Articles System

### Plugin/Filter Implementation

The `relatedArticles` filter in `.eleventy.js` scores articles based on:

| Factor | Weight | Reason |
|--------|--------|--------|
| Same category | +10 | Highest relevance |
| Shared tags | +3 per tag | Topic similarity |
| Same section | +2 | Broad relevance |

### Usage in Templates

```njk
{# In article.njk layout #}
{% set related = article | relatedArticles(collections.posts, 3) %}
{% if related.length > 0 %}
<section class="related-articles">
  <h2>Related Articles</h2>
  <div class="article-grid">
    {% for rel in related %}
    <article class="article-card">
      <a href="{{ rel.url }}">
        <img src="{{ rel.data.image }}" alt="{{ rel.data.title }}" loading="lazy">
        <h3>{{ rel.data.title }}</h3>
        <p>{{ rel.data.description | truncate(120) }}</p>
      </a>
    </article>
    {% endfor %}
  </div>
</section>
{% endif %}
```

### Manual Override

Articles can specify related articles in front matter:

```yaml
---
title: Best VPN for Streaming 2026
related:
  - slug: /vpn/geo-blocked-plex/
  - slug: /vpn/nordvpn-vs-expressvpn/
---
```

---

## 📂 Category Page Strategy

### Category Structure

```
/                           # Homepage (links to all categories)
├── /media-servers/         # Category hub
│   ├── /media-servers/plex/
│   ├── /media-servers/jellyfin/
│   └── /media-servers/kodi/
├── /streaming-devices/     # Category hub
│   ├── /streaming-devices/nvidia-shield/
│   ├── /streaming-devices/apple-tv/
│   └── /streaming-devices/roku/
├── /htpc-builds/           # Category hub
│   └── /htpc-builds/mini-pc/
├── /nas-storage/           # Category hub
│   ├── /nas-storage/synology/
│   └── /nas-storage/qnap/
└── /vpn/                   # Category hub
    └── /vpn/streaming/
```

### Category Page Layout

Each category page should include:

1. **Header Section**
   - Category title and description
   - Quick navigation to subcategories

2. **Featured Articles** (3-4)
   - Most important/popular articles in category
   - Marked with `featured: true` in front matter

3. **Article Grid**
   - All articles in category, sorted by date
   - Pagination if > 12 articles

4. **Related Categories Sidebar**
   - Cross-links to related categories
   - Example: NAS category links to Media Servers

5. **FAQ Schema**
   - Common category questions
   - Improves SEO and user experience

### Cross-Category Linking Rules

| From Category | Link To | Reason |
|---------------|---------|--------|
| VPN | Media Servers | Remote access security |
| VPN | Streaming Devices | Geo-blocking bypass |
| Media Servers | NAS Storage | Media storage needs |
| HTPC Builds | Streaming Devices | Hardware comparison |
| Streaming Devices | VPN | Privacy/access |

---

## 🏠 Hub Pages

Hub pages are content-rich landing pages for key topics. They aggregate all related content and target high-volume keywords.

### Hub Page Topics

| Hub | Target Keywords | Content Focus |
|-----|-----------------|---------------|
| `/vpn/` | VPN for streaming, VPN for cord cutting | VPN guides, comparisons, reviews |
| `/nas/` | Best NAS for Plex, NAS for home media | NAS reviews, setup guides |
| `/mini-pc/` | Best mini PC for HTPC, mini PC for Plex | Hardware reviews, build guides |

### Hub Page Template Structure

```njk
{# _includes/layouts/hub.njk #}

<article class="hub-page">
  {# Hero Section #}
  <header class="hub-hero">
    <h1>{Hub Title}</h1>
    <p class="hub-description">{Hub description}</p>
  </header>
  
  {# Quick Navigation #}
  <nav class="hub-nav">
    <a href="#guides">Guides</a>
    <a href="#reviews">Reviews</a>
    <a href="#comparisons">Comparisons</a>
  </nav>
  
  {# Featured Content - Editor's Picks #}
  <section class="hub-featured">
    <h2>Editor's Picks</h2>
    {# 3 featured articles #}
  </section>
  
  {# Best of Lists #}
  <section class="hub-best-lists">
    <h2>Best [Products] in 2026</h2>
    {# Comparison cards with affiliate links #}
  </section>
  
  {# How-To Guides #}
  <section class="hub-guides">
    <h2>How-To Guides</h2>
    {# List of tutorials #}
  </section>
  
  {# Product Reviews #}
  <section class="hub-reviews">
    <h2>Product Reviews</h2>
    {# Review grid #}
  </section>
  
  {# FAQ Section #}
  <section class="hub-faq">
    <h2>Frequently Asked Questions</h2>
    {# FAQ items with schema #}
  </section>
  
  {# Related Hubs #}
  <aside class="hub-related">
    <h2>Related Topics</h2>
    {# Links to other hubs #}
  </aside>
</article>
```

### Hub: VPN Hub (`/vpn/`)

**Target Keywords:**
- VPN for streaming
- VPN for Plex
- VPN for Netflix
- Best VPN for cord cutters

**Content Sections:**
1. **Best VPNs Overview** - Quick comparison table
2. **VPN for Streaming** - Geo-blocking articles
3. **VPN for Media Servers** - Security guides
4. **VPN Reviews** - Individual VPN reviews
5. **VPN Comparisons** - Head-to-head articles

**Internal Links:**
- `/vpn/best-vpn-streaming-2026/` (primary)
- `/vpn/geo-blocked-plex/`
- `/vpn/nordvpn-vs-expressvpn/`
- `/vpn/secure-remote-access/`
- `/vpn/vpn-for-kodi/`

### Hub: NAS Hub (`/nas/`)

**Target Keywords:**
- Best NAS for Plex
- NAS for home media
- Synology vs QNAP
- NAS setup guide

**Content Sections:**
1. **Best NAS for Plex** - Product recommendations
2. **NAS Setup Guides** - How-to content
3. **NAS Reviews** - Individual product reviews
4. **Hard Drive Recommendations** - Storage accessories

**Internal Links:**
- `/nas/best-nas-for-plex-2026/`
- `/nas/synology-ds923-review/`
- `/nas/setup-guide/`
- `/nas/best-hard-drives-nas/`

### Hub: Mini PC Hub (`/mini-pc/`)

**Target Keywords:**
- Best mini PC for HTPC
- Mini PC for Plex server
- Intel NUC vs Beelink
- Mini PC 4K streaming

**Content Sections:**
1. **Best Mini PCs** - Comparison article
2. **Mini PC Reviews** - Individual reviews
3. **Build Guides** - DIY HTPC content
4. **Accessories** - Cases, cooling, etc.

**Internal Links:**
- `/mini-pc/best-mini-pc-htpc-2026/`
- `/mini-pc/intel-nuc-13-review/`
- `/mini-pc/beelink-ser7-review/`
- `/mini-pc/htpc-build-guide/`

---

## 📝 Article Linking Guidelines

### Links Per Article

| Article Length | Minimum Internal Links |
|----------------|------------------------|
| < 1500 words | 3-5 |
| 1500-3000 words | 5-10 |
| > 3000 words | 10-15 |

### Anchor Text Guidelines

**Good Anchor Text:**
- "NVIDIA Shield Pro review"
- "setting up Jellyfin"
- "best VPNs for streaming"
- "Synology DS923+ NAS"

**Bad Anchor Text:**
- "click here"
- "read more"
- "this article"
- "https://easyhtpc.com/..."

### Contextual Link Placement

Place internal links in these locations:

1. **Introduction** - Link to core/definitive guides
2. **Body content** - Link to relevant supporting articles
3. **Product mentions** - Link to detailed reviews
4. **Conclusion** - Link to next steps/related content
5. **Related articles section** - Algorithm-selected links

### Link Priority Score

When deciding which articles to link, prioritize by:

| Priority | Link Type | Example |
|----------|-----------|---------|
| 1 | Hub pages | `/vpn/`, `/nas/` |
| 2 | Affiliate articles | Product reviews with affiliate links |
| 3 | Definitive guides | Comprehensive "best of" articles |
| 4 | Supporting articles | How-tos, comparisons |
| 5 | Older content | Link to refresh older articles |

---

## 🔄 Content Clusters

Organize content into themed clusters around pillar pages:

### Media Server Cluster
```
Pillar: /media-servers/
├── /media-servers/jellyfin-plex-emby-comparison/
├── /media-servers/plex-setup-guide/
├── /media-servers/jellyfin-setup-guide/
├── /media-servers/best-hardware-plex-server/
└── /media-servers/plex-alternatives/
```

### VPN Cluster
```
Pillar: /vpn/
├── /vpn/best-vpn-streaming-2026/
├── /vpn/geo-blocked-plex/
├── /vpn/vpn-for-kodi/
├── /vpn/nordvpn-review/
├── /vpn/expressvpn-review/
└── /vpn/nordvpn-vs-expressvpn/
```

### NAS Cluster
```
Pillar: /nas/
├── /nas/best-nas-for-plex-2026/
├── /nas/setup-guide/
├── /nas/synology-ds923-review/
├── /nas/qnap-ts-464-review/
└── /nas/best-hard-drives-nas/
```

---

## 🛠️ Navigation Structure

### Main Navigation
```
Home | Media Servers | Streaming Devices | HTPC Builds | NAS Storage | VPN
```

### Footer Navigation
```
Home | About | Contact | Privacy Policy | Affiliate Disclosure | Sitemap

Categories:
- Media Servers (Plex, Jellyfin, Kodi)
- Streaming Devices (Shield, Apple TV, Roku)
- Hardware (Mini PCs, NAS, Accessories)
- VPN & Privacy

Popular Articles:
- Best VPN for Streaming
- Jellyfin vs Plex Comparison
- Best NAS for Plex
```

### Breadcrumb Structure
```
Home > Category > Subcategory > Article

Examples:
Home > VPN > Streaming > Best VPN for Streaming 2026
Home > NAS > Reviews > Synology DS923+ Review
Home > Hardware > Mini PCs > Best Mini PC for HTPC
```

---

## 📊 Monitoring & Metrics

Track these metrics to evaluate internal linking effectiveness:

| Metric | Tool | Target |
|--------|------|--------|
| Crawl depth | Screaming Frog | < 4 clicks from home |
| Orphan pages | Site audit tool | 0 |
| Internal link count | Ahrefs/Semrush | Increasing trend |
| Pages per session | GA4 | > 2.5 |
| Bounce rate | GA4 | < 60% |
| Time on site | GA4 | > 2 minutes |

### Quarterly Audit Tasks

- [ ] Identify and fix orphan pages
- [ ] Update links to deprecated articles
- [ ] Add links to new content from hubs
- [ ] Review anchor text distribution
- [ ] Check for broken internal links
- [ ] Analyze page performance by link depth

---

_Implementation date: 2026-02-18_