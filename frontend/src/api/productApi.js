import api from "./axios";

export const getAllProductsApi = async () => {
  try {
    const res = await api.get("/products");

    console.log(res.data);

    return {
      success: true,
      data: Array.isArray(res.data)
        ? res.data
        : res.data?.data || [],
    };
  } catch (error) {
    console.log(error.response?.data?.message);

    return {
      success: false,
      message: "Failed to load products. Please try again later.",
    };
  }
};

export const getSingleProduct = async(id)=>{

     if(!id){
          console.log("id not found ")
     }
     try{
          const res = await api.get(`/products/${id}`)
          console.log(res.data)
          return {success:true, data: res.data?.data}
         
     } 
     catch(err)
     {
         console.log(err.res?.data?.message);
         return {success:false, message: "Failed to load product Details. Please try again later."}
     }
}


export const getSearchApi = async (product)=>{

     if(!product)
     {
          return {success : true, data : {}}
     }

     console.log("this is searching ", product)
      try{
            const res = await api.get(`/products/search?search=${product}`);

            console.log(res.data);
            console.log("api call")
            return {success : true, data : res.data.data}
      }
      catch(err){
          console.log(err.res?.data?.message);
          return {success:false, message: "Failed to Search Products. Please try again later."}
      }
}
 