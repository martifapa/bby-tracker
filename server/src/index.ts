import express from 'express';
require('dotenv').config();

import quickActionsRouter from './routes/actions';
import logsRouter from './routes/logs';


const app = express();
const PORT = process.env.PORT;


app.use(express.json());


app.use(quickActionsRouter);
app.use(logsRouter);


app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});