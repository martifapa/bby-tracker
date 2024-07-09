import express from 'express';
require('dotenv').config();

import quickActionsRouter from './routes/quickActions';


const app = express();
const PORT = process.env.PORT;


app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.use(quickActionsRouter);

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});