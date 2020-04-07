const router = require('express').Router();
let Event = require('../models/event.model');

router.route('/').get((req, res) => {
  Event.find()
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
  const eventname = req.body.eventname

  const newEvent = new Event({eventname});

  newEvent.save()
  .then(() => res.json('User added!'))
  .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;