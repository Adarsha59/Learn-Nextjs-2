# Connecting MongoDB to Next.js

## Introduction

In this tutorial, we will explore how to connect a MongoDB database to a Next.js application. We will create a `server/db/connectDB.js` file that will handle the connection to our MongoDB instance.

## Prerequisites

- Node.js installed on your machine
- Next.js installed globally or in your project
- MongoDB installed and running on your machine
- A `.env` file with `DB_URL` and `DBNAME`

## Code

```javascript
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionOptions = {
      dbName: process.env.DBNAME, // Make sure this is set in your .env file
      useNewUrlParser: true, // Ensures that the new connection string parser is used
      useUnifiedTopology: true, // Enables the new Server Discovery and Monitoring engine
    };
    const db = await mongoose.connect(process.env.DB_URL, connectionOptions);

    console.log(`MongoDB connected: ${db.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if the connection fails
  }
};

export default connectDB;
```

```
Explanation
Import the mongoose package, which provides a straight-forward, schema-based solution to model your application data.
Define the connectDB function that will handle the connection to MongoDB.
Use the mongoose.connect method to connect to the MongoDB instance using the DB_URL and DBNAME from the .env file.
Set the connectionOptions to use the new connection string parser and the new Server Discovery and Monitoring engine.
Log a success message to the console when the connection is successful.
Exit the process if the connection fails.
Export the connectDB function to be used in other parts of the application.

```

# Creating a Mongoose Model for a Database

=====================================

## Introduction

In this example, we will create a Mongoose model for a database. Mongoose is a popular Object Data Modeling (ODM) library for MongoDB that provides a simple and intuitive way to interact with our database.

## The Code

```javascript
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  details: { type: String, required: true },
  price: { type: String, required: true },
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;
```

```
Explanation
What is a Mongoose Model?
Definition
A Mongoose model is an instance of the mongoose.Model class that represents a collection of documents in a MongoDB database.

Purpose
It provides a way to interact with the database, including creating, reading, updating, and deleting documents.

Breaking Down the Code
Importing Mongoose
import mongoose from "mongoose";
This line imports the mongoose library, which is required to create a Mongoose model.

Defining the PostSchema
const PostSchema = new mongoose.Schema({ ... });
The PostSchema is defined using the mongoose.Schema constructor. It specifies the structure of the data that will be stored in the database.

Fields
name: a required string field
details: a required string field
price: a required string field
Creating the Post Model
const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
The Post model is created using the mongoose.model method. If a model with the name "Post" already exists, it will be retrieved from the mongoose.models cache. Otherwise, a new model will be created using the PostSchema.
```

# GET API Function

### Purpose

This is an asynchronous function that retrieves all blog post data from a MongoDB database and returns it in the response.

### Code

```javascript
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
```

### code

```javascript
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
```

## Post data using react form hook

```javascript
import { useState } from "react";
import { useForm } from "react-hook-form";

const AddData = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState("");
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Failed to add data:", error);
      alert("Failed to add data");
    }
  };
  console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

 <form onSubmit={handleSubmit(onSubmit)}>
<input
            type="text"
            className="grow"
            placeholder="name"
            {...register("name")}
          />
```

### Fetch data from server

```javascript
"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Blog = () => {
  const [data, setData] = useState([]); // Initialize state to store fetched data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/task"); // Make sure the API route is correct
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json(); // Parse the data as JSON
        console.log("Fetched data:", result); // Log the entire result
        setData(result.data); // Set the fetched data in state
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setData([]); // Reset the state if there's an error
      }
    };

    fetchData(); // Fetch the data when the component is mounted
  }, []); // Empty dependency array means this will run once on component mount
```

## Authors

- [Adarsha Paudyal](https://github.com/Adarsha59)
