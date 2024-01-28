const express = require("express");
const cors = require("cors");
require('./db/config');
const app = express();
const User = require('./db/userModel');
const Product = require('./db/product');
app.use(express.json());
app.use(cors({
    origin:["https://inventory-management-eosin-six.vercel.app/"],
    methods:["POST","PUT","GET","UPDATE","DELETE"],
    credentials: true
}));

app.post("/signup",async (req, resp)=>{
    const user = new User(req.body);
    let resu = await user.save();
    resu = resu.toObject();
    delete resu.password; 
    resp.send(resu);
})

app.post("/login", async (req, resp) => {
    if(req.body.email){
        let user = await User.findOne(req.body).select("-password");
        if(user) resp.send(user);
        else resp.send(req.body.email, req.body.password);
    }
    else{
        resp.send(req.body.email, req.body.password);
    }
})

app.post("/addproduct", async (req, resp) => {
    const productNew = new Product(req.body);
    let resu = await productNew.save();
    resu = resu.toObject();
    resp.send(resu); 
})

app.get("/products", async( req, resp) => {
    let products = await Product.find({});
    if(products.length > 0){
        resp.send(products);
    }
    else {
        resp.send({result: "no products"});
    }
})

app.delete("/products/:id", async (req, resp) => {
    resp.send(req.params.id);
    const result = await Product.deleteOne({_id:req.params.id});
    resp.send(result);
    console.log(result);
})

app.get("/update/:id", async (req, resp) =>{
    // resp.send(req.params.id);
    let result = await Product.findOne({_id:req.params.id});
    if(result) resp.send(result);
    else resp.send({result:"No record"});
    // console.log(result);
})

app.put("/update/:id", async (req, resp) => {
    let result = await Product.updateOne(
        {id:req.params._id},
        {
            $set: req.body
        }
    )
    resp.send(result);
})

app.get("/search/:key", async(req, resp) => {
    let result = await Product.find({
        "$or":[
            { name:     { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    })
    resp.send(result);
} )

app.get("/profile/:key", async(req, resp) => {
    let result = await User.findOne({
        "$or":[
            {name: { $regex: req.params.key }}
        ]
    })
    resp.send(result);
})

app.listen(5000);