const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routes/router');

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URL,{
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(3333, () => {
    console.log("Server is running in 3333");
});