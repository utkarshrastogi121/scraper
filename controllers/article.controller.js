import Article from "../models/article.model.js";
import redisClient from "../config/redis.js";

export const createArticle = async (req, res) => {
  const article = await Article.create(req.body);
  await redisClient.del("articles:all");
  res.status(201).json(article);
};

export const getAllArticles = async (req, res) => {
  const cacheKey = "articles:all";

  const cached = await redisClient.get(cacheKey);
  if (cached) return res.json(JSON.parse(cached));

  const articles = await Article.find().sort({ createdAt: -1 });

  await redisClient.setEx(cacheKey, 300, JSON.stringify(articles));
  res.json(articles);
};

export const getArticleById = async (req, res) => {
  const cacheKey = `articles:${req.params.id}`;

  const cached = await redisClient.get(cacheKey);
  if (cached) return res.json(JSON.parse(cached));

  const article = await Article.findById(req.params.id);

  await redisClient.setEx(cacheKey, 300, JSON.stringify(article));
  res.json(article);
};

export const updateArticle = async (req, res) => {
  const article = await Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  await redisClient.del("articles:all");
  await redisClient.del(`articles:${req.params.id}`);

  res.json(article);
};

export const deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);

  await redisClient.del("articles:all");
  await redisClient.del(`articles:${req.params.id}`);

  res.json({ message: "Article deleted" });
};
