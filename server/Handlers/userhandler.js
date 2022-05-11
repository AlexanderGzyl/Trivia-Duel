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

//adduser to database upon google sign in/check if user exists already
const addUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("finalproject");
    console.log("Connected");
    //check if user is in database already
    // const {_id } = req.body;
    // let userExists = false;
    // try {
    //   const result = await db.collection("users").findOne({ _id });
    //   if (result.length === 0||result === null) {
    //     res.status(404).json({ status: 404, error: "Flight doesn't exist" });
    // } else {
    //     userExists = true;
    // }
    // } catch (err) {
    //   console.log(err);
    // }
    const user = {
        ...req.body,
    };
  try {
    await db.collection("users").insertOne(user);
    res.status(201).json({ status: 201,message: "reservation added", data: user });
} catch (err) {
    return res
    .status(404)
    .json({ status: 404, data: user, message: err.message });
}
client.close();
console.log("disconnected!");
};


module.exports = {
    addUser
};