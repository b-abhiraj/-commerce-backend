import express from 'express';
import dotenv from 'dotenv';
import ConnectDb from './config/db.js';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js'
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

ConnectDb();

const PORT = process.env.PORT;


app.use('/api/v1/auth', authRoutes);


app.get('/', (req, res) => {
    res.send('Hello');
})

app.listen(PORT, () => {
    console.log(`Server is in ${process.env.DEV_MODE} mode running on ${PORT}`);
});