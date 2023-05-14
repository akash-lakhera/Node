const express = require("express");
const axios=require("axios")
require("dotenv").config(); //configure environment variables
const { con, col } = require("./db");
const PORT = process.env.PORT || 3000;
//initialize the app
const app = express();


app.get("/items",async(req,res,next)=>{
  try {
    const items = await col.find({}).toArray();

    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    error.name?BSONError:res.status(404).send("Items do not exist")
    
  }
})
let a=1;
let arr=[]
app.use(express.json());
let p=con
  .connect()
  .then(() => axios.get("https://api.wazirx.com/api/v2/tickers"))
  .then((resp) => {data=resp.data
    for (const i in data){
    arr.push({name:data[i].name,last:data[i].last,buy:data[i].buy,sell:data[i].sell,volume:data[i].volume,base_unit:data[i].base_unit})
    a++
    if(a>10)
    break
  } }).then(()=>{
    return col.insertMany(arr)

  })
  
  
  p.then(() => {
    app.listen(PORT, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log("Following error occurred in database connection : " + err);
  });

module.exports = { app };
