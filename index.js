const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

app.use(express.json());

const dwVideoRouter = require('./routes/dwVideo');
app.use('/api/v1', dwVideoRouter);

const PORT = 5000;

const startLog = [
    { Event: 'Server Port', info: `${PORT}` },
    { Event: 'Server Address', info: `http://localhost:${PORT}/` }
];

app.listen(PORT, () => {
    console.table(startLog);
});