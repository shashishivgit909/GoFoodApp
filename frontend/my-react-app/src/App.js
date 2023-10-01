import "./App.css";
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Signup from './screens/Signup';
import { CartProvider } from "./components/ContextReducer";
// import { CartProvider } from './components/ContextReducer';
// import MyOrder from './screens/MyOrder';


function App() {
  return (// wrappin all route inside cardprovider so that card provider can be acesses globally in all app 
    <CartProvider>   
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            {/* <Route exact path="/myorder" element={<MyOrder />} /> */}

          </Routes>
        </div>
      </Router>
    </CartProvider>

  );
}

export default App;