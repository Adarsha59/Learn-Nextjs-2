import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  details: { type: String, required: true },
  price: { type: String, required: true },
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;
