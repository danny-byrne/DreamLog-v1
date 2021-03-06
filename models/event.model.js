const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
  // username: { type: String, required: true},
  event:{ type: String, required: true },
  description: {type: String, required: true },
  date: { type: String, required: true },
  type: { type: String, required: true}
}, {
  timestamps: true,
})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;