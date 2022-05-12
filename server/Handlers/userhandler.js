"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

//upon google sign in check if user is in database if not add them
//////////////////////////////////////////////////////////////////////
const addUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("finalproject");
    console.log("Connected");
    //check if user is in database already by finding the id
    const {_id } = req.body;
    //payload if user doesn't exist
    const user = {
        ...req.body,
    };

    try {
      const result = await db.collection("users").findOne({ _id });
      console.log(result)
      if (result.length === 0||result === null) {
        await db.collection("users").insertOne(user);
        res.status(201).json({ status: 201,message: "user added", data: user });
        console.log("added")
    } else {
        console.log("user exists")
        res.status(200).json({ status: 200,message: "user exists already", data: user });
    }
    } catch (err) {
        console.log("error")
        // return res
        // .status(404)
        // .json({ status: 404, data: user, message: err.message });
    }
client.close();
console.log("disconnected!");
};
//get all users except for current user
//////////////////////////////////////////////////////////////////////
const getArenaUsers = async (req, res) => {
    const client =  new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("finalproject");
    console.log("Connected");
    const username   = req.params._id;
    console.log(username)
    let query ={};
    query = {
        "_id": {
          "$ne": `${username}`
        }
      } ;
    try {
      //get user IDs excluding the current user
      const userList = await db.collection("users").find(query,{projection:{email:1}}).toArray();
      console.log(userList)

      //find will return an empty array if it doesn't find anything...
      if (userList.length === 0) {
          res.status(404).json({ status: 404, error: "No users" });
      } else {
          res.status(200).json({status: 200, data:userList});
      }
  } catch (err) {
      console.log(err);
  }
  client.close();
  console.log("disconnected!");
  };

//on submitting a challenge in the arena
//add to challenges array for challengers and
//add to the quiz array for the user
//////////////////////////////////////////////////////////////////////

module.exports = {
    addUser,
    getArenaUsers
};