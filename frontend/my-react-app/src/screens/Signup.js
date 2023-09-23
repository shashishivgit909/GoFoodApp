// import React, { useState } from 'react'
// import {Link} from "react-router-dom";
// export default function Signup() {
//     const[credentials,setcredentials]=useState({name:"",email:"",password:"",geolocation:""})
//     const formHandle=async(e)=>{
//         e.prevantDefault(); //handle page refershingh when form is submitted
//         try {
//            const response=await fetch("localhost:5000/api/createuser",{
//             method:"POST",
//             headers: {
//                 'Content-Type': 'application/json'
//               },
//               body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
//            }) 
//          //  const json=await response.json();
//         //    if(!json.success)
//         //    {
//         //     alert("please enter valid credentails");
//         //    }
//         } catch (error) {
//           console.log("error in fetching", error) ; 
//         }
//     }
  
//     const onChange = (e) => {
//         setcredentials({ ...credentials, [e.target.name]: e.target.value }) // This will update the 'name' property in 'credentials' , by overridig connecpt of keys in object
//       }
//     return (
//         <>
//         <div className='container'>
//         <form onSubmit={formHandle}>
//             <div className="mb-3">
//                     <label for="name" className="form-label">Name</label>
//                     <input type="email" className="form-control"  name='name' value={credentials.name} onChange={onChange}/>
//                     {/* The name attribute specifies the name of the input field. In this case, the name is set to "name." This is important for identifying the input element when processing form data  */}
//                 </div>
//                 <div className="mb-3">
//                     <label for="exampleInputEmail1" className="form-label">Email address</label>
//                     <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
                        
//                 </div>
//                 <div className="mb-3">
//                     <label for="exampleInputEmail1" className="form-label">Location</label>
//                     <input type="location" className="form-control" id="exampleInputEmail1" name='geolocation' value={credentials.geolocation} onChange={onChange} aria-describedby="emailHelp"/>
                        
//                 </div>

//             <div className="m-3">
//               <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//               <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
//             </div>
//                 <button type="submit" className="m-3 btn btn-success">Submit</button>
//                 <Link to ="/login" className="m-3 btn btn-danger">Already a User</Link>
//             </form>
//         </div>
           
//         </>
//     )
// }

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        geolocation: '',
    });

    const formHandle = async (e) => {
        e.preventDefault(); // Prevent page from refreshing when the form is submitted
        try {
            const response = await fetch('http://localhost:5000/api/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation,
                }),
            });

            if (response.status===201) {
                // Successful response handling
                console.log('User signed up successfully');
                // You can redirect or show a success message here
                // For example, you can use history.push('/') to redirect to the homepage
            } else {
                // Handle error response
                console.log('Failed to create user');
            }
        } catch (error) {
            console.log('server error', error);
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <form onSubmit={formHandle}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={credentials.name}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        name="email"
                        value={credentials.email}
                        onChange={onChange}
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputLocation1" className="form-label">
                        Location
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputLocation1"
                        name="geolocation"
                        value={credentials.geolocation}
                        onChange={onChange}
                        aria-describedby="locationHelp"
                    />
                </div>
                <div className="m-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        value={credentials.password}
                        onChange={onChange}
                        name="password"
                    />
                </div>
                <button type="submit" className="m-3 btn btn-success">
                    Submit
                </button>
                <Link to="/login" className="m-3 btn btn-danger">
                    Already a User
                </Link>
            </form>
        </div>
    );
}
