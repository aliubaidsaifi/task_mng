const mongoose=require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/task")
.then(()=>{console.log("connect to db");})
.catch((err)=>{console.log(err);})