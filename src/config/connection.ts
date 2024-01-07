import mongoose from 'mongoose';
const uri = process.env.MONGO_URI as string; ;
mongoose.connect(uri);
