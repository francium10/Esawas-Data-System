import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      rquired: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//Password matcher method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Pssword hashing before saving to the database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    //Generate the salt
    const salt = await bcrypt.genSalt(10);
    //Hash the password
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
const User = mongoose.model("User", userSchema);

export default User;
