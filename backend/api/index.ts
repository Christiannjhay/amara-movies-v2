import express, { Request, Response } from 'express';
import cors from 'cors';
import { logErrorMiddleware, returnError } from './errorHandler';
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/api/hello', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello from the backend!' });
});

app.get('/api/popular', async (req: Request, res: Response, next) => {
  try {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer your_access_token_here'
      }
    };

    const response = await fetch(url, options);
    const json = await response.json();
    
    res.status(200).json(json);
  } catch (error) {
    next(error); 
  }
});

app.use(logErrorMiddleware)
app.use(returnError)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
