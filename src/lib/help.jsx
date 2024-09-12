import mongoose from "mongoose";

export default async function connectMongo() {
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    const connectionOptions = {
      dbName: process.env.DBNAME, // Make sure this is set in your .env file
      useNewUrlParser: true, // Ensures that the new connection string parser is used
      useUnifiedTopology: true, // Enables the new Server Discovery and Monitoring engine
    };

    await mongoose.connect(process.env.DB_URL, connectionOptions);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw new Error("MongoDB connection error");
  }
}
