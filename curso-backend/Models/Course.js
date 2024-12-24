import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["activo", "vencido", "usado"],
    default: "activo",
  },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
