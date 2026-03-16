import { loginApi } from "../../api/authApi"
 

const login = async(data, auth)=>{

    console.log("login action")
    console.log(data)

     const res = await loginApi(data)

     auth.loginContext(res.token, res.user )

     return true;
     
}

export default login