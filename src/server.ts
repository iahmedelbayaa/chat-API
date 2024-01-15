import express from 'express';
import cors from 'cors';
import connect from './config/mongo.connection';
import dotenv from 'dotenv';
import router from './routers/router';
const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', router);




app.listen(PORT, async() => {
  await connect();
  console.log(`Server running at http://localhost:${PORT}`);
});