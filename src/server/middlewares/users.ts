import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authorize = (req : Request, res: Response, next: NextFunction) =>
{
    const secret = String(process.env.SECRET_TOKEN);

    const token = req.cookies.access_token;

    if(!token)
    {
        return res.sendStatus(403);
    }
    try
    {
        const data = jwt.verify(token, secret);
        res.locals.user = data;
        
        next();
    }
    catch
    {
        return res.sendStatus(403);
    }
};

export default { authorize };
