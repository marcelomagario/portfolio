import express from 'express';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import createAuthRouter from './routes/authRoutes';
import createPostRouter from './routes/postRoutes';
import contactRouter from './routes/contactRoutes';
import createTagRouter from './routes/tagRoutes';
import errorHandler, { CustomError } from './middlewares/errorHandler';
import cors from 'cors';


dotenv.config();

const app = express();
const port = process.env.PORT || 3001; 

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
    ssl: {
        rejectUnauthorized: false // Necessário para conexão com RDS
    }
});

pool.connect((err, client, done) => {
    if (err) {
        console.error('Error trying to connect to Database:', err.stack);
        return;
    }
    console.log('Connected sucessfully into PostgreSQL!');
    if (client) { 
        client.release(); 
    }
});

app.use(express.json());

// For development, allow all origins
app.use(cors());

// For production, you should restrict origins like this:
/*
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL in production
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
*/


app.use('/api/auth', createAuthRouter(pool));
app.use('/api/posts', createPostRouter(pool));
app.use('/api/contact', contactRouter);
app.use('/api/tags', createTagRouter(pool));


app.get('/', (req, res) => {
    res.send('Portifolio API working properly!');
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

export default pool;