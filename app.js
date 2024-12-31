const express = require("express");
//importing express module
const path = require("path");
const fs = require("fs");
const app = express();
//creating instance of express application by calling express function.

const port = 80;

//for serving static files express specific stuff
app.use("/static",express.static('static'));
//include middleware
app.use(express.urlencoded())

//for serving views or html templates using pug template engine.
app.set('view engine','pug');
app.set('views',path.join(__dirname,"views"));

//when someone goes on this path/url callback will run.
app.get("/demo",(req, res)=>{
    res.status(200).render('demo',{title: "Hey Harry", message: 'Hello there!'});
})
//first title and message compiled and then rendered
app.get("/index",(req, res)=>{
    res.status(200).render('index',{title: "Hey Harry", message: 'Hello there!'});
})

//send variable in html
app.get("/",(req,res)=>{
    console.log("get method chali")
    const con = "This is the best content on the internet so far use it wisely ";
    const params = {'title':'pubg is the best game', 'content':con}
    res.status(200).render("index.pug",params);
})

//for posting formdata
app.post("/",(req,res)=>{
    console.log(req.body);
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const more = req.body.more;
    const params = {'message':'Your form has been submitted successfully'}
    res.status(200).render('index.pug',params);
    let outputToWrite = `the name of the client is ${name}, ${age}, years old, ${gender}, More about : ${more}`;
    fs.writeFileSync('output.txt',outputToWrite);
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})