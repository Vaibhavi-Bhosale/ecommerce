import { loginApi } from "../../api/authApi"

const login = async(data, auth)=>{

    console.log("login action")

    
    
    const res = await loginApi(data)
    console.log("")
    console.log("")
    console.log("")
    console.log(res)
    console.log("")
    console.log("")
    console.log("")
    if(res.error)
    {
        console.log("data.error me ghusa")
        return{error:res.error} 
    }
     auth.loginContext(res.res.token, res.res.user )
     console.log("sidha bahar aa gaya")
     return true; 
     
}

export default login