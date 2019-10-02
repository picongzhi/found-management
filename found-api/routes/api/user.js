const express = require('express');
const bcrypt = require('bcrypt')

const User = require('../../models/user');

const router = express.Router();

router.get('/test', (req, res) => {
    res.json({
        msg: 'login works'
    });
});

router.post('/register', (req, res) => {
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    email: '邮箱已被注册'
                });
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            throw err;
                        }

                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                return res.json(user)
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    });
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;