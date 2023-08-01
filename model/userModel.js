const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    required:true

  },
  role: {
    type: String,
    required: true,
  },

  isDeleted: {
    type: String,
    required: true,
    default:false,
  },

  imageUrl: {
    type: String,
    required: true,
  },
});

// explation for the below code
// {
  // this is a method added to the userSchema statics is a mongoose schema used to filter user by userId and
  // validate their password,
  // findByCredentials is a static method on userSchema static methods are4 methods that are directly attached to the model and can be called on the model itself like
  //  userModel.findByCredentials()

// }


userSchema.statics.findByCredentials=async function(email,password){
  const user= await User.findOne({email}); // find user by email in the database using user model
  if(!user)  throw new Error('invalid email')
  const isSamepassword = bcrypt.compareSync(password,user.password);//password is provided password and
  if(isSamepassword) return user;
  throw new Error('invalid password');
}

// explation for the below code
// {
  // it define the method toJSON on userSchema This method is used to modify the JSON representation of a user object before it is sent as a response or converted
  //  to JSON.


// }


userSchema.methods.toJSON = function(){// defining a new instance method (toJSON) on the userSchema.methods. Instance methods are methods that are available on
  // individual instances of the model (i.e., documents) and can be called on a specific user object.

   const user = this; //Inside the toJSON method, this refers to the current user object. It captures the reference to the user object being operated upon.

  const userObject = user.toObject();//toObject() function is called on the user to convert it into a plain JavaScript object. This step is necessary because
  // Mongoose objects have additional internal properties and methods that are not needed when sending the user data as a JSON response.

  delete userObject.password; //The password property is deleted from the userObject  for security reasons.

  return userObject;// The modified userObject, which now lacks the password property, is returned.
}



// -------before saving => hash the password-------------
// it is a middlewear function that is executed before saving a user object to the database
userSchema.pre('save', function(next){ // This code adds a pre-save middleware to the
  // userSchema. function will be executed before saving a user document to the database whenever the .save() method is called on a user instance.

  const user = this;// explain above

  if(!user.isModified('password')) return next();//This line checks if the user's password has been modified or if it's a new user being created.
  //  The isModified('password') method of the user object checks if the 'password' field has been changed since the last save operation. If the
  //  password is not modified (for example, when updating other fields but not the password), the function exits early by calling next() to continue
  //  with the next middleware or the save operation.

  bcrypt.genSalt(10, function (err,salt){//: If the password is modified or it's a new user being created, this line generates a salt using bcrypt. A salt is a random value used to hash the password securely
      if(err) return next(err);
      bcrypt.hash(user.password,salt, function(err, hash){//After generating the salt, this line hashes the user's password using the generated salt. The hash function of bcrypt takes the password and the salt as arguments and returns a hashed password.
          if(err) return next(err);
          user.password=hash; //Once the password is successfully hashed, the hashed password is set as the value of the 'password' field of the user object. This ensures that the password stored in the database is the hashed version, not the plain text password.
          next();//function is called to continue with the save operation.
      })
  })
})

// ---------------------------------------------------------------
// Mongoose middleware function that is executed before removing a user document from the database. This middleware is designed to remove all orders associated with the user being removed

userSchema.pre('remove', function(next){// This code adds a pre-remove middleware to the userSchema. The middleware function will be executed before removing a user document from the database whenever the .remove() method is called on a user instance.

  this.model('order').remove({owner:this._id},next);//The middleware uses the Mongoose model method to get the model for the "order" collection. It then calls the remove method on the "order" model to delete all orders where the owner field matches the _id of the user being removed.
})


const User = mongoose.model('user', userSchema);

module.exports = User;




