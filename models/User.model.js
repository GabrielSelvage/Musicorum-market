const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: 'https://res.cloudinary.com/dl0iv6p9x/image/upload/v1625561096/no_image_available_fah5ho.jpg'
  },
  description: {
    type: String,
    default: "No description added"
  },
  role: String,
  myLessons: {
    type: Array,
    default: []
  },
  myFavourites: {
    type: Array,
    default: []
  }
}, { timestamps: true });

const User = model("User", userSchema);

module.exports = User;
