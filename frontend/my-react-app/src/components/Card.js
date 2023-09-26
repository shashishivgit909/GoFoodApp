import React from 'react'

export default function Card(props) {
    const options = props.options || {}; // this to ahndle for null valiues in option sent as props
    const priceOptions = Object.keys(options); //this stores keys of option object in an array priceOptions n, now we will traverse in it below to display it in option in return
    console.log("options",options) ;
    return (
        <div>
            <div style={{ "border": "solid red 1px", "margin-top": "20px" }}>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px", "border": "solid green 1px" }}>
                <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> {/* style prpoetty used in this line used to give ht to eac image and make all to fit properly */}
                    <div className="card-body ">
                        <h5 className="card-title">{props.foodName}</h5>
                        {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                        <div className="card-text  text-justify">{props.desc}</div>


                        <div className="container w-100">
                            <select className="m-2 h-100 bg-sucess rounded">
                                {
                                    Array.from(Array(6), (e, i) => {
                                        return (
                                            <option value={i + 1} key={i + 1}>{i + 1}</option>
                                        )
                                    })
                                }

                            </select>
                            <select className="m-2 h-100 bg-success rounded">
                                {
                                    priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                            <div className="d-inline h-100 fs-5">Total price</div>
                            <hr/>
                            <button className={`btn btn-success justify-center ms-2 `} >Add to Cart</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

