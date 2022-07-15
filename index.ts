import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

// Configuration the .env file
dotenv.config();

// Create Express APP
const app: Express = express();
const port: string | number = process.env.PORT || 8000;

// Define first Route of APP
app.get('/', (req: Request, res: Response) => {
  res.send(
    'Welcome to API RESTful Express + TS + Nodemon + Jest + Swagger + Mongoose'
  );
});

app.get('/hello', (req: Request, res: Response) => {
  res.send('Welcome to GET Route: Hello World!');
});

// Execute APP and listen Requests on PORT
app.listen(port, () => {
  console.log(`EXPRESS SERVER: RUNNING at http://localhost:${port}`);
});
