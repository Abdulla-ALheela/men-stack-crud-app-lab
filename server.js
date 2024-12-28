//----------------------------------Packages Importing------------------------------------------//

require("dotenv").config();  // require package and Loads the environment variables from .env file
require("./config/database");

const express = require('express');
const morgan = require('morgan');
const Food = require("./models/food");
const methodOverride = require("method-override");

//Create an Express app
const app = express();

//-------------------------------------Middlewares------------------------------------------------//

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan('dev'));// Use Morgan middleware with the 'dev' option for concise output

//----------------------------------------Routes--------------------------------------------------//

//Route to display the main page
app.get("/", async (req, res) => {
  res.render("index.ejs");
});


//Route to displays foods list
app.get("/foods", async (req, res) => {
  const allFoods = await Food.find();
  res.render("foods/index.ejs", { foods: allFoods });
});


//Route to processes the form data for creating new food
app.post("/foods", async (req, res) => {
  const allFoods = await Food.find();
  if (req.body.image === "" || req.body.name === "" || req.body.description === "") {
    res.render("./foods/new.ejs", {
      require: true,
    });
  } else {
    await Food.create(req.body);
    res.redirect("./foods");
  };
});


//Route to display a form for creating new form
app.get("/foods/new", (req, res) => {
  res.render("./foods/new.ejs", {
    require: false,
  });
});


//Route to display the food information when visiting a specific food by it is id
app.get("/foods/:foodId", async (req, res) => {
  const foundFood = await Food.findById(req.params.foodId);
  res.render("foods/show.ejs", { food: foundFood });
});


//Route to delet a food 
app.delete("/foods/:foodId", async (req, res) => {
  await Food.findByIdAndDelete(req.params.foodId);
  res.redirect("/foods");
});


//Route to proccess the form information and update food 
app.put("/foods/:foodId", async (req, res) => {
  
    await Food.findByIdAndUpdate(req.params.foodId, req.body);

    res.redirect(`/foods/${req.params.foodId}`);
});


//Route to display a form to edit a food 
app.get("/foods/:foodId/edit", async (req, res) => {
  const foundFood = await Food.findById(req.params.foodId);

  res.render("./foods/edit.ejs", {
    food: foundFood,
    require: false,
  });
});


//----------------------------------Port 3000 Listener-------------------------------------------//

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
