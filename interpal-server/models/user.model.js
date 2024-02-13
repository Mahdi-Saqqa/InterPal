const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, "First Name is required"] ,
      validate: {
        validator: val => /^[a-zA-Z]+$/.test(val),
        message: "First Name must contain only letters"
      }

    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"],
        validate: {
          validator: val => /^[a-zA-Z]+$/.test(val),
          message: "Last Name must contain only letters"
        }
      },

      email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      index: true,
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
      }
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"],
      validate: {
        validator: val => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(val),
        message: "Password must contain at least 1 number, uppercase & lowercase letter"
      }
    },
    birthDay: {
        type: Date,
        required: [true, "Birthday is required"],
        validate: {
            validator: val => val-Date.now() < 18,
            message: "Age must be over 18"
        }
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    country: {
        type: mongoose.Schema.Types.ObjectId, ref: "Country",
        required: [true, "Country is required"],
        ref:'Country'
    },
    nativeLanguage: {
        type: mongoose.Schema.Types.ObjectId, ref: "Language",
        ref:'Language'
    },
    languages: [{
      language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
      },
      level: {
        type: Number,  // You can use 'String', 'Number', or any other type suitable for proficiency levels
      },

    }],
    activationToken: Number,

    activated: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    },
    bio: {
        type: String,
        default: ""
    },
    profilePic: {
        type:Object,
        default: {}
        
    },
    chats: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Chat",
        ref:'Chat'
    }],
    sentRequests: [{
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        ref:'User'
    }],
    receivedRequests: [{
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        ref:'User'
    }],

    resetPasswordToken: String,
    resetPasswordExpires: Date,



  }, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);

