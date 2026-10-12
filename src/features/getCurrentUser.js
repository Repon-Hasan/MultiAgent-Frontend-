import api from "../../utils/axios"

const getCurrentUser=async()=>{
    try {
        const {data}=await api.get("/api/me")
        console.log("UserData",data)
    } catch (error) {
         console.log("Status:", error.response?.status);
  console.log("Response:", error.response?.data);
    }
}

export default getCurrentUser 