import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    let mongooseURI = process.env.MONGODB_URI;
    const projectName = "Resume-Builder";

    if (!mongooseURI) {
      throw new Error(
        "Please provide MONGODB_URI in the environment variables"
      );
    }

    if (mongooseURI.endsWith('/')) {
      mongooseURI = mongooseURI.slice(0, -1);
    }

    await mongoose.connect(`${mongooseURI}/${projectName}`)
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;