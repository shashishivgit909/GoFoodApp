import React from 'react'

export default function Card() {
    return (
        <div>
            <div style={{ "border": "solid red 1px", "margin-top": "20px" }}>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px", "border": "solid green 1px" }}>
                    <div className="card-body ">
                        <h5 className="card-title">Card title</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p className="card-text">Some important content.</p>
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
                            <select className="m-2 h-100 bg-sucess rounded">
                                <option value="half" >Half</option>
                                <option value="full" >Full</option>
                            </select>
                            <div className="d-inline h-100 fs-5">Total price</div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}
