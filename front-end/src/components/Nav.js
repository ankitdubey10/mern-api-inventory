import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
const Nav = () => {
    const auth = localStorage.getItem('user')
    const Navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        Navigate("/signup");
    }
    return (
        <div>
            <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIf8X2r4BZdckN3yP2tgiNZvsOvlRCySxGYqClIciCzQ&s"
            alt = "logo"
            className='logo'
            ></img>
            {
            auth?
            <ul className='navbar'>
                <li> <Link to = "/"> Products</Link> </li>
                <li> <Link to = "/add"> Add Product</Link> </li>
                <li> <Link to = "/profile"> Profile</Link> </li>
                <li className='logout'> <Link onClick={logout} to = "/signup"> Logout ({JSON.parse(auth).name})</Link> </li>
            </ul>
            :
            <ul className='navbar navRight'>
                <li><Link to = "/signup"> Sign Up</Link></li>
                <li> <Link to = "/login"> Login page</Link> </li>
            </ul>
            }
        </div>
    )
}
export default Nav;