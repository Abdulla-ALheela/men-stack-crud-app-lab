 //----------------------------------Packages Importing------------------------------------------//
 
 require("dotenv").config();  // require package and Loads the environment variables from .env file
require("./config/database");

const express = require('express');
const morgan = require('morgan');
const Food = require("./models/food");

//Create an Express app
const app = express();

//-------------------------------------Middlewares------------------------------------------------//

app.use(morgan('dev'));// Use Morgan middleware with the 'dev' option for concise output

//----------------------------------------Routes--------------------------------------------------//

app.get("/", async (req, res) => {
    res.render("index.ejs");
  });
  
app.get("/foods/new", (req,res) => {
  res.render("./foods/new.ejs")
});
//----------------------------------Port 3000 Listener-------------------------------------------//

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
