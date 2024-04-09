const moongose = require("mongoose");

const eventSchema = new moongose.Schema({
  clubName: {
    type: String,
  },
  eventName: {
    type: String,
  },
  category: {
    type: String,
  },
  seats: {
    type: String,
  },
  registrationFees: {
    type: String,
  },
  registrationLink: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  discription: {
    type: String,
  },
  widescreenPoster: {
    data: Buffer,
    contentType: String,
  },
  potraitPoster: {
    data: Buffer,
    contentType: String,
  },
});

const Event = moongose.model("Event", eventSchema);

module.exports = Event;
