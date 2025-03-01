import express, {Application, Request, Response} from "express";
import * as AnimalsController from './controllers/AnimalsController.ts';

const app: Application = express()

app.use(express.json())



export default app;