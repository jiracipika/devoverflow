import mongoose from "mongoose"

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    votes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Question || mongoose.model("Question", questionSchema)
