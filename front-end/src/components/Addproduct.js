import React from 'react';
const Addproduct = () => {
    const [name, setname] = React.useState("");
    const [price, setprice] = React.useState("");
    const [quantity, setquantity] = React.useState("");
    const [category, setcategory] = React.useState("");
    const [error, seterror] = React.useState("");

    const addproduct = async () => {
        if(Math.floor(quantity)!=quantity || quantity <0 || price <= 0 || !name){ 
            seterror(true);
            return false;
        }
        console.warn(name, price, quantity, category);
        let result = await fetch('http://localhost:5000/addproduct',{
            method:'post',
            body:JSON.stringify({name, price, quantity, category}),
            headers:{
                "Content-Type":"application/json"
            }
        });
        result = await result.json();
        console.log(result);
    }

    return(
        <div className='SignUp'>
            <h1>Add Product</h1>

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

            <button className="btn-login btn-signup" type="button" onClick={addproduct} 
                >Add Product</button>

        </div>    
    )
}
export default Addproduct;