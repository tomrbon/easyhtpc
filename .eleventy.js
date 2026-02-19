/**
 * Eleventy Configuration for EasyHTPC
 * 
 * Includes sitemap generation and SEO optimizations
 */

const yaml = require("js-yaml");

module.exports = function(eleventyConfig) {
  
  // ═══════════════════════════════════════════════════════════════════════════
  // YAML Front Matter Support
  // ═══════════════════════════════════════════════════════════════════════════
  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SITEMAP GENERATION
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Add a collection for sitemap URLs
  eleventyConfig.addCollection('sitemap', function(collectionApi) {
    return collectionApi.getAll().filter((item) => {
      // Exclude pages with no output
      if (!item.url || item.url === false) return false;
      
      // Exclude pages marked as noindex
      if (item.data.robots && item.data.robots.includes('noindex')) return false;
      
      // Exclude draft posts
      if (item.data.draft === true) return false;
      
      // Exclude admin and system pages
      if (item.url.startsWith('/admin/') || item.url.startsWith('/_')) return false;
      
      return true;
    });
  });
  
  // Sitemap priority filter - assign priority based on page type
  eleventyConfig.addFilter('sitemapPriority', function(url, data) {
    if (url === '/') return '1.0';
    if (data.layout === 'category.njk' || data.layout === 'hub.njk') return '0.9';
    if (data.layout === 'article.njk' || data.layout === 'post.njk') return '0.8';
    if (url.includes('/review/')) return '0.8';
    return '0.7';
  });
  
  // Sitemap change frequency filter
  eleventyConfig.addFilter('sitemapChangefreq', function(url, data) {
    if (url === '/') return 'daily';
    if (data.layout === 'category.njk' || data.layout === 'hub.njk') return 'weekly';
    if (data.layout === 'article.njk') return 'monthly';
    return 'weekly';
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // SEO HELPERS
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Date to ISO string (for schema.org)
  eleventyConfig.addFilter('dateToISOString', function(date) {
    if (date instanceof Date) {
      return date.toISOString();
    }
    return new Date(date).toISOString();
  });
  
  // Date formatting for display
  eleventyConfig.addFilter('dateFormat', function(date) {
    if (!date) return '';
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  });
  
  // Limit array items
  eleventyConfig.addFilter('limit', function(arr, count) {
    if (!arr || !Array.isArray(arr)) return [];
    return arr.slice(0, count);
  });
  
  // Excerpt from content
  eleventyConfig.addFilter('excerpt', function(content, length = 150) {
    if (!content) return '';
    const stripped = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    if (stripped.length <= length) return stripped;
    return stripped.substring(0, length).trim() + '...';
  });
  
  // Default value
  eleventyConfig.addFilter('default', function(value, defaultValue) {
    return value || defaultValue;
  });
  
  // Truncate text
  eleventyConfig.addFilter('truncate', function(text, length = 160) {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.substring(0, length - 3) + '...';
  });
  
  // Escape HTML for JSON-LD
  eleventyConfig.addFilter('escape', function(text) {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  });
  
  // Reading time estimate
  eleventyConfig.addFilter('readTime', function(content) {
    if (!content) return 1;
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return Math.max(1, minutes);
  });
  
  // Title case filter
  eleventyConfig.addFilter('title', function(text) {
    if (!text) return '';
    return text.replace(/\w\S*/g, txt => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // RELATED ARTICLES PLUGIN
  // For internal linking strategy
  // ═══════════════════════════════════════════════════════════════════════════
  
  eleventyConfig.addFilter('relatedArticles', function(article, allArticles, limit = 3) {
    if (!article || !allArticles) return [];
    
    const scored = allArticles
      .filter(a => a.url !== article.url) // Exclude current article
      .map(a => {
        let score = 0;
        
        // Same category = high relevance
        if (a.data.category === article.data.category) {
          score += 10;
        }
        
        // Shared tags = medium relevance
        const articleTags = article.data.tags || [];
        const aTags = a.data.tags || [];
        const sharedTags = articleTags.filter(t => aTags.includes(t));
        score += sharedTags.length * 3;
        
        // Same section = low relevance
        if (a.data.section && a.data.section === article.data.section) {
          score += 2;
        }
        
        return { article: a, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.article);
    
    return scored;
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // PASSTHROUGH COPIES
  // ═══════════════════════════════════════════════════════════════════════════
  
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("browserconfig.xml");

  // ═══════════════════════════════════════════════════════════════════════════
  // PLUGINS (install these via npm)
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Uncomment after installing: npm install @quasibit/eleventy-plugin-sitemap
  // const sitemapPlugin = require("@quasibit/eleventy-plugin-sitemap");
  // eleventyConfig.addPlugin(sitemapPlugin, {
  //   sitemap: {
  //     hostname: "https://easyhtpc.com",
  //   },
  // });

  // ═══════════════════════════════════════════════════════════════════════════
  // CONFIGURATION
  // ═══════════════════════════════════════════════════════════════════════════
  
  // ═══════════════════════════════════════════════════════════════════════════
  // COLLECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Posts collection
  eleventyConfig.addCollection('posts', function(collectionApi) {
    return collectionApi.getFilteredByGlob('posts/*.md')
      .sort((a, b) => b.date - a.date);
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // IGNORE FOLDERS
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Ignore docs folder (documentation, not content)
  eleventyConfig.ignores.add("docs/**");
  
  return {
    dir: {
      input: ".",           // Content directory
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};