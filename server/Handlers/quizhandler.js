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
const getQuiz = async (req,res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("finalproject");
    console.log("Connected");
    const _id   = req.params.id;
    console.log(req.params.id)
    console.log(typeof _id)
    try {
        //get the data from server
        const results = await db.collection("quizzes").findOne({ _id });
        console.log(results)
        //reformat(routes) as input
        
        //find will return an empty array if it doesn't find anything...
        if (results === 0) {
            res.status(404).json({ status: 404, error: "array is empty" });
        } else {
            //seatcontext needs seats, numOfRows and seatsPerRow passed
            res.status(200).json({status: 200, data: results});
        }
    } catch (err) {
        console.log(err);
    }
    client.close();
    console.log("disconnected!");
}
//get quizzes
const getQuizzes = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("finalproject");
    console.log("Connected");
    const _id   = req.params.id;
    console.log(_id)
    const query = { "userID": `${ _id }`};
    console.log(query)
    try {
        //get the data from server
        const results = await db.collection("quizzes").find(query).toArray();
        console.log(results)
        //reformat(routes) as input
        
        //find will return an empty array if it doesn't find anything...
        if (results === 0) {
            res.status(404).json({ status: 404, error: "array is empty" });
        } else {
            //seatcontext needs seats, numOfRows and seatsPerRow passed
            res.status(200).json({status: 200, data: results});
        }
    } catch (err) {
        console.log(err);
    }
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
    getQuiz,
    getQuizzes,
    addQuiz
};