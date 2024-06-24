import express, { Request, Response } from 'express';
import cors from 'cors';
import { logErrorMiddleware, returnError } from './errorHandler';
const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.VITE_REACT_APP_MOVIE_API_TOKEN;

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
        Authorization: `Bearer ${apiKey}`
      }
    };

    const response = await fetch(url, options);
    const json = await response.json();
    
    res.status(200).json(json);
  } catch (error) {
    next(error); 
  }
});

class OddError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OddError';
  }
}

function divideByTwo(amount: Number) {
  return new Promise((resolve, reject) => {
    if (typeof amount !== 'number') {
      reject(new TypeError('amount must be a number'));
      return;
    }
    if (amount <= 0) {
      reject(new RangeError('amount must be greater than zero'));
      return;
    }
    if (amount % 2) {
      reject(new OddError('amount'));
      return;
    }
    resolve(amount / 2);
  });
}

divideByTwo(7)
  .then(result => console.log('Result:', result))
  .catch(error => console.error('Error:', error.message));

app.use(logErrorMiddleware)
app.use(returnError)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
