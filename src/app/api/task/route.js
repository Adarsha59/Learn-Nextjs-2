import connectMongo from "@/lib/Mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongo();
    return NextResponse.json({ msg: "Post is successful" }); // Send a JSON response
  } catch (error) {
    console.error("Failed to add data:", error);
    return NextResponse.json(
      { message: "Failed to add data" },
      { status: 500 }
    ); // Send error response with status 500
  }
}
