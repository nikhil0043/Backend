import express from 'express';
import env from 'dotenv';
import mongoose from 'mongoose';

const app = express();
const Port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(Port, () => {
  console.log('Example app listening on port 3000!');
});
