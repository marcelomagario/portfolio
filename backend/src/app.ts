import express from 'express';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import createAuthRouter from './routes/authRoutes';
import createPostRouter from './routes/postRoutes';
import contactRouter from './routes/contactRoutes';
import createTagRouter from './routes/tagRoutes';
import errorHandler, { CustomError } from './middlewares/errorHandler';


dotenv.config();

const app = express();
const port = process.env.PORT || 3001; 

const pool = new Pool({
user: process.env.DB_USER,
host: process.env.DB_HOST,
database: process.env.DB_DATABASE,
password: process.env.DB_PASSWORD,
port: parseInt(process.env.DB_PORT || '5432'), 
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