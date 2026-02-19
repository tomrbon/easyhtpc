/**
 * Eleventy Configuration for Affiliate Shortcodes
 * 
 * Add this to your .eleventy.js file to enable the shortcodes
 */

const products = require('./site/_data/products.json');
const affiliates = require('./site/_data/affiliates.json');

/**
 * Build affiliate URL from product and affiliate data
 */
function buildAffiliateUrl(product, affiliateData) {
  if (!affiliateData || !product) return '#';
  
  if (affiliateData.trackingParam === 'tag') {
    return `${affiliateData.baseUrl}${product.asin}?tag=${affiliateData.tag}`;
  }
  
  if (affiliateData.trackingParam === 'ref') {
    return product.landingPage || `${affiliateData.baseUrl}?ref=${affiliateData.ref}`;
  }
  
  return affiliateData.baseUrl;
}

/**
 * Find product by ID across all categories
 */
function findProduct(productId) {
  return products.hardware?.[productId] || 
         products.vpn?.[productId] || 
         products.software?.[productId];
}

module.exports = function(eleventyConfig) {
  
  /**
   * CTA Button Shortcode
   * Usage: {% cta "Buy on Amazon", "nvidia-shield-tv-pro", "$199.99" %}
   */
  eleventyConfig.addShortcode('cta', function(label, productId, price) {
    const product = findProduct(productId);
    const affiliateData = affiliates[product?.affiliate];
    const url = buildAffiliateUrl(product, affiliateData);
    const displayPrice = price || product?.price || '';
    
    return `<a href="${url}" 
               class="affiliate-link cta-button"
               data-product="${product?.name || productId}"
               data-price="${displayPrice}"
               target="_blank"
               rel="noopener sponsored nofollow">
      <span class="cta-icon">🛒</span>
      <span class="cta-text">${label}</span>
      <span class="cta-price">${displayPrice}</span>
    </a>`;
  });

  /**
   * Inline Affiliate Link Shortcode
   * Usage: {% affiliateLink "nvidia-shield-tv-pro", "NVIDIA Shield TV Pro" %}
   */
  eleventyConfig.addShortcode('affiliateLink', function(productId, displayText) {
    const product = findProduct(productId);
    const affiliateData = affiliates[product?.affiliate];
    const url = buildAffiliateUrl(product, affiliateData);
    const text = displayText || product?.name || productId;
    
    return `<a href="${url}" 
               class="affiliate-link"
               data-product="${product?.name || productId}"
               data-price="${product?.price || ''}"
               target="_blank"
               rel="noopener sponsored nofollow">
      ${text}
    </a>`;
  });

  /**
   * Product Card Shortcode
   * Usage: {% productCard "nvidia-shield-tv-pro" %}
   */
  eleventyConfig.addShortcode('productCard', function(productId) {
    const product = findProduct(productId);
    if (!product) return `<!-- Product not found: ${productId} -->`;
    
    const affiliateData = affiliates[product.affiliate];
    const url = buildAffiliateUrl(product, affiliateData);
    
    return `<div class="product-card" data-product-id="${productId}">
      <div class="product-card-header">
        <span class="product-category">${product.category}</span>
        <h4 class="product-name">${product.name}</h4>
      </div>
      <p class="product-description">${product.description}</p>
      <div class="product-card-footer">
        <span class="product-price">${product.price}</span>
        <a href="${url}" 
           class="product-buy-button"
           data-product="${product.name}"
           data-price="${product.price}"
           target="_blank"
           rel="noopener sponsored nofollow">
          Check Price →
        </a>
      </div>
    </div>`;
  });

  /**
   * Affiliate Disclosure Shortcode
   * Usage: {% affiliateDisclosure %}
   */
  eleventyConfig.addShortcode('affiliateDisclosure', function() {
    return `<div class="affiliate-disclosure" role="note" aria-label="Affiliate Disclosure">
      <div class="disclosure-icon" aria-hidden="true">ℹ️</div>
      <div class="disclosure-content">
        <p><strong>Disclosure:</strong> EasyHTPC is reader-supported. When you buy through links on our site, we may earn an affiliate commission at no extra cost to you. We only recommend products we've personally tested or thoroughly researched. <a href="/affiliate-disclosure/" class="disclosure-link">Learn more about our affiliate policy</a>.</p>
      </div>
    </div>`;
  });

  // Pass through CSS
  eleventyConfig.addPassthroughCopy('site/_includes/assets/css/*.css');
  
  return {
    dir: {
      input: 'site',
      output: '_site',
      includes: '_includes',
      data: '_data'
    }
  };
};