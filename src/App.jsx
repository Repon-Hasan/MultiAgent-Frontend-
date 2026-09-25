import { signInWithPopup } from "firebase/auth"
import { auth, googleProvide } from "../utils/firebase"
import api from "../utils/axios"


function App() {
  const handleLOgin=async (token)=>{
        try {
           const {data}=await api.post("/auth/login",{token})
           console.log("Data",data)
        } catch (error) {
          console.log(error)
        }             
  }
  const googleLogin=async()=>{
     const data=await signInWithPopup(auth,googleProvide)
     const token=await data.user.getIdToken()
     console.log("Token",token)
     await handleLOgin(token)
     console.log(data)
  }

  return (
    <div className="w-full h-screen bg-black  flex items-center justify-center">
      <button className="w-50 h-24 bg-white flex items-center justify-center" onClick={googleLogin}>continue with google</button>
    </div>
  )
}

export default App
