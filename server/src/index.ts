import express from 'express';
require('dotenv').config();

import quickActionsRouter from './routes/actions';


const app = express();
const PORT = process.env.PORT;


app.use(express.json());


app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.use(quickActionsRouter);

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});