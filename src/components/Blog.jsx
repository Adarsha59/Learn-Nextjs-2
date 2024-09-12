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

  // Render the data
  return (
    <div>
      <h1>Blog</h1>
      <p>Welcome to our blog page.</p>

      {/* Render the Card component for each post */}
      {data.map((post) => (
        <Card
          key={post._id} // Unique key for each card
          name={post.name}
          details={post.details}
          price={post.price}
        />
      ))}
    </div>
  );
};

export default Blog;
