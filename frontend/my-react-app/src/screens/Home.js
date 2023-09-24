import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Crousel from '../components/Crousel'
export default function Homepage() {
  const [foodCat, setfoodCat] = useState([]);
  const [foodItems, setfoodItems] = useState([]);
  const loadData = async () => {
    let response;
    try {
      response = await fetch("http://localhost:5000/api/fooddata", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (response.status === 200) {
        response = await response.json();
        // console.log(response[0], response[1]);
        setfoodCat(response[0]); //setting fooddata taken theough API in state so we can sent  it in cart using props.
        setfoodItems(response[1]);
      }
      else {
        console.log("cannot load data(food data) into homepage  from database due to server eror")
      }
    } catch (error) {
      console.log("server error in fetching");
    }

  }
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div> <Navbar /> </div>
      <div> <Crousel /></div>
      <div className="container">
  {foodCat !== [] ? (
    foodCat.map((data) => (
      <div key={data._id}>
        {data.CategoryName}
      </div>
    ))
  ) : (
    ""
  )}
</div>

      <Card />
      <div> <Footer /> </div>
    </div>
  )
}
