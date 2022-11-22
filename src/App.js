
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap';
import Home from './home';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Admin from './admin';
import User from './user';
import Cart from './cart';
import Signup from './signup';
import Adminlogin from './adminlogin';


function App() {
  return (
    
       <Router>
      <Routes>
        <Route path='/'element={<Home/>} />
        <Route path='Signup'element={<Signup/>} />
        <Route path='adminlogin'element={<Adminlogin/>} />
        <Route path='/admin'element={<Admin/>} />
        <Route path='/user'element={<User/>} />
        <Route path='/mycart'element={<Cart/>} />
        
      </Routes>
    </Router>
  
    
  );
}

export default App;
