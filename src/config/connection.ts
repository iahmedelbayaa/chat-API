import mongoose from 'mongoose';
const uri = process.env.MONGO_URI as string;
mongoose
  .connect(uri)
  .then(() => console.log('Mongo Connection Established'))
  .catch((error) => console.log(' Mongo Connection Failed', error.message));
