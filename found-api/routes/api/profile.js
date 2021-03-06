const express = require('express');
const passport = require('passport');

const Profile = require('../../models/profile');

const router = express.Router();

router.post('/add', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const newProfile = {};
    if (req.body.type) {
        newProfile.type = req.body.type;
    }

    if (req.body.desc) {
        newProfile.desc = req.body.desc;
    }

    if (req.body.income) {
        newProfile.income = req.body.income;
    }

    if (req.body.expense) {
        newProfile.expense = req.body.expense;
    }

    if (req.body.cash) {
        newProfile.cash = req.body.cash;
    }

    if (req.body.remark) {
        newProfile.remark = req.body.remark;
    }

    new Profile(newProfile).save().then(profile => {
        if (profile) {
            return res.json(profile);
        }
    }).catch(err => {
        console.log(err);
        return res.status(400).json(err.message)
    });
});

router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.find().then(profiles => {
        if (!profiles) {
            return res.status(404).json('没有记录');
        }

        return res.json(profiles);
    }).catch(err => {
        return res.status(500).json(err);
    });
});

router.get('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
        _id: req.params.id
    }).then(profile => {
        if (!profile) {
            return res.status(404).json('没有记录');
        }

        return res.json(profile);
    }).catch(err => {
        return res.status(500).json(err);
    });
});

router.post('/edit/:id', passport.authenticate('jwt', {
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

    if (req.body.expense) {
        profileFields.expense = req.body.expense;
    }

    if (req.body.cash) {
        profileFields.cash = req.body.cash;
    }

    if (req.body.remark) {
        profileFields.remark = req.body.remark;
    }

    Profile.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: profileFields
    }, {
        new: true
    }).then(profile => {
        if (!profile) {
            return res.json('编辑失败');
        }

        return res.json(profile);
    }).catch(err => {
        return res.status(500).json(err);
    });
});

router.delete('/delete/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOneAndRemove({
        _id: req.params.id
    }).then(profile => {
        profile.save().then(profile => {
            return res.json(profile);
        });
    }).catch(err => {
        return res.status(500).json(err);
    });
});

module.exports = router;