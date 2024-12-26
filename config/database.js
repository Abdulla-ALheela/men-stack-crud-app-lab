const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

//Log connection status 
mongoose.connection.on("connected", () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}.`);
})