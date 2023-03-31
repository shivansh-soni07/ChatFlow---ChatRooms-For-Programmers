// import { dataModel } from "./model.js";

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

export const mongoSaveMessage = async (message, username, room ,_createdTime_) => {
  const db_URL = process.env.MONGODB_URL;
  if (!db_URL) return null;

   console.log(db_URL);

  await dataModel.create({
    message: message,
    username: username,
    room: room,
    _createdTime_: _createdTime_
  })


};

export const mongoGetMessage = async (room) => {
  const db_URL = process.env.MONGODB_URL;
  if (!db_URL) return null;
  
  let last_100 = [];
  //  console.log(db_URL);

  last_100 = await dataModel.find({room:room}).sort({_id:-1}).then(function(last_100) {
    console.log(last_100); // Use this to debug
     
  })

     
    console.log('MEssage get ')

    return last_100;
};
