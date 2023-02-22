import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Newproduct from "./pages/Newproduct"
import Order from './pages/Order';


function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}></Route>
          <Route exact path='/register' element={< Register />}></Route>
          <Route exact path='/home' element={< Home />}></Route>
          <Route exact path='/addorupdate' element={< Newproduct/>}></Route>
          <Route exact path='/home/order' element={< Order/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
