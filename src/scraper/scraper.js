import puppeteer from "puppeteer";
import dotenv from "dotenv";
import Article from "../models/article.model.js";

dotenv.config();

const scrapeLatestBlogs = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.goto(process.env.BLOGS_URL, { waitUntil: "networkidle2" });

    // Wait for the main container of articles
    await page.waitForSelector(".entries .entry-card", { timeout: 10000 });

    const articles = await page.evaluate((BASE_URL) => {
      const cards = document.querySelectorAll(".entries .entry-card");
      const data = [];

      cards.forEach((card) => {
        const titleEl = card.querySelector(".entry-title a");
        const descEl = card.querySelector(".entry-excerpt p");
        const linkEl = card.querySelector("a.ct-media-container");

        const title = titleEl?.innerText.trim() || "";
        const description = descEl?.innerText.trim() || "";
        let link = linkEl?.getAttribute("href") || "";

        if (link && !link.startsWith("http")) {
          link = BASE_URL + link;
        }

        if (title && link) {
          data.push({ title, description, link });
        }
      });

      return data;
    }, process.env.BASE_URL);

    if (!articles.length) {
      console.log("No articles found, skipping...");
      await browser.close();
      return;
    }

    const latestFive = articles.slice(0, 5);

    for (const article of latestFive) {
      await Article.updateOne(
        { link: article.link },
        { $setOnInsert: article },
        { upsert: true }
      );
      console.log(`Upserted: ${article.title}`);
    }

    await browser.close();
    console.log("Scraped & stored 5 latest blogs successfully");
  } catch (err) {
    console.error("Scraping failed:", err.message);
  }
};

export default scrapeLatestBlogs;
