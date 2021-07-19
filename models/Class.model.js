const { Schema, model } = require("mongoose");

const classSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String
  },
  price: {
    type: Number,
  },
   video: {
     type: String,
   },
  imageUrl: {
    type: String,
  },
  course: {
    type: Array,
  },
  level: {
    type: String,
  },
  tags:{
    type: Array,
  },
  teacher: {
    type: String,
  }
});

const Class = model("Class", classSchema);

module.exports = Class;
