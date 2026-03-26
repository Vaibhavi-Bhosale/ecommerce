import api from "./axios"

export const addToCartApi = async(productId)=>{
   console.log("Product Id from the cartApi : ",productId)

   if(!productId)
   {
      
      console.log("no product id")
      return {status : false, message : "failed to add cart products. plz try later"};

          
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

        

        console.log("api call again and again");
        const res = await api.get("/cart");
    
        return res?.data?.items?.length ?? 0;
    }
    catch{
        return 0;
    }

}