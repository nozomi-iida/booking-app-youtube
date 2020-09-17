const Event = require('../../models/event');
const { transformEvent } = require('./merge');
const { dateToString } = require('../../helpers/data');

const User = require('../../models/user');

module.exports = {
  events: async () => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const events = await Event.find();
      return events.map(event => {
        return transformEvent(event);
      });
    } catch {
      throw err;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: dateToString(args.eventInput.date),
      creator: req.userId,
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      const creator = await User.findById(req.userId );
      if (!creator) {
        throw new Error('User is not found.');
      }
      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (err) {
      throw err;
    }
  },
};
