import express, { Request, Response } from "express";
import todoRouter from "./routers/todo";
import cors from "cors";

const app = express();

app.use(express.json());

// Add CORS middleware
app.use(cors());

// Parse incomming JSON
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Rest API uing node",
  });
});

app.use(todoRouter);

export default app;
