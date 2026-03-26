import api from "./axios";

export const getAllProductsApi = async()=>{
    try {
         const res = await api.get("/products")
         console.log(res.data)

         return {success:true, data: res.data}

    } catch (error) {
         console.log(error.res?.data?.message);

         return {success:false, message: "Failed to load products. Please try again later."}
    }
}

export const getSingleProduct = async(id)=>{

     if(!id){
          console.log("id not found ")
     }
     try{
          const res = await api.get(`/products/${id}`)
          console.log(res.data)
          return {success:true, data: res.data}
         
     } 
     catch(err)
     {
         console.log(err.res?.data?.message);
         return {success:false, message: "Failed to load product Details. Please try again later."}
     }
}

 