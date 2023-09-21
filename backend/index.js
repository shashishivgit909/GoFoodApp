

// Import the express module
const express = require("express");
const cors = require("cors");
const route = require('./routes/signupLogin.js');


const dbConnect = require("./db.js");
const app = express();

// Use the dbConnect function
app.use(express.urlencoded());

// app.use(bodyParser({
//   urlencoded:true
// }))
app.use( cors({ origin: "*"}));
app.use(cors());
app.use(express.json());
app.use("/api",route); //middlewares

app.get("/" ,(req,resp)=>{
    resp.send("helo world");
})

// Listen on a port
const port = 5000;
dbConnect();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
