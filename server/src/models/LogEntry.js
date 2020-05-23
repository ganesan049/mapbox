var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const requireString = {
  type: String,
  required: true,
};
const requireNumber = {
  type: Number,
  required: true,
};
const defautlRequiredDate = {
  type: Date,
  default: Date.now,
  required: true,
};
var logEntrySchema = new Schema(
  {
    title: requireString, // String is shorthand for {type: String}
    description: String,
    comments: String,
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    latitude: { ...requireNumber, min: -90, max: 90 },
    longitude: { ...requireNumber, min: -180, max: 180 },
    image: String,
    visitDate: {
      required: true,
      type: Date,
    },
  },
  //for crated_at updated_at
  {
    timestamps: true,
  }
);

const LogEnty = mongoose.model("LogEntry", logEntrySchema);

module.exports = LogEnty;
