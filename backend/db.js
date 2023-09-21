

const mongoose = require('mongoose');
const URL = 'mongodb+srv://gofood:12345@cluster1.berg765.mongodb.net/gofood?retryWrites=true&w=majority'; // Include the database name 'gofood'


const Connection = async () => {
  try {
    await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected successfully');

    try {
      const cursor = mongoose.connection.db.collection("food_items").find({});
      const fetched_data = await cursor.toArray();
      //console.log("Fetched data:", fetched_data);
    } catch (error) {
      console.log("Error in fetching data:", error);
    }
  } catch (error) {
    console.log('Error while connecting to the database ', error);
  }
};
module.exports= Connection;
