//import the modules
//require() function used to import the modules
let express = require("express");
let mongodb = require("mongodb");
let cors = require("cors");
let bodyparser = require("body-parser");


//create the rest object
let app = express();
//where "app" is the rest object
//where "app" object used to develop the rest services


//set the MIME Type
app.use(bodyparser.json());


//read the form data
app.use(bodyparser.urlencoded({extended:false}));


//use the cors module
app.use(cors());

//"post" request with "header"
//verify the headers
let auth = (req,res,next)=>{
    let allHeaders = req.headers;
    let result = allHeaders.token;
    if(result === "ashokit"){
        next();
    }else{
        res.send({"auth":"unauthorised user"});
    }
};

//create the ref variable to connect to database
let ashokIT = mongodb.MongoClient;


//create the post request
app.post("/employees",[auth],(req,res)=>{
    ashokIT.connect("mongodb+srv://admin:admin@miniprojectdb.nzphu.mongodb.net/workshop?retryWrites=true&w=majority",(err,connection)=>{
        if(err) throw err;
        else{
            let db = connection.db("workshop");
            db.collection("employees").insertOne({"name":req.body.name,
                                                  "email":req.body.email,
                                                  "mobile":req.body.mobile,
                                                  "gender":req.body.gender,
                                                  "address":req.body.address,
                                                  "country":req.body.country},(err,result)=>{
                if(err) throw err;
                else{
                    res.send({"insert":"success"});
                }
            })
        }
    });
});



//assign the port number
let port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log("server started");
}); 





