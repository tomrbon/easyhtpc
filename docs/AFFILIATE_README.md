# EasyHTPC Affiliate Link System

This document explains how to use the affiliate link system throughout the site.

## Quick Reference

| Shortcode | Usage | Output |
|-----------|-------|--------|
| `{% affiliateDisclosure %}` | At top of articles with affiliate links | FTC-compliant disclosure box |
| `{% affiliateLink "product-id", "Display Text" %}` | Inline product links | Styled affiliate link |
| `{% cta "Button Text", "product-id", "$Price" %}` | Call-to-action buttons | Styled CTA button |
| `{% productCard "product-id" %}` | Product highlight boxes | Full product card |

## Setup

### 1. Include the CSS

Add to your base layout:

```html
<link rel="stylesheet" href="/assets/css/affiliate.css">
```

### 2. Add Disclosure to Articles

At the top of any article containing affiliate links:

```njk
{% affiliateDisclosure %}
```

## Usage Examples

### Inline Product Links

```njk
<p>The {% affiliateLink "nvidia-shield-tv-pro" %} is our top pick for streaming.</p>

<p>Check out the {% affiliateLink "intel-nuc-13-pro", "Intel NUC 13 Pro" %} for more power.</p>
```

### CTA Buttons

```njk
{% cta "Buy on Amazon", "nvidia-shield-tv-pro", "$199.99" %}

{% cta "Get NordVPN", "nordvpn", "$3.19/mo" %}
```

### Product Cards

```njk
{% productCard "nvidia-shield-tv-pro" %}
{% productCard "synology-ds923" %}
```

## Product Registry

All products are defined in `site/_data/products.json`. To add a new product:

```json
{
  "hardware": {
    "new-product-id": {
      "name": "Product Name",
      "asin": "B00XXXXXXXX",
      "affiliate": "amazon",
      "price": "$299.99",
      "category": "Category",
      "description": "Brief product description"
    }
  }
}
```

### Product Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Product display name |
| `asin` | For Amazon | Amazon ASIN product ID |
| `affiliate` | Yes | Key from affiliates.json |
| `price` | Yes | Display price |
| `category` | Recommended | Product category |
| `description` | Recommended | Brief description |
| `landingPage` | For VPNs | Custom landing page URL |
| `url` | For non-affiliate | Direct URL if no affiliate program |

## Affiliate Programs

Configured in `site/_data/affiliates.json`:

- **Amazon Associates** - `easyhtpc-20` tag
- **NordVPN** - `easyhtpc` referral
- **ExpressVPN** - `easyhtpc` referral
- **Surfshark** - `easyhtpc` referral

## Adding New Affiliates

1. Add to `affiliates.json`:

```json
{
  "newaffiliate": {
    "tag": "tracking-code",
    "baseUrl": "https://affiliate-site.com/",
    "trackingParam": "tag"
  }
}
```

2. Use in products:

```json
{
  "product-id": {
    "affiliate": "newaffiliate",
    ...
  }
}
```

## FTC Compliance

- Always include the affiliate disclosure at the top of articles
- Links use `rel="noopener sponsored nofollow"` attributes
- Recommendations should be genuine and based on testing/research

## Standalone Affiliate Disclosure Page

Create `/affiliate-disclosure/` page with full disclosure text for the "Learn more" link.