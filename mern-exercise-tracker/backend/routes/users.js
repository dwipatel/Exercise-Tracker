const router = require('express').Router();
let User = require('../models/user.model');
const { model } = require('mongoose');

//endpoint that handles /users/
router.route('/').get((req, res) => {
    //.find() method gets list of all users in the modgodb atlas database. It returs a promis which is returned in json format
    User.find()
        //return users in json format, if error return error message
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})
//handles incomming http post requests
router.route('/add').post((req, res) => {
    const username = req.body.username;
    //create new user
    const newUser = new User({username});
    //new user is saved to data base using save method
    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;