const express = require('express');
const passport = require('passport');

const Profile = require('../../models/profile');

const router = express.Router();

router.post('/add', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const profileFields = {};
    if (req.body.type) {
        profileFields.type = req.body.type;
    }

    if (req.body.desc) {
        profileFields.desc = req.body.desc;
    }

    if (req.body.income) {
        profileFields.income = req.body.income;
    }

    if (req.body.expand) {
        profileFields.expand = req.body.expand;
    }

    if (req.body.cash) {
        profileFields.cash = req.body.cash;
    }

    if (req.body.remark) {
        profileFields.remark = req.body.remark;
    }

    new Profile(profileFields).save()
        .then(profile => {
            if (profile) {
                return res.json(profile);
            }
        }).catch(err => {
            console.log(err);
        });
});

module.exports = router;