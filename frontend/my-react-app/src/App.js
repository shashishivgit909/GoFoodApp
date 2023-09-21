import "./App.css";
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import Navbar from './components/Navbar';
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';  //npm i bootstrap-dark-5 boostrap
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
 import Signup from './screens/Signup';
// import { CartProvider } from './components/ContextReducer';
// import MyOrder from './screens/MyOrder';


function App() {
  return (
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            {/* <Route exact path="/myorder" element={<MyOrder />} /> */}

          </Routes>
        </div>
      </Router>
  );
}

export default App;