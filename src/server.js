import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "../src/config/db.js";
import scrapeLatestBlogs from "../src/scraper/scraper.js"

dotenv.config();

const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB();

  app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await scrapeLatestBlogs();
  });
})();
