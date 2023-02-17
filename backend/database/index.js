import mongoose from "mongoose";
import { MONGO_URL } from "../config/index.js";
export const databaseConnect = async()=>{
    await mongoose.set('strictQuery', true);
    await mongoose.connect(
        MONGO_URL
      );
}
export const db = mongoose.Connection;