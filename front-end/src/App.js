import './App.css';
import './components/Nav.js'
import Nav from './components/Nav.js';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateCompo from './components/Privatecompo';
import Login from './components/Login'
import Addproduct from './components/Addproduct'
import ProductList from './components/ProductList'
import UpdateProduct from './components/UpdateProduct'
import Profile from './components/Profile'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav></Nav>
      <Routes>
        <Route element = {<PrivateCompo/>} >
        <Route path='/' element = {<ProductList/>}></Route>
        <Route path='/add' element = {<Addproduct/>}></Route>
        <Route path='/update/:id' element = {<UpdateProduct/>}></Route>
        <Route path='/profile' element = {<Profile/>}></Route>
        <Route path='/logout' element = {<h1>Logout</h1>}></Route>
        </Route>
        <Route path='/signup' element = {<SignUp/>}></Route>
        <Route path='/login' element = {<Login/>}></Route>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
