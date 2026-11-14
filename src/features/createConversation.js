import api from "../../utils/axios"

export const createConversation=async()=>{
    try{
        const {data}=await api.post("/api/chat/create-conversation")
        console.log("Conversation created:", data)
        return data
    }catch(error){
        console.error("Error creating conversation:", error)
        throw error
    }
}

// export const getConversations=async()=>{
//     try{
//         const {data}=await api.get("/api/chat/get-conversations")
//         console.log("Conversations retrieved:", data)
//         return data
//     }catch(error){
//         console.error("Error retrieving conversations:", error)
//         throw error
//     }
// }
