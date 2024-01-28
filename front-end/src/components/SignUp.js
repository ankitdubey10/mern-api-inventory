import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
const SignUp = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();
    useEffect( ()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/');
        }
    } )
    const collectData = async () => {
        // console.warn(name, email, password);
        let result = await fetch('http://localhost:5000/signup', {
            method: 'Post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if(result) navigate("/");
        localStorage.setItem("user", JSON.stringify(result));
    }
    return (
        <div className="SignUp">

            <h1>Registration Page</h1>

            <input className="inputBox" type="text" placeholder="Enter Name"
                value={name} onChange={(e) => setname(e.target.value)} />

            <input className="inputBox" type="email" placeholder="Enter Email"
                value={email} onChange={(e) => setemail(e.target.value)} />

            <input className="inputBox" type="password" placeholder="Enter Password" />

            <input className="inputBox" type="password" placeholder="Confirm Password"
                value={password} onChange={(e) => setpassword(e.target.value)} />

            <button onClick={collectData} className="btn-signup" type="button">Sign Up</button>

        </div>
    );
}
export default SignUp;