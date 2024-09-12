import mongoose from "mongoose";

export async function connectMongo() {
  if (mongoose.connections[0].readyState) {
    // Use existing connection
    return;
  }

  try {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(process.env.DB_URL, dbOptions);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

export default connectMongo;
