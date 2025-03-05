import express from 'express'
import morgan from 'morgan';
import router from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
const app = express();
app.use(cors())
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(router);

app.use(express.urlencoded({ extended: true }));

app.use('/user', router);

app.get('/', (req, res) => {
    res.send("hello world");
})

export default app;