/**
 * Eleventy Sitemap Configuration
 * 
 * Add this to your .eleventy.js config file:
 * const sitemap = require('./ejs-sitemap');
 * 
 * Or use the official @quasibit/eleventy-plugin-sitemap plugin:
 * npm install @quasibit/eleventy-plugin-sitemap
 */

const SITE_URL = 'https://easyhtpc.com';

/**
 * Sitemap generation filter
 * Use in .eleventy.js to filter which pages appear in sitemap
 */
function sitemapFilter(collection) {
  return collection.getAll().filter((item) => {
    // Exclude pages with no output
    if (!item.url || item.url === false) return false;
    
    // Exclude pages marked as noindex
    if (item.data.robots && item.data.robots.includes('noindex')) return false;
    
    // Exclude draft posts
    if (item.data.draft === true) return false;
    
    // Exclude tag pages (usually thin content)
    if (item.data.tags && item.data.layout === 'tag.njk') return false;
    
    // Include everything else
    return true;
  });
}

/**
 * Generate sitemap entries with SEO-friendly defaults
 */
function generateSitemapEntry(page) {
  const entry = {
    url: `${SITE_URL}${page.url}`,
    lastmod: page.date.toISOString(),
    changefreq: 'weekly',
    priority: 0.7
  };
  
  // Override with front matter values
  if (page.data.sitemap) {
    if (page.data.sitemap.lastmod) {
      entry.lastmod = new Date(page.data.sitemap.lastmod).toISOString();
    }
    if (page.data.sitemap.changefreq) {
      entry.changefreq = page.data.sitemap.changefreq;
    }
    if (page.data.sitemap.priority !== undefined) {
      entry.priority = page.data.sitemap.priority;
    }
  }
  
  // Smart defaults based on page type
  if (page.url === '/') {
    entry.priority = 1.0;
    entry.changefreq = 'daily';
  } else if (page.data.layout === 'article.njk' || page.data.layout === 'post.njk') {
    entry.priority = 0.8;
    entry.changefreq = 'monthly';
  } else if (page.data.layout === 'category.njk' || page.data.layout === 'hub.njk') {
    entry.priority = 0.9;
    entry.changefreq = 'weekly';
  }
  
  return entry;
}

module.exports = {
  SITE_URL,
  sitemapFilter,
  generateSitemapEntry
};