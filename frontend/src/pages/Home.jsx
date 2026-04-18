import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import {getAllProductsApi} from "../api/productApi";
import { addToCartApi } from "../api/cartApi";
import useCart from "../context/useCart";
import { toast } from "react-toastify";
import Product from "../components/Product";



export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addingId, setAddingId] = useState(null);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const {fetchCount} = useCart()
  
       

  useEffect(() => {
    const fetchProducts = async () => {
       //async function
      const res =await getAllProductsApi();
      if (!res.success) {
        setError(res.message);
        toast.error(res.message)
        // console.log("error msg from home compo ", res.message);
      } else {
        setProducts(res.data || []);
        // console.log("this from home", res.data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

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
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <span className="text-gray-600">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div>

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
            



                 <Product key={product._id} product={product} handleAddToCart={handleAddToCart}   addingId={addingId}/>


          ))}
        </div>
      )}
    </div>
  );
}
