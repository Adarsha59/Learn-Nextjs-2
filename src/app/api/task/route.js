import connectMongo from "@/lib/help"; // Ensure correct path
import { NextResponse } from "next/server";
import Post from "@/models/BlogPost.model"; // Ensure correct path to the Post model

export async function GET(req) {
  try {
    // Connect to MongoDB
    await connectMongo();

    // Fetch all BlogPost data
    const res = await Post.find(); // Use the correct model

    // Log the retrieved data
    console.log("Data found:", res);

    // Return the fetched data in the response
    return NextResponse.json({ msg: "GET is successful", data: res });
  } catch (error) {
    // Handle and log any errors
    console.error("Failed to get data:", error);

    // Return an error response
    return NextResponse.json(
      { message: "Failed to get data" },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  try {
    // Connect to MongoDB
    await connectMongo();

    // Parse the request body as JSON
    const data = await req.json();

    // Create a new BlogPost document
    const newPost = new Post({
      name: data.name,
      details: data.details,
      price: data.price,
    });

    // Save the new post to the database
    const savedPost = await newPost.save();

    // Log the saved post
    console.log("New post saved:", savedPost);

    // Return a success response
    return NextResponse.json({ msg: "POST is successful", data: savedPost });
  } catch (error) {
    // Handle and log any errors
    console.error("Failed to create new post:", error);

    // Return an error response
    return NextResponse.json(
      { message: "Failed to create new post" },
      { status: 500 }
    );
  }
}
