const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  classesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classes",
    required: true,
  },
  bookedAt: { 
    type: Date, 
    default: Date.now 
  },
  status: {
    type: String,
    enum: ["booked", "cancelled", "completed"],
    default: "booked",
  },
});

bookingSchema.index({ userId: 1, classesId: 1 }, { unique: true });

const bookingModel = mongoose.model("booking", bookingSchema);

module.exports = bookingModel;