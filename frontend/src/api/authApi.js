import api from "./axios"
 
export const loginApi = async({email, password})=>{
      if(!email || !password)
      {
          console.log("email or password is missing :: from login api")
          throw new Error("email or password not there :: from login api")
      }
      console.log("login api")
    console.log(email, " ", password)

      try{
            const res = await api.post('/auth/login', {email, password})
            return res.data;

      }
      catch(err){
           console.log(err.response?.data?.message || "error from login api") 
           throw new Error(err.response?.data?.message || "error from login api")
      }

           
}

 export const signupApi = async({name, email, password})=>{

      console.log(name,email,password)
       if(!name || !email || !password)
       {
          console.log("email or password or name is missing :: from login api")
          throw new Error("name or email or password  not there :: from login api")
       }

       try{
            const res = api.post('/auth/register', {name,email,password})
            return res.data
       }
       catch(err)
       {
           console.log(err.response?.data?.message || "error from signup api") 
           throw new Error(err.response?.data?.message || "error from signup api")
       }
       
 }