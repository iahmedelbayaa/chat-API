import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.MONGO_URI as string;
mongoose
  .connect(uri)
  .then(() => console.log('Mongo Connection Established'))
  .catch((error) => console.log(' Mongo Connection Failed', error.message));
