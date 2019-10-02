const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const uri = require('./config/keys').mongoURI;
const user = require('./routes/api/user');

mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('MongoDB connected!');
    })
    .catch(err => {
        console.log(err);
    });

const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use('/api/user', user);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});