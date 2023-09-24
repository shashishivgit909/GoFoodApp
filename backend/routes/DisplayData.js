const express=require("express");
const router = express.Router();

router.post("/fooddata",(req, res)=>{
    try {
        //console.log(global.food_items);
       // Send both global variables as an array
       //res.status(201).json({ success: true, user });
       res.status(200).send([global.food_items, global.foodCategories]);

    } catch (error) {
        res.status(500).send({ success: false, error: 'Server error' });
    }
})
module.exports=router;