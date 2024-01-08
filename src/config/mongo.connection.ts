import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI as string;

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Database connected');
  } catch (error) {
    console.log(error);
  }
};
export default connect;

