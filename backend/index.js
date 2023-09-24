

// Import the express module
const express = require("express");
const cors = require("cors");



const dbConnect = require("./db.js");
const app = express();

// Use the dbConnect function
// app.use(express.urlencoded());

//  app.use(bodyParser({
//    urlencoded:true
//  }))
app.use( cors({ origin: "*"}));
app.use(cors());
app.use(express.json());
app.use("/api",require('./routes/SignupLogin.js')); //Note: app.use('/api', require('./routes/signupLogin.js') attaches the router to the /api path, which means that all routes defined within the router module will be accessible under the /api path.
app.use("/api",require('./routes/DisplayData.js'));
app.get("/" ,(req,resp)=>{
    resp.send("helo world");
})

// Listen on a port
const port = 5000;
dbConnect();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
