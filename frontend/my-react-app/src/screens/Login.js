import React, { useState} from 'react';
import { Link} from 'react-router-dom';
export default function Login() {
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
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        //setData(responseData);
        console.log(responseData);
      } catch (err) {
       // setError(err);
       console.log("login fails");
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
        <Link to="/createuser" className="m-3 btn btn-danger"> A New User </Link>
      </form>
    </div>
  );
}
