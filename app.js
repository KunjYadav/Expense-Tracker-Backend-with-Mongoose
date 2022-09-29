const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const User = require('./models/user');

const cors = require('cors');
const userroutes = require('./routes/loginsignup');

app.use(cors());
app.use(express.json());
app.use('/user', userroutes);

mongoose
    .connect(
        'mongodb+srv://kunjyadav:7000584374@cluster2.bihrtsh.mongodb.net/personaldata?retryWrites=true&w=majority'
    )
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });