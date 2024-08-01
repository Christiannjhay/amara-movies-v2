import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { logErrorMiddleware, returnError } from './errorHandler';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.VITE_REACT_APP_MOVIE_API_TOKEN;
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('API Key:', apiKey);

app.use(cors());
app.use(express.json());

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


app.post('/api/users', async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    // Sign up the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password
    });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    // Insert user details into the 'users' table
    const { error: dbError } = await supabase
      .from('users')
      .insert([
        { email: email, auth_id: authData.user?.id }
      ]);

    if (dbError) {
      console.error('Database error:', dbError.message);
      return res.status(400).json({ error: dbError.message });
    }

    res.status(201).json({ message: 'User signed up and added to the users table.' });
  } catch (error) {
    next(error);
  }
});



app.use(logErrorMiddleware)
app.use(returnError)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
