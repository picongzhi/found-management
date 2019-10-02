const express = require('express');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

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
                const avatar = gravatar.url(req.body.email, {
                    protocol: 'http',
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });

                console.log(avatar);

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                });

                console.log(newUser);

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