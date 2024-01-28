import React, {useEffect} from 'react'
import {Link, Navigate} from 'react-router-dom'
const ProductList = () => {

    let [products, setproducts] = React.useState([]);
    
    useEffect( () => {
        getProducts();
    }, [])
    
    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setproducts(result);
    }

    const deleteProduct = async (id) =>{
        let result = await fetch(`http://localhost:5000/products/${id}`,{
            method:'delete'
        })
        result = await result.json();
        if(result){
            alert("Product is deleted");
            getProducts();
        }
    }
    const searchHandle = async (event) => {
        
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if(result) setproducts(result);
        }else{
            getProducts();
        }
    }
    console.warn("products", products);  
    console.log(products);  
    return (
        <div className='ProductList'>
            <h1>Product List</h1>
            <input placeholder='Search' type="text" onChange={searchHandle} className= "searchBox"/>
            <ul>
                <li>Sr. No.</li>
                <li>Product Name</li>
                <li>Product Price</li>
                <li>Quantity</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
                products.map( (item, index)=>
                <ul key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>${item.price}</li>
                <li>{item.quantity}</li>
                <li>{item.category}</li>
                <li> <button className='btnpd' onClick={ () => deleteProduct(item._id)} >Delete</button> 
                   <button className='btnpu' > <Link to={"/update/"+item._id}> Update</Link> </button> 
                </li>
                </ul>
                 )
            }
        </div>
    )
}
export default ProductList;