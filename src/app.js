import express from 'express';
import articleRoutes from "../routes/article.routes.js"

const app = express();
app.use(express.json());

app.use("/articles", articleRoutes);

app.get("/", (_, res) => {
  res.send("BeyondChats API is running");
});

export default app;