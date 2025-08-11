import mongoose from "mongoose"

const QuestionSchema = new mongoose.Schema({
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
      type: String,
      trim: true,
    },
  ],
  votes: {
    type: Number,
    default: 0,
  },
  upvotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  downvotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  answers: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  isAnswered: {
    type: Boolean,
    default: false,
  },
  acceptedAnswer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastActivity: {
    type: Date,
    default: Date.now,
  },
})

// Indexes for better performance
QuestionSchema.index({ author: 1 })
QuestionSchema.index({ tags: 1 })
QuestionSchema.index({ createdAt: -1 })
QuestionSchema.index({ votes: -1 })
QuestionSchema.index({ views: -1 })
QuestionSchema.index({ title: "text", content: "text" })

export default mongoose.models.Question || mongoose.model("Question", QuestionSchema)
