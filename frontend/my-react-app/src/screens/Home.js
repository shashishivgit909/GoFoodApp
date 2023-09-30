import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Card from '../components/Card'

function Homepage() {
  const [foodCat, setfoodCat] = useState([]);
  const [foodItems, setfoodItems] = useState([]);
  const [search, setsearch] = useState("");

  const loadData = async () => {
    let response;
    try {
      response = await fetch("http://localhost:5000/api/displaydata", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      // console.log(await response.json());
      if (response.status === 200) {
        response = await response.json();
        console.log(response.foodCategories, response.food_items);
        setfoodCat(response.foodCategories); //setting fooddata taken theough API in state so we can sent  it in cart using props.
        setfoodItems(response.food_items);
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
      <div>  {/* code contains thsi div is for crouse;l m, but for implementing search in this , we need to send data(used to type in serach bar) from crousel to homepage , but home page is parent to crousel which is not allowed in react , so we do define crousel in home.js file in a div */}
        <div>
          <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>


            <div className="carousel-inner" id="carousel">
              <div className="carousel-caption" style={{ zIndex: 10 }} >
                {/* implement seaech bar */}
                <div className="d-flex justify-content-center">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setsearch(e.target.value)} />
                  {/* <button className="btn btn-outline-success text-white " type="submit">Search</button> */}
                </div>

              </div>

              <div className="carousel-item active">
                <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(50%" }} alt="..." />
              </div>

              <div className="carousel-item">
                <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" style={{ filter: "brightness(50%" }} alt="..." />
              </div>

              <div className="carousel-item">
                <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" style={{ filter: "brightness(50%" }} alt="..." />
              </div>

            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div className="container">


        {
          foodCat.length > 0
            ? foodCat.map((data) => {
              return (
                // justify-content-center
                <div className='row mb-3'>
                  <div key={data.id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                  {foodItems.length > 0 ? foodItems.filter(
                    (items) => (items.CategoryName === data.CategoryName) &&(items.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                          {console.log(filterItems.url)}
                          {/* here sending dataa from home js to card as props to render in card */}
                          <Card foodItems={filterItems}  //all filtered data sent as prop as single to card using filterItems 
                          //item={filterItems} 
                          options={filterItems.options[0]}  // sent singly for option 
                         // ImgSrc={filterItems.img} 
                          //desc={filterItems.description}
                             
                         > </Card>
                        </div>
                      )
                    }) : <div> No Such Data </div>}
                </div>
              )
            })
            : ""}
        
      </div>



      <div> <Footer /> </div>
    </div>
  )
}
// Wrap Homepage with React.memo during export
export default React.memo(Homepage);