import api from "../../utils/axios"

export const getConversations=async()=>{
    try{
        const {data}=await api.get("/api/chat/get-conversations")
        console.log("Conversations retrieved:", data)
        return data
    }catch(error){
        console.error("Error retrieving conversations:", error)
        throw error
    }
}
