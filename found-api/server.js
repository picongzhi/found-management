const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const uri = require('./config/keys').mongoURI;

const user = require('./routes/api/user');
const profile = require('./routes/api/profile');

// mongodb
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected!');
}).catch(err => {
    console.log(err);
});

// express
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// passport init
app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/user', user);
app.use('/api/profile', profile);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});