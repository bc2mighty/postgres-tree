
import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import { router as categoryRoute } from "./routes/category";

const app: Express = express();
app.use(express.json())
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use('/categories', categoryRoute)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});