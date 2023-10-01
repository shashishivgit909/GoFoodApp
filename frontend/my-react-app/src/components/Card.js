import React, { useEffect, useState, useRef } from 'react';
import { useDispatchCart } from './ContextReducer';

export default function Card(props) {
    console.log(props.options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    console.log("size>>",size);
    console.log("objec 1st index",props.options[Object.keys(props.options)[0]]);
    // const [optionPrice,setOptionPrice]=useState(1);
    const priceRef = useRef();

    const dispatch = useDispatchCart();
    const options = props.options || {};
    const priceOptions = Object.keys(options);

    const handleAddToCart = async () => {
        const finalPrice = qty * parseInt(options[size] || 0);
        await dispatch({
            type: "ADD",
            id: props.foodItems._id,
            name: props.foodItems.name,
            price: finalPrice,
            qty: qty,
            size: size,
            img: props.foodItems.img,
        });
    }

    // useEffect(() => {
    //     setSize(priceOptions[0]);
    // }, [priceOptions]);

    return (
        <div>
            <div style={{ border: "solid red 1px", marginTop: "20px" }}>
                <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px", border: "solid green 1px" }}>
                    <img src={props.foodItems.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                    <div className="card-body ">
                        <h5 className="card-title">{props.foodItems.name}</h5>

                        <div className="container w-100">
                            <select className="m-2 h-100 bg-sucess rounded" onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => (
                                    <option value={i + 1} key={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                            <select className="m-2 h-100 bg-success rounded" onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((data) => (
                                    <option key={data} value={data}>{data}</option>
                                ))}
                            </select>
                            <div className="d-inline h-100 fs-5">Rs.{qty * parseInt(options[size] || props.options[Object.keys(props.options)[0]])}</div>
                            <hr />
                            <button onClick={handleAddToCart} className={`btn btn-success justify-center `} >Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
