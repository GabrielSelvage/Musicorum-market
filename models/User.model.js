const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  // email: {
  //   type: String,
  //   required: true
  // },
  password: {
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
  // name: {
  //   type: String,
  //   required: true
  // },
  role: String,
  myClasses: {
    type: Array,
    default: []
  },
  myFavourites: {
    type: Array,
    default: []
  }
});

const User = model("User", userSchema);

module.exports = User;
