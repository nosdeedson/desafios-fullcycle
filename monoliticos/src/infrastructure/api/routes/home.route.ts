import express, {Response, Request} from "express";

export const homeRoute = express.Router();

homeRoute.get('/',async (req: Request, res: Response) => {
    res.status(200).send("hello world")
})