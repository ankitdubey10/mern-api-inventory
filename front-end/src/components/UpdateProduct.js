import React, {useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom'
const UpdateProduct = () => {
    const [name, setname] = React.useState("");
    const [price, setprice] = React.useState("");
    const [quantity, setquantity] = React.useState("");
    const [category, setcategory] = React.useState("");
    const [error, seterror] = React.useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect( ()=> {
        getOneProduct();
    }, [])

    const getOneProduct = async () => {
        console.warn(params);
        let result = await fetch (`http://localhost:5000/update/${params.id}`);
        result = await result.json(); 
        // console.warn(result);
        setname(result.name);
        setprice(result.price);
        setquantity(result.quantity);
        setcategory(result.category);
    }
    const updateProducts = async () => {
        if(Math.floor(quantity)!=quantity || quantity <0 || price <= 0 || !name){ 
            seterror(true);
            return false;
        }
        let result = await fetch (`http://localhost:5000/update/${params.id}`,{
            method:'put',
            body:JSON.stringify({name, price, quantity, category}),
            headers:{
                "Content-Type":"application/json"
            }
        });
        result = await result.json();
        console.warn(result);
        if(result.acknowledged) navigate("/");
    }

    return(
        <div className='SignUp'>
            <h1>Update Product</h1>

            <input type = "text" value={name} className="inputBox" placeholder='Enter Product Name'
            onChange={(e)=>setname(e.target.value)}/>
            {error && !name && <span className='invalid'>Enter valid name.</span>}

            <input type = "number" value={price} className="inputBox" placeholder='Enter Price'
            onChange={(e)=>setprice(e.target.value)}/>
            {error && !price && <span className='invalid'>Enter valid price.</span>}
            
            <input type = "number" value={quantity} className="inputBox" placeholder='Enter Quantity'
            onChange={(e)=>setquantity(e.target.value)}/>
            {error && !quantity && <span className='invalid'>Enter valid quantity.</span>}

            <input type= "text" value={category} className= "inputBox" placeholder='Enter Category'
            onChange={(e)=>setcategory(e.target.value)}/>
            {error && !category && <span className='invalid'>Enter valid category.</span>}

            <button className="btn-login btn-signup" type="button" onClick={updateProducts} 
                >Update Product</button>

        </div>    
    )
}
export default UpdateProduct;