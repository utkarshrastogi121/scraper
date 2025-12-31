import mongoose from "mongoose";

const updatedArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    originalArticleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      required: true,
    },

    originalContent: {
      type: String,
      required: true,
    },

    rewrittenContent: {
      type: String,
      required: true,
    },

    references: [
      {
        title: String,
        link: String,
      },
    ],

    status: {
      type: String,
      enum: ["rewritten", "published"],
      default: "rewritten",
    },
  },
  { timestamps: true }
);

export default mongoose.model("UpdatedArticle", updatedArticleSchema);
