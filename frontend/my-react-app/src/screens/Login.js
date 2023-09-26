import React, { useState} from 'react';
import { Link,useNavigate} from 'react-router-dom';

export default function Login() {
  const navigate=useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
    const formHandle = async (e) => { 
      e.preventDefault(); // Prevent page from refreshing when the form is submitted
      try {
        const response = await fetch('http://localhost:5000/api/loginuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          }),
        });
        if (response.status!==200) {
          console.log("invalid credentials")
        }
        else{ //for sucessful login+
          const json= await response.json();
          localStorage.setItem("authToken", json.authToken);
         navigate("/"); 
        }
      } catch (err) {
       // setError(err);
       console.log("server error");
      } 
    }


  

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={formHandle}>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label"> Email address  </label>
          <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={credentials.email} onChange={onChange}  />
        </div>


        <div className="m-3">
          <label htmlFor="exampleInputPassword1" className="form-label">  Password </label>
          <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" />
        </div>

        <button type="submit" className="m-3 btn btn-success"> Submit </button>
        <Link to="/signup" className="m-3 btn btn-danger"> A New User </Link>
      </form>
    </div>
  );
}
