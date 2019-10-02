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
                                return res.json(err)
                            });
                    });
                });
            }
        })
        .catch(err => {
            return res.json(err)
        });
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
            email: email
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    email: '用户不存在'
                });
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        return res.json({
                            msg: 'success'
                        });
                    } else {
                        return res.status(400).json({
                            password: '密码错误'
                        });
                    }
                });
        });
});

module.exports = router;