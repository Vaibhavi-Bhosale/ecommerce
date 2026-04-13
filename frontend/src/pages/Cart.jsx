import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import useCart from "../context/useCart";
import { cartApi } from "../api/cartApi";
import useAuth from "../context/useAuth";
import { toast } from "react-toastify";
import { removeFromCartApi } from "../api/cartApi";
import {clearCartApi} from "../api/cartApi"

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [submitting, setSubmitting] = useState(false);
  // const [error, setError] = useState("");
  const navigate = useNavigate();
    

  const { isLoggedIn } = useAuth();

  const {fetchCount} = useCart()

  // const fetchCart = async () => {
  //   setLoading(true);
  //   setError("");
  //   try {
  //     const res = await api.get("/cart");
  //     setItems(res.data?.items || res.data || []);
  //   } catch (err) {
  //     setError("Failed to load cart");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    async function fetchCart() {
      if (!isLoggedIn) {
        return;
      }

      const res = await cartApi();
      setProducts(res);
      console.log(res);
      setLoading(false);
    }

    fetchCart();
  }, []);

   

  const handleRemove = async (productId) => {
      if(!localStorage.getItem("token"))
          return

      if(!productId)
          return

      const res = await removeFromCartApi(productId)

      console.log("This is From the handel Remove...",res)

      if(!res.success)
      {
          toast.error("failed to remove product from cart")
          return
      }
      else{
          toast.success("Product remove from cart")

          // ✅ UPDATE UI INSTANTLY
  setProducts((prev) =>
    prev
      .map(item =>
        item.product._id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
  );
      }
  };

  const handleClear = async () => {

    console.log("handle clear run..")
 
     
    if(!localStorage.getItem("token"))
    {
      console.log("return from local storage block")
      return
    }

    if (!window.confirm("Clear all items from cart?")) 
      {
      console.log("return from confirm block")
      return
    }
     
     const res = await clearCartApi();
     console.log("res : ",res)

     if(!res.success)
     {
        toast.error("cart not clear !")
        return
     }
     else{
       toast.success("cart clear")
       navigate("/")
     }
     
     

  };

  const handlePlaceOrder = async () => {
       if (products.length === 0) return;
     
   
      const res = await api.post("/orders");

      if(res.success)
      {
          toast.error("oops ! fails to place order")
          return
      }
      toast.success("yehh! order plcaed")
      fetchCount()
      navigate("/orders/my");
     
       
  };

  // const total = items.reduce((sum, item) => {
  //   const price = Number(item.price || item.product?.price || 0);
  //   const qty = Number(item.quantity || 1);
  //   return sum + price * qty;
  // }, 0);

  const total = Array.isArray(products)
  ? products.reduce((sum, item) => {
      const price = Number(item.product?.price || 0);
      const qty = Number(item.quantity || 1);
      return sum + price * qty;
    }, 0)
  : 0;
  return (
    <div>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[color:var(--text)]">
            Your Cart
          </h1>
          <p className="text-sm text-[color:var(--text-muted)]">
            Review items and place your order.
          </p>
        </div>

        
      </div>
 

      {loading && (
        <div className="flex justify-center py-10">
          <span className="text-gray-600">Loading cart...</span>
        </div>
      )}


      {products.length === 0 ? 
      (
        <p className="text-[color:var(--text-muted)]">Your cart is empty.</p>
      ) : 
      (
        <div>
          <div className="space-y-3 mb-6">
            {products.map((item) => {
              return (
                <div key={item._id} className="bg-blue-400">
                  <p className="text-red-500">
                    Product Name : {item.product.name}
                  </p>
                  <p>price : {item.product.price}</p>
                  <p>category : {item.product.category}</p>
                  <p>quantity : {item.quantity}</p>

                  <button className="bg-red-400 p-5 "
                  onClick={()=>{
                    handleRemove(item.product._id);
                  }}>Remove from cart</button>
                  
                </div>
              );
            })}
          </div>

          <div>

             <button 
                  className=" p-5 rounded-2xl bg-green-500"                 
                  onClick={handlePlaceOrder}>Place Order
             </button>

             <button
                  onClick={handleClear}
                  className="p-5 rounded-2xl bg-red-500"
             >Clear Cart</button>


  
              

            <p className="text-green-400 text-5xl font-extrabold ">{total}</p>
          </div>
        </div>
      )}
    </div>
  );
}
