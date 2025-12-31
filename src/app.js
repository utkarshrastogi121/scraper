import express from 'express';
import cors from "cors";
import articleRoutes from "../src/routes/article.routes.js"
import updatedArticleRoutes from "../src/routes/updatedArticle.routes.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/articles", articleRoutes);
app.use("/api/updated-articles", updatedArticleRoutes);


app.get("/", (_, res) => {
  res.send("BeyondChats API is running");
});

export default app;