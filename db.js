const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;
const con = new MongoClient(uri);
const col = con.db("database").collection("items");
module.exports = { con, col }; //return collection and client
