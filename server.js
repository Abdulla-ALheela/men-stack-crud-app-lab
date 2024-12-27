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
app.use(express.urlencoded({ extended: false }));

//----------------------------------------Routes--------------------------------------------------//

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get("/foods", async (req,res) => {
  const allFoods = await Food.find();
  res.render("foods/index.ejs", {foods: allFoods})
})

app.post("/foods", async (req, res) => {
  const allFoods = await Food.find();
  if(req.body.image === "" || req.body.name === "" || req.body.description === "" ){
    res.render("./foods/new.ejs",{
      require: true,
    });
  }else{
  await Food.create(req.body);
  res.redirect("./foods");
};
});

app.get("/foods/new", (req, res) => {
  res.render("./foods/new.ejs",{
    require: false,
  })
});

app.get("/foods/:foodId", async (req,res) => {
 const foundFood = await Food.findById(req.params.foodId)
 res.render("foods/show.ejs", {food: foundFood})
});

//----------------------------------Port 3000 Listener-------------------------------------------//

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
