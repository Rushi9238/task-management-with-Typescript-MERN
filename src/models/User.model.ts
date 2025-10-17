import mongoose, { Schema, Document, Model } from "mongoose";

//User Schema interface
export interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  status:"active" | "inactive" | "suspend"
  createdAt: Date;
}

const UserSchema: Schema<UserInterface> = new Schema({
  name: { type: String, required:true, default: "" },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
  },
  role:{
    type:String,
    enum:["user","admin"],
    default:"user"
  },
  status:{
    type:String,
    enum:["active","inactive","suspend"],
    default:"active"
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});

const User:Model<UserInterface>=mongoose.models.User || mongoose.model<UserInterface>("User",UserSchema);

export default User;