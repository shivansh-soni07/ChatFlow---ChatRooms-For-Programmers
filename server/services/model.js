import mongoose from "mongoose";

 // mongoose schema for documents
const dataSchemea = new mongoose.Schema({
  message: String,
  username: String,
  room: String,
  _createdTime_: String,
});

// model for collections
export const dataModel = mongoose.model("Messages", dataSchemea);

// start from get message