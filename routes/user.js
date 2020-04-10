const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  console.log('inside the /users route')
  User.find()
    .then(users => res.json(users))
    .catch(err => res.statusCode(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
  console.log('inside the /users/add post route, req.body is', req.body)
  const { username, password } = req.body;
  

  const newUser = new User({username, password});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err))
});



module.exports = router;