import puppeteer from "puppeteer";
import dotenv from "dotenv";
import Article from "../models/article.model.js";

dotenv.config();

const scrapeOldestBlogs = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(process.env.BLOGS_URL, {
      waitUntil: "networkidle2",
    });

    await page.waitForSelector(".blog-card");

    const articles = await page.evaluate((BASE_URL) => {
      const cards = document.querySelectorAll(".blog-card");
      const data = [];

      cards.forEach((card) => {
        const title = card.querySelector("h3")?.innerText || "";
        const description = card.querySelector("p")?.innerText || "";
        let link = card.querySelector("a")?.getAttribute("href") || "";

        if (link && !link.startsWith("http")) {
          link = BASE_URL + link;
        }

        data.push({ title, description, link });
      });

      return data;
    }, process.env.BASE_URL);

    const oldestFive = articles.slice(-5);

    for (const article of oldestFive) {
      await Article.updateOne(
        { link: article.link },
        { $setOnInsert: article },
        { upsert: true }
      );
    }

    await browser.close();
    console.log("Scraped & stored 5 oldest blogs");
  } catch (err) {
    console.error("Scraping failed:", err.message);
  }
};

export default scrapeOldestBlogs;
