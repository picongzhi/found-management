const express = require('express');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/user');
const secret = require('../../config/keys').secretOrKey;

const router = express.Router();

router.post('/register', (req, res) => {
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json('邮箱已被注册');
        } else {
            const avatar = gravatar.url(req.body.email, {
                protocol: 'http',
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar: avatar,
                password: req.body.password,
                identity: req.body.identity
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }

                    newUser.password = hash;
                    newUser.save().then(user => {
                        return res.json(user)
                    }).catch(err => {
                        return res.json(err)
                    });
                });
            });
        }
    }).catch(err => {
        return res.json(err)
    });
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
        email: email
    }).then(user => {
        if (!user) {
            return res.status(404).json('用户不存在');
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar,
                    identity: user.identity
                };

                jwt.sign(payload, secret, {
                    expiresIn: 60000
                }, (err, token) => {
                    if (err) {
                        throw err;
                    }

                    return res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                });
            } else {
                return res.status(400).json('密码错误');
            }
        });
    });
});

router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    });
});

module.exports = router;