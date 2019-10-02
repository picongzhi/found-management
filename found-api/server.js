const express = require('express');
const mongoose = require('mongoose');

const uri = require('./config/keys').mongoURI;
const user = require('./routes/api/user');

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

app.use('/api/user', user);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});