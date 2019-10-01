const express = require('express');
const mongoose = require('mongoose');

const uri = require('./config/keys').mongoURI;
mongoose.connect(uri, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('MongoDB connected!');
    })
    .catch(err => {
        console.log(err);
    });

const app = express();
app.get('/', (req, res) => {
    res.send('Hello world!');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});