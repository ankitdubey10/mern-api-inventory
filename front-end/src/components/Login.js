import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    
    const [email, setemail] = React.useState("");
    const [password, setpassword] = React.useState("");
    const navigate = useNavigate();
    
    useEffect( ()=>{
        const auth = localStorage.getItem("user");
        if(auth){
            navigate("/");
        }
    })

    const handleLogin = async () => { 
        console.warn('email:',email,'password:', password);
        
        let resu = await fetch( 'http://localhost:5000/login', 
        {
            method:'Post',
            body: JSON.stringify({email, password}),
            headers: { 'Content-Type': 'application/json' }
        });

        resu = await resu.json();
        console.warn(resu);
        if(resu._id != ""){ 
            localStorage.setItem("user",JSON.stringify(resu));
            return navigate("/")
        }
        else{
            console.log(resu);
            alert("Enter correct credentials")
        }

    }

    return (
        <div className='Login'>
            <h1>Login Page</h1>
            <div className = 'LoginPage'>

                <input className="inputBox" type="email" value = {email}  placeholder="Enter Email" 
                onChange={(e)=>setemail(e.target.value)} />
                
                <input className="inputBox" type="password" value = {password} placeholder="Enter Password" 
                onChange={(e)=>setpassword(e.target.value)} />

                <button className="btn-login btn-signup" type="button" onClick={handleLogin} 
                >Login</button>
            </div>
        </div>
    )
}
export default Login; 