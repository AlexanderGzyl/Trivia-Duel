"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


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
      
      if (result === null) {
        await db.collection("users").insertOne(user);
        res.status(201).json({ status: 201,message: "user added", data: user });
        
    } else {
        
        res.status(200).json({ status: 200,message: "user exists already", data: user });
    }
    } catch (err) {
        console.log(err)
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
    
    let query ={};
    query = {
        "_id": {
          "$ne": `${username}`
        }
      } ;
    try {
      //get user IDs excluding the current user
      const userList = await db.collection("users").find(query,{projection:{email:1}}).toArray();
      

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
//add to challenges array for challengers
//////////////////////////////////////////////////////////////////////
const addChallenge = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("finalproject");
    console.log("Connected");

    const {challengers,_id,quizID,user,completed } = req.body;
    let payload = {
        _id : _id,
        ...req.body,
}
    let query = {_id: {$in: challengers}}
    let updateDocument ={
        $push: { "challenges": payload }
      }

    try {
      const result = await db.collection("users").updateMany(query,updateDocument);
      
        res.status(200).json({ status: 201,message: "user added", data: result });
      
    } catch (err) {
        console.log(err)
        // return res
        // .status(404)
        // .json({ status: 404, data: user, message: err.message });
    }
client.close();
console.log("disconnected!");
};
//get user
//////////////////////////////////////////////////////////////////////
const getUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("finalproject");
    console.log("Connected");
    const _id   = req.params._id;
    try {
      const result = await db.collection("users").findOne({ _id });
      // console.log(result['seats'])
      if (result === null||result.length === 0||result === undefined){
        res.status(404).json({ status: 404, error: "user doesn't exist" });
      }else
        {res.status(200).json({status: 200,_id, data: result});}
        
    } catch (err) {
      console.log(err);
    }
    client.close();
    console.log("disconnected!");
};

const updateChallenge = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("finalproject");
  console.log("Connected");
  
  const {challengerId,userId,challengeId,outcome} = req.body;


  try {
    if (outcome==='win') {
      //update challenge userID,challengeId
      let query = {
        "_id": userId
      }
      let updateDocument = {
        $pull: {
          challenges: {
            "_id": challengeId
          }
        }
      }
      const result = await db.collection("users").updateOne(query,updateDocument);
      //add win userID
      let query2 = {_id:userId}
      let updateDocument2 ={
        $inc: { "wins": 1 }
      }
      const result2 = await db.collection("users").updateOne(query2,updateDocument2);
      //add loss challengerID
      let query3 = {_id:challengerId}
      let updateDocument3 ={
        $inc: { "losses": 1 }
      }
      const result3 = await db.collection("users").updateOne(query3,updateDocument3);
      res.status(200).json({ status: 201,message: "user added", data: result2 });
    } else {
      //update challenge userID,challengeId
      let query = {
        "_id": userId
      }
      let updateDocument = {
        $pull: {
          challenges: {
            "_id": challengeId
          }
        }
      }
      const result = await db.collection("users").updateOne(query,updateDocument);
      
      //add win challengerID
      let query2 = {_id:challengerId}
      let updateDocument2 ={
        $inc: { "wins": 1 }
      }
      const result2 = await db.collection("users").updateOne(query2,updateDocument2);
      //add loss userID
      let query3 = {_id:userId}
      let updateDocument3 ={
        $inc: { "losses": 1 }
      }
      const result3 = await db.collection("users").updateOne(query3,updateDocument3);
      res.status(200).json({ status: 201,message: "user added", data: result2 });
    }
  } catch (err) {
      console.log(err)
  
  }
client.close();
console.log("disconnected!");
};
module.exports = {
    addUser,
    getArenaUsers,
    addChallenge,
    getUser,
    updateChallenge
};