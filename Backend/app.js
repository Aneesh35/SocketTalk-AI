import express from 'express'
import morgan from 'morgan';
import userRouter from './routes/user.routes.js';
import projectRouter from './routes/project.routes.js';
import  {aiRouter}  from './routes/ai.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();

app.use(cors())
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/project', projectRouter);
app.use('/ai', aiRouter);

app.get('/', (req, res) => {
    res.send("hello world");
})

export default app;