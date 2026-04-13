import api from "./axios";


//place order
export const placeOrderApi =async ()=>{
       if(!localStorage.getItem("token"))
          return

       try{
            const res = await api.post('/orders')
            console.log(res.data)
            return {success : true} 


       }catch(err)
       {
             console.log(err.message);
             return{ success : false}
       }
}

//get all orders

export const getOrdersApi = async ()=>{
         if(!localStorage.getItem("token"))
            return;

         try{
             const res = await api.get('/orders/myOrders')

             return {success : true, data : res.data.data}
         }
         catch(err){
               console.log(err.message);
               return {success : false}
         }
 }