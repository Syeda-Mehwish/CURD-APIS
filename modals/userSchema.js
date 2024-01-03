const mongoose = require("mongoose");
const validator = require("validator");

// create users scehma

const usersSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw Error("not valid Email");
      }
    },
  },
  password: {
    type: String,
    required: [true, "Please add the user password"],
  },
  mobile: {
    type: String,
    required: true,
    //unique: true,
    minlength: 11,
    maxlength: 11,
  },
  gender: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "In-Active"],
    default: "Active",
  },
  datecreated: Date,
  dateUpdated: Date,
});

// model define
const users = new mongoose.model("users", usersSchema);
module.exports = users;
