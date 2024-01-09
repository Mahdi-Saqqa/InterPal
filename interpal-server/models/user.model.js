const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const UserSchema = new mongoose.Schema({
    Fname: {
      type: String,
      required: [true, "Username is required"] 
    },
    Lname: {
        type: String,
        required: [true, "Username is required"] 
      },

      Email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      index: true,
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
      }
    },
    Password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"]
    },
    Bday: {
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
    languages: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Language",
        ref:'Language'
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
        type: String,
        default: ""
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date,



  }, {timestamps: true});




UserSchema.pre("save", function(next){
    bcrypt.hash(this.Password, 10)
        .then(hash=>{
            this.Password = hash
            next()
        })
        .catch(err=>{
            console.log("HASHING PASSWORD DIDNT WORK THO", err)
            next()
        })
})


module.exports = mongoose.model("User", UserSchema);
