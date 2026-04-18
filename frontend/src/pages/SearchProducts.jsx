import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import { useSearchParams } from 'react-router-dom';
import { getSearchApi } from '../api/productApi';
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
 import { addToCartApi } from "../api/cartApi";
import useCart from "../context/useCart";
import { toast } from "react-toastify";
import Product from "../components/Product";


function SearchProducts() {


    const [searchParams] = useSearchParams();
   const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const [addingId, setAddingId] = useState(null);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const {fetchCount} = useCart()
    useEffect(()=>{

        async function apiCall(){

            const productQuery = searchParams.get("q");
            const res = await getSearchApi(productQuery);
            // console.log("FAAAAAAAAAAAAAA : ",res.data);

            if(!res.success)
            {
                toast.error(res.message)
                navigate("/")
            }
            
            setProducts(res.data || []);
            setLoading(false);
        }

        apiCall();
    },[searchParams])

    const handleAddToCart = async (productId) => {
    if (!isLoggedIn) {
      toast.info("login for add to cart")
      navigate("/login");
      return;
    }
     
    // console.log("before add to cart")
     
    const res = await addToCartApi(productId);
     fetchCount();

    // console.log("after add to cart")

    if(!res.success)
    {
      // setError(res.message)
      toast.error(res.message)
    }
    else{

      toast.success("product added in cart! yehh")
      //  alert("product added in cart");

      //  console.log("before callling fetch count")

       
       setTimeout(() => {
      fetchCount(); // 🔥 delayed fetch
    }, 300);
        
    // console.log("after callling fetch count")
    }

    if (loading) {
    return (
      <div className="flex justify-center py-10">
        <span className="text-gray-600">Loading products...</span>
      </div>
    );
  }

//   if (error) {
//     return (
//       <div className="py-10">
//         <p className="text-red-600">{error}</p>
//       </div>
//     );
//   }
  };

  return (

    <Container>  <div>

      {/* <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
  Hello Theme 🌗
</div> */}

      <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[color:var(--text)]">Products</h1>
          <p className="text-sm text-[color:var(--text-muted)]">
            Browse our catalog and add items to your cart.
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <p className="text-[color:var(--text-muted)]">No products available.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            



                 <Product key={product._id || product.id} product={product} handleAddToCart={handleAddToCart}   addingId={addingId}/>


          ))}
        </div>
      )}
    </div></Container> 
  
  )
}

export default SearchProducts
