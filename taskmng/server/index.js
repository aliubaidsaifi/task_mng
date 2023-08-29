const express=require("express");
require('./db/config');
const LoginSchema=require("./db/Product");
const taskModel=require("./db/task");
const app=express();
const cors=require("cors");
app.use(cors());
app.use(express.json());
const {ObjectId } = require('mongodb');

app.post('/login',  async(req, res) => {
 const data= new LoginSchema(req.body)
 const result=await data.save();
 res.send(result);
});
// //read
app.get('/getAll/task',async(req,res)=>{
    const data = await taskModel.find({});
    res.json({success:true,data:data})
    console.log(data);
})

// //create//save data to mongodb
app.post('/create/task',async(req,res)=>{ 
    console.log(req.body);
    const data = new taskModel(req.body);
    await data.save();
    res.json({success:true,msg:"data save successfully"});
})
// //update
app.put('/task/update/:id',async(req,res)=>{ 
    const {_id, ...rest } = req.body;
    const data =await taskModel.updateOne({_id:new ObjectId(_id)},rest)
    res.json({success:true,msg:"data update  successfully",data:data});
})
// //delete
app.delete('/task/delete/:id',async(req,res)=>{
    const id = req.params.id;
    const data = await taskModel.deleteOne({_id:id});
    res.send({success:true,msg:"data delete successfully",data:data})
})
app.listen(5000, ()=>{
    console.log("my port is running is 5000");
})