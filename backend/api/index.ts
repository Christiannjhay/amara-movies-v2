import express, { Request, Response } from 'express';
import cors from 'cors';
import { logErrorMiddleware, returnError } from './errorHandler';
import fetch from 'node-fetch';



const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/working', (req: Request, res: Response, next) => {
  try {
    res.send('Hello, World!');
  } catch (error) {
    next(error)
  }
});

app.get('/popular', (req: Request, res: Response, next) => {
  try {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmM0NDRkNDQ5ZmRkOGQ4NGUzMDMzNGZhN2U1OTFmOCIsInN1YiI6IjY1ZjY1ZmI1ZTIxMDIzMDE3ZWVlMDJkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z1fa1jT_-JUEe0N6UNX-wdvspwCNH0j4hUpE4eg6-VI'
      }
    };
    fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json))
  } catch (error) {
    next(error)
  }
})

app.use(logErrorMiddleware)
app.use(returnError)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
