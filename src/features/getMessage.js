import api from "../../utils/axios";


async function getMessages(conversationId) {
 try{
   const {data}=await api.get(`/api/chat/get-messages/${conversationId}`);
   console.log("User Data",data)
   return data;
 }catch(error){
   console.error("Error fetching message:", error);
   throw error;
 }
}

export default getMessages
