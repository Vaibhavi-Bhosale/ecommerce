import { signupApi } from "../../api/authApi";

const signup = async(data)=>{
     console.log("from action ",data)

       await signupApi(data)

    //  console.log(result.data?.user)
    //  console.log(result.user)

     return true

}

export default signup