import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">

            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">Home</Link>
              </li>
              { 
                (localStorage.getItem("authToken")) ?
                  (<li className="nav-item">
                    <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">My Orders</Link>
                  </li>) : 
                  {
                    
                  }
              }
            </ul>

            <div className='d-flex'>
              {/* <Link className="nav-link " to="/createuser">Signup</Link>
              <Link className="nav-link" to="/login">Login</Link> */}
              <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
              <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
