// server/db/connect.js
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
