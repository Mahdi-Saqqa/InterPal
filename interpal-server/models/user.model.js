const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")


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
        type: mongoose.Schema.Types.ObjectId, ref: "Country"
    },


  }, {timestamps: true});


UserSchema.virtual("Cpassword")
  .get(function(){
      return this._Cpassword;
  })
  .set(function(value){
      this._Cpassword = value
  })

UserSchema.pre("validate", function(next){
    if(this.Password !== this.Cpassword){
        this.invalidate("Cpassword", "Passwords must match")
    }
    //save the user to db or show validation errors
    next();
})


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

