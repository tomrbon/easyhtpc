# Image SEO Guidelines for EasyHTPC

This document outlines the recommended image specifications and optimization practices for the EasyHTPC website.

---

## 📐 Image Size Specifications

### 1. Open Graph / Social Sharing Images
**Dimensions:** 1200 x 630 pixels (1.91:1 ratio)  
**Format:** JPEG or PNG  
**Max file size:** 1MB (ideally < 200KB)

**Purpose:**
- Facebook, Twitter, LinkedIn shares
- WhatsApp/Telegram link previews
- Pinterest pins

**Naming convention:** `og-{article-slug}.jpg`

**Best practices:**
- Include article title on the image (visible, readable)
- Brand logo in corner (subtle, 15-20% of image)
- High contrast for text overlay
- No critical content within 50px of edges (image cropping varies)

---

### 2. Featured Images (Article Headers)
**Dimensions:** 1920 x 1080 pixels (16:9 ratio) or 1600 x 900 pixels  
**Format:** WebP (with JPEG fallback)  
**Max file size:** 150KB

**Purpose:**
- Article header/hero images
- Category page thumbnails
- Newsletter images

**Naming convention:** `{article-slug}-featured.webp`

---

### 3. Content Images (In-Article)
**Dimensions:** 800-1200px wide (height varies)  
**Format:** WebP (with JPEG fallback)  
**Max file size:** 100KB per image

**Types:**
| Type | Width | Use Case |
|------|-------|----------|
| Full-width | 1200px | Step-by-step screenshots, comparisons |
| Large | 800px | Product shots, UI screenshots |
| Medium | 600px | Inline images, side-by-side comparisons |
| Thumbnail | 300px | Product cards, related articles |

**Naming convention:** `{article-slug}-{description}.webp`

---

### 4. Product Images (For Reviews)
**Dimensions:** 600 x 600 pixels (square) or 800 x 600 pixels (4:3)  
**Format:** WebP or PNG (if transparency needed)  
**Max file size:** 75KB

**Purpose:**
- Product review cards
- Comparison tables
- Affiliate link CTAs

**Naming convention:** `{product-name}-{angle}.webp`

---

### 5. Thumbnail Images (For Lists/Grids)
**Dimensions:** 400 x 300 pixels (4:3 ratio) or 400 x 225 pixels (16:9)  
**Format:** WebP  
**Max file size:** 30KB

**Purpose:**
- Related articles grid
- Category page listings
- Search results

**Naming convention:** `{article-slug}-thumb.webp`

---

### 6. Logo and Branding
| Image | Dimensions | Format | Notes |
|-------|------------|--------|-------|
| Main logo | 300 x 60px | SVG or PNG | Transparent background |
| Logo (2x) | 600 x 120px | PNG | For retina displays |
| Favicon | 32 x 32px | ICO | Standard favicon |
| Apple Touch | 180 x 180px | PNG | iOS home screen |
| Social profile | 400 x 400px | PNG | Twitter/Facebook profile |

---

## 🏷️ Alt Text Guidelines

### General Rules
- **Be descriptive** - Describe what's in the image
- **Be concise** - 125 characters max (ideal: 50-80)
- **Include keywords** - Where natural and relevant
- **Never keyword stuff** - Don't list keywords
- **Don't say "image of"** - Screen readers already announce it

### By Article Category

#### VPN Articles
```
Good: "NordVPN app dashboard showing connected server location"
Good: "ExpressVPN speed test results showing 95Mbps download"
Bad: "NordVPN image"
Bad: "VPN software screenshot image of VPN"
```

#### Hardware Reviews
```
Good: "NVIDIA Shield TV Pro rear ports showing HDMI and ethernet"
Good: "Synology DS923+ front view with four drive bays"
Good: "Intel NUC 13 Pro next to coffee mug for scale"
Bad: "NVIDIA Shield"
Bad: "Product photo"
```

#### Setup Tutorials
```
Good: "Plex Media Server settings showing remote access configuration"
Good: "Jellyfin dashboard displaying movie library"
Good: "Step 3: Select your NAS from the discovery list"
Bad: "Screenshot 2024-02-18"
Bad: "Settings"
```

#### Comparison Tables
```
Good: "Jellyfin vs Plex vs Emby comparison chart"
Good: "Streaming device size comparison showing Shield, Apple TV, and Roku"
Bad: "Comparison image"
```

### Alt Text Templates by Content Type

| Content Type | Template |
|--------------|----------|
| Product hero | `{Product Name} - {key feature visible}` |
| Screenshot | `{App Name} - {screen/feature shown}` |
| Chart/graph | `{Data type} comparison showing {key finding}` |
| Step image | `Step {N}: {action being demonstrated}` |
| Comparison | `{Item A} vs {Item B} comparison - {what's compared}` |

---

## 🖼️ File Naming Conventions

### Pattern
```
{article-slug}-{image-type}-{description}.{ext}
```

### Examples
```
best-vpn-streaming-2026-og.jpg              # Open Graph
best-vpn-streaming-2026-featured.webp       # Featured article
best-vpn-streaming-2026-nordvpn-speed.webp  # Inline content
nvidia-shield-pro-featured.webp             # Featured
nvidia-shield-pro-ports.webp                # Product detail
```

### SEO-Friendly Naming Rules
1. Use lowercase letters only
2. Separate words with hyphens (-)
3. Include main keyword naturally
4. Be descriptive but concise
5. No special characters or spaces
6. Include article date for time-sensitive content

---

## ⚡ Performance Optimization

### Compression Tools
- **Online:** Squoosh, TinyPNG, ImageOptim
- **CLI:** `imagemin`, `sharp`, `optipng`
- **Build-time:** Eleventy Image plugin

### Format Recommendations
| Scenarios | Recommended Format |
|-----------|-------------------|
| Photos/complex images | WebP (fallback: JPEG) |
| Graphics with text | WebP (fallback: PNG) |
| Logos/icons | SVG |
| Screenshots | WebP (fallback: PNG) |
| Transparent images | WebP (fallback: PNG) |

### Lazy Loading
All images should use native lazy loading:
```html
<img src="image.webp" alt="Description" loading="lazy" decoding="async">
```

### Responsive Images
Provide multiple sizes using `<picture>` or `srcset`:
```html
<picture>
  <source type="image/webp" srcset="image-400.webp 400w, image-800.webp 800w">
  <img src="image-800.jpg" alt="Description" loading="lazy">
</picture>
```

---

## 📋 Image Checklist Per Article

- [ ] Open Graph image: 1200x630px, <200KB
- [ ] Featured image: 1600x900px minimum, <150KB
- [ ] All images have descriptive alt text (50-80 chars)
- [ ] File names are SEO-friendly (lowercase, hyphens)
- [ ] Images compressed and optimized
- [ ] WebP format with JPEG/PNG fallback
- [ ] Lazy loading applied to below-fold images
- [ ] Images are responsive where appropriate

---

## 🔧 Eleventy Image Shortcode

Add this to `.eleventy.js`:

```javascript
const Image = require("@11ty/eleventy-img");

eleventyConfig.addShortcode("image", async function(src, alt, sizes = "100vw") {
  let metadata = await Image(src, {
    widths: [300, 600, 900, 1200],
    formats: ["webp", "jpeg"],
    outputDir: "./_site/images/",
    urlPath: "/images/"
  });
  
  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async"
  };
  
  return Image.generateHTML(metadata, imageAttributes);
});
```

Usage in templates:
```njk
{% image "./src/images/shield-pro.jpg", "NVIDIA Shield TV Pro", "(min-width: 768px) 50vw, 100vw" %}
```

---

_Last updated: 2026-02-18_