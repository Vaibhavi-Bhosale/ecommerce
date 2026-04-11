import api from "./axios";

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