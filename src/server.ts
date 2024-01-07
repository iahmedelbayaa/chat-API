import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});