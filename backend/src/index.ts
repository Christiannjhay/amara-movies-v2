import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => res.send("Express on Vercel"));
app.listen(3000, () => console.log("Server ready on port 3000."));

export default app;