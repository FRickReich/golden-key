import path from 'path';

import { Request, Response } from 'express';

const controller = (req : Request, res : Response) =>
{
    res.sendFile(path.join(__dirname, './../../../build/client', 'index.html'));
};

export default controller;
