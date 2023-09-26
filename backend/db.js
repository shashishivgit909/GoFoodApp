

// const mongoose = require('mongoose');
// const URL = 'mongodb+srv://gofood:12345@cluster1.berg765.mongodb.net/gofood?retryWrites=true&w=majority'; // Include the database name 'gofood'


// const Connection = async () => {
//   try {
//     await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log('Database connected successfully');

//     try {
//       const cursor1 =  mongoose.connection.db.collection("food_items").find({});
//       const fetched_data1 = await cursor1.toArray();
//       global.food_items = fetched_data1; // way to decalre global variable in block 
//       //console.log(data); 
//       //console.log("Fetched data:", fetched_data);
//       const cursor2 =  mongoose.connection.db.collection("foodCategories").find({});
//       const fetched_data2 = await cursor2.toArray();
//       global.foodCategories = fetched_data2;
//        // Close the database connection when you're done with it
//        mongoose.connection.close();
//     } catch (error) {
//       console.log("Error in fetching data:", error);
//     }
//   } catch (error) {
//     console.log('Error while connecting to the database ', error);
//   }
// };
// module.exports= Connection;

const mongoose = require('mongoose');
const URL = 'mongodb+srv://gofood:12345@cluster1.berg765.mongodb.net/gofood?retryWrites=true&w=majority'; // Include the database name 'gofood'

const Connection = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected successfully');

    // Fetch data from collections
    try {
      const foodItemsCursor = mongoose.connection.db.collection("food_items").find({});
      const foodCategoriesCursor = mongoose.connection.db.collection("foodCategories").find({});

      // Use Promise.all to fetch data from multiple collections concurrently
      const [foodItems, foodCategories] = await Promise.all([
        foodItemsCursor.toArray(),
        foodCategoriesCursor.toArray(),
      ]);

      // Store the fetched data in global variables
      global.food_items = foodItems;
      global.foodCategories = foodCategories;
       
      console.log('Fetched data successfully',global.foodCategories);
    } catch (error) {
      console.log('Error in fetching data:', error);
    } 
  } catch (error) {
    console.log('Error while connecting to the database:', error);
  }
};

module.exports = Connection;
