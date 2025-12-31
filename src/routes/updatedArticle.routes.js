import express from "express";
import { createUpdatedArticle } from "../controllers/updatedArticle.controller.js";

const router = express.Router();

router.post("/", createUpdatedArticle);

export default router;
