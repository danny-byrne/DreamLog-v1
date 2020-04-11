const router = require('express').Router();
let Event = require('../models/event.model');

router.route('/').get((req, res) => {
  console.log('getting events')
  console.log('--------')
  Event.find()
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
  console.log('in the event/add route, req.body is', req.body)
  const { username, event, description, date, type } = req.body;

  const newEvent = new Event({
    username, 
    event, 
    description,
    date,
    type
  });

  newEvent.save()
  .then(() => res.json('Event added!'))
  .catch(err => res.status(400).json('Error: ' + err))
});

//update
router.route('/update').post((req, res) => {
  console.log('inside event update req.body is', req.body)
  console.log('inside event update req.body.id is', req.body.id)
  Event.findById(req.body.id)
    .then(event => {
      event.username = req.body.username;
      event.description = req.body.description;
      event.event = req.body.event;
      event.date = Date.parse(req.body.date);

      event.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ', err))
    })
    .catch(err => res.status(400).json('Error: ', err))
  // const newEvent
})

//delete
router.route('/delete').delete((req, res) => {
  console.log('inside delete events route req.body is', req.body)
  Event.findByIdAndDelete(req.body.id)
    .then(() => res.json("exercise deleted"))
    .catch(err => res.status(400).json('Error: ', err))
})

module.exports = router;