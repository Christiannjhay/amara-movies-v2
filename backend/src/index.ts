import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/hello', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello from the backend!' });
});

export default app;