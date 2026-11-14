import api from "../../utils/axios"


export const logOut = async () => {
     try{
   const {data}=await api.get("/api/auth/logout")
   console.log("Logout successful:", data)
     }catch{
   console.error("Error occurred while logging out:")
     }
}

export default logOut
