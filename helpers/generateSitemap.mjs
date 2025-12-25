import fs from "fs";
import path from "path";

const BASE_URL = "https://toph.pages.dev";

async function generateSitemap() {
  try {
    // 1. Fetch user data
    const response = await fetch(
      "https://toph-backend.netlify.app/api/leaderboard",
    );
    if (!response.ok) throw new Error("Failed to fetch leaderboard");

    const data = await response.json();
    const userNames = new Set();

    ["fastest", "lightest", "shortest"].forEach((key) => {
      if (data[key]) {
        Object.keys(data[key]).forEach((name) => userNames.add(name));
      }
    });

    // 2. XML Header
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/user</loc>
    <priority>0.6</priority>
  </url>`;

    // 3. Add dynamic user URLs
    userNames.forEach((user) => {
      // Use encodeURIComponent for usernames with special characters
      const safeUser = encodeURIComponent(user);
      xml += `
  <url>
    <loc>${BASE_URL}/user?id=${safeUser}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    xml += `\n</urlset>`;

    // 4. Ensure 'out' directory exists and write file
    const outDir = "../public/";
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir);
    }

    const outPath = path.join(outDir, "sitemap.xml");
    fs.writeFileSync(outPath, xml);

    console.log(`✅ Sitemap generated: ${userNames.size} users included.`);
  } catch (error) {
    console.error("❌ Sitemap failed:", error.message);
  }
}

generateSitemap();
