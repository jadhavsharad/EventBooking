const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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
    qrCode: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
