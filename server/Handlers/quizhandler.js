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

//get quiz
const getQuizzes = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("finalproject");
    console.log("Connected");
    const _id   = req.params._id;
    await db.collection("quizzes").findOne({ _id }, (err, result) => {
        result
          ? res.status(200).json({
              status: 200,
              data: result,
              message: `Successfully retrieved reservation #${_id}`,
            })
          : res
              .status(404)
              .json({ status: 404, data: _id, message: "Reservation not Found" });
      });
    client.close();
    console.log("disconnected!");
  };

//post quiz
const addQuiz = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("finalproject");
    console.log("Connected");
    try {
        const quiz = {
            ...req.body,
        };
        await db.collection("quizzes").insertOne(quiz);
        res.status(201).json({ status: 201,message: "reservation added", data: quiz });
    } catch (err) {
        return res
        .status(404)
        .json({ status: 404, data: quiz, message: err.message });
    }
    client.close();
    console.log("disconnected!");
};




module.exports = {
    getQuizzes,
    addQuiz
};