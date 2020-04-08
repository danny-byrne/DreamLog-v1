const router = require('express').Router();
let Event = require('../models/event.model');

router.route('/').get((req, res) => {
  Event.find()
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
  console.log('in the event/add route, req.body is', req.body)
  const { event, description, date, type } = req.body;

  const newEvent = new Event({event, 
    description,
    date,
    type
  });

  newEvent.save()
  .then(() => res.json('Event added!'))
  .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;