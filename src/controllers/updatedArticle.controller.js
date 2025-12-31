import UpdatedArticle from "../models/updatedArticle.model.js";

export const createUpdatedArticle = async (req, res) => {
  try {
    const article = await UpdatedArticle.create(req.body);
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
