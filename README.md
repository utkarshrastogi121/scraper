# 📰 BeyondChats Blog Scraper API

This project scrapes blog articles from **BeyondChats**, stores them in a database, and exposes **CRUD APIs** to manage the scraped articles.

🔗 Target Website: https://beyondchats.com/blogs/

---

## 🚀 Features

- Scrapes articles from the **last page** of BeyondChats blogs
- Fetches the **5 oldest blog articles**
- Stores scraped data in **MongoDB**
- Provides **CRUD APIs** for articles
- Uses **Redis** for caching to improve performance
- Fully **Dockerized** for easy setup and deployment

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **Puppeteer** – Web scraping
- **MongoDB** – Database
- **Redis** – Caching layer
- **Docker & Docker Compose** – Containerization

---

## Docker Setup
Run the project using Docker

```bash
docker-compose up --build
```
### Services Included
Node.js Backend
MongoDB
Redis

## Environment Variables
Create a .env file in the root directory:

```bash
PORT=3000
MONGO_URI=mongodb://mongo:27017/beyondchats
REDIS_HOST=redis
REDIS_PORT=13259
REDIS_PASSWORD=****
BLOGS_URL=https://beyondchats.com/blogs/
BASE_URL=https://beyondchats.com
```
## ▶️ Run Locally (Without Docker)
```bash
npm install
npm run dev
```
Ensure MongoDB and Redis are running locally.



## 📂 Project Structure

