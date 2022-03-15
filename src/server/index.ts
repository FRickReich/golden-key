import 'dotenv/config';
import express, { Application } from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from './utils/logger';

import routes from './routes';

const app : Application = express();
const port = Number(process.env.PORT);
const databaseUrl = String(process.env.DB_URL);

mongoose.connect(databaseUrl);
const db : mongoose.Connection = mongoose.connection;

app.use(bodyParser.urlencoded( { extended:true }) );
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, '../../build/client/'), { index: false }));
app.use('/api/users', routes.users);
app.use('/*', routes.frontend);

app.listen(port, () =>
{
    logger.info(`Server running at http://localhost:${ port }`);
});

export default app;
