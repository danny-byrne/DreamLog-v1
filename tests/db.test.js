const mongoose = require('mongoose');
const EventModel = require ('../models/event.model');

const eventData = {  
  event: 'lizard cats',
  description: 'dream',
  date: new Date(),
  type: "the type was this"
}

describe('Event Model Test', () => {

  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true 
    }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1)
      }
    });
  });

  it('create & saves event successfully', async () => {
    const validEvent = new EventModel(eventData);
    const savedEvent = await validEvent.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedEvent._id).toBeDefined();
    expect(savedEvent.event).toBe(eventData.event);
    expect(savedEvent.description).toBe(eventData.description);
    // expect(savedEvent.date).toBe(eventData.date);
    expect(savedEvent.event).toBe(eventData.event);
  });

  it('does not insert fields not defined in schema, but still inserts event succesfully', async () => {
    const eventWithInvalid = new EventModel({...eventData, lastName: 'byrne'});
    const savedEventWithInvalid = await eventWithInvalid.save();
    expect(savedEventWithInvalid._id).toBeDefined();
    expect(savedEventWithInvalid.lastName).toBeUndefined();
  })

  it('create event without required field should fail', async () => {
    const eventWithoutReqField = new EventModel({ event: 'test event'})
    let err;
    try {
      const savedEventWithoutReqField = await eventWithoutReqField.save();
      error = savedEventWithoutReqField;
    } catch (error) {
      err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  })

  afterAll(() => {
    return mongoose.disconnect()
  })
})