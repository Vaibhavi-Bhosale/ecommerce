import api from "./axios"

export const addToCartApi = async(productId)=>{
   console.log("Product Id from the cartApi : ",productId)

   if(!productId)
   {
      console.log("no product id")
      return {status : false, message : "failed to add cart products. plz try later"}
   }
   
    try {
          const res = await  api.post('/cart/addToCart', {productId})

          
          if(res.status == 200)
              return  {status : true}
          else
              return {status : false, message : "failed to add cart products. plz try later"};

          
          
    } catch (error) {
         console.log(error.res?.data?.message)

         return {status : false, message : "failed to add cart products. plz try later"};
    }
}

export const productCountInCart  = async()=>{

    if(!localStorage.getItem("token"))
        return 0;
        

    try{
        // console.log("api call again and again");
        const res = await api.get("/cart");
    
        
     
        return res?.data?.data?.items?.length ?? 0;



    }
    catch{
        return 0;
    }

}

export const cartApi = async()=>{
     if(! localStorage.getItem("token"))
         return

     try{
        const res = await api.get('/cart');

        return res.data?.data?.items
     }
     catch(error)
     {
        console.log("error from cart api : ", error)
         return {success : false, message : "failed to load cart"}
     }
}

export const removeFromCartApi = async(productId)=>{

    console.log("product id : ",productId)
     if(!localStorage.getItem("token"))
         return

     try{
         const res =await api.delete(`/cart/removeFromCart${productId}`  )
         console.log("product delete : ", res)

         return {success : true}

     }catch(err)
     {
         console.log("where is this line : ", err.message);

         return {success : false, message : "failed to delete product from cart"}
     }
}

export const clearCartApi = async()=>{

    console.log("clear cart api run")

    if(!localStorage.getItem("token"))
        return
     try{
         const res = await api.delete('/cart/clear')
         console.log(res.data)

         return {success : true}
     }catch(err)
     {
        console.log(err)
        return {success : false, message : "cart not clear !"}
     }
}