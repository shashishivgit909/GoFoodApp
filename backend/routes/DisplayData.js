const express=require("express");
const router = express.Router();

router.post("/displaydata",(req, res)=>{
    try {
        // console.log(global.foodCategories);
        // console.log(global.foodCategories.length);
       // Send both global variables as an array
       //res.status(201).json({ success: true, user });
       res.status(200).send({food_items:global.food_items,foodCategories: global.foodCategories});

    } catch (error) {
        res.status(500).send({ success: false, error: 'Server error' });
    }
})
module.exports=router;