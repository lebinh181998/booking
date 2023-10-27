const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  cheapestPrice: {
    type: Number,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: [
    {
      type: String,
      required: true,
    },
  ],
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
  featured: {
    type: Boolean,
    required: true,
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Hotel", hotelSchema);
