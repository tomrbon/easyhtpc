// Directory data file — applies to every file in posts/
// Computes a clean, category-based permalink from each post's filename and
// category front matter, e.g.:
//   posts/05-best-mini-pc-plex-2026.md  +  category: mini-pcs
//   → /mini-pcs/best-mini-pc-plex-2026/
module.exports = {
  eleventyComputed: {
    permalink: data => {
      const slug = data.page.fileSlug.replace(/^\d+-/, '');
      const cat = data.category || 'articles';
      return `/${cat}/${slug}/`;
    }
  }
};
