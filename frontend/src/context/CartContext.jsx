import { createContext, useEffect, useState, useCallback } from "react";
import { productCountInCart } from "../api/cartApi";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [count, setCount] = useState(null);
  

  const fetchCount = useCallback(async()=>{

    if(!localStorage.getItem("token"))
    {
      setCount(0);
      return;
    }
    else{
      const res = await productCountInCart();

       console.log("cart count",res)
       setCount(res);
    }
     
  }, []);

  useEffect(() => {
    fetchCount();
  }, [fetchCount]); // safe now

  return (
    <CartContext.Provider value={{ count, fetchCount }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };