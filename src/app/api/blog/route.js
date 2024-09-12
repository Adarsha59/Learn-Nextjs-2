// import connectMongo from "@/lib/Mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse("hello world");
}

// export async function POST(req, res) {
//   try {
//     await connectMongo();
//     const { name, email, message } = req.body;
//     // insert data into your database here
//     return NextResponse.status(201).json({
//       message: "Data added successfully",
//     });
//   } catch (error) {
//     console.error("Failed to add data", error);
//     return NextResponse.status(500).json({ message: "Failed to add data" });
//   }
// }
