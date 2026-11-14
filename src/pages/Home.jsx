
// import { signInWithPopup, signOut } from "firebase/auth";
// import { auth, googleProvide } from "../../utils/firebase.js";
// import api from "../../utils/axios.js";
// import { FcGoogle } from "react-icons/fc";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserdata } from "../redux/userSlice.js";

import Sidebar from "../components/Sidebar.jsx";
import ChatArea from "../components/ChatArea.jsx";
import Artifact from "../components/Artifact.jsx";

function Home() {
  //const { userData } = useSelector((state) => state.user);
  // const dispatch = useDispatch();

  //console.log("userdata", userData);

  // Backend login
  // const handleLogin = async (token) => {
  //   try {
  //     const { data } = await api.post("/api/auth/login", { token });

  //     dispatch(setUserdata(data));

  //     console.log("Login successful:", data);

  //     return data;
  //   } catch (error) {
  //     console.error(
  //       "Login error:",
  //       error.response?.data || error.message
  //     );

  //     return null;
  //   }
  // };

  // Google authentication
  // const googleLogin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvide);

  //     const token = await result.user.getIdToken();

  //     const data = await handleLogin(token);

  //     // If backend login fails, clean up Firebase authentication
  //     if (!data) {
  //       await signOut(auth);
  //     }
  //   } catch (error) {
  //     console.error("Google login error:", error.message);
  //   }
  // };

  // // Logout
  // const handleLogout = async () => {
  //   try {
  //     await api.post("/api/auth/logout");
  //   } catch (error) {
  //     console.error(
  //       "Backend logout error:",
  //       error.response?.data || error.message
  //     );
  //   } finally {
  //     try {
  //       await signOut(auth);
  //     } catch (error) {
  //       console.error("Firebase logout error:", error.message);
  //     }

  //     // Clear Redux user state
  //     dispatch(setUserdata(null));
  //   }
  // };

  return (
    <div className="relative h-screen w-full flex bg-[#0d0f14] text-white overflow-hidden">

      {/* Main Application Layout */}
      <Sidebar />

      <main className="flex-1 min-w-0 h-full overflow-hidden">
        <ChatArea />
      </main>

      <section className="shrink-0 h-full">
        <Artifact />
      </section>

      {/* User Profile - Visible after login */}
      {/* {userData && (
        <div className="fixed top-3 right-3 z-40 flex items-center gap-3 rounded-xl border border-white/10 bg-[#13151c] p-2 shadow-lg">

          {userData.avatar && (
            <img
              src={userData.avatar}
              alt="User avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          )}

          <div className="min-w-0 max-w-[130px]">
            <p className="text-sm font-medium text-slate-100 truncate">
              {userData.name || "User"}
            </p>

            <p className="text-xs text-slate-500 truncate">
              {userData.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-lg border border-red-500/20 bg-red-500/10 text-xs font-medium text-red-300 hover:bg-red-500/20 transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      )} */}

      {/* Login Modal - Only visible when logged out */}
      {/* {!userData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">

          <div className="w-[340px] max-w-[90vw] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5 shadow-2xl">

            <div className="flex flex-col gap-1">
              <h2 className="text-[17px] font-semibold text-slate-100 tracking-tight">
                Welcome to CortexAi
              </h2>

              <p className="text-[13px] text-slate-500">
                Please login to continue using the app
              </p>
            </div>

            <button
              onClick={googleLogin}
              className="w-full h-11 flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] text-sm font-medium text-slate-200 transition-all duration-200 hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.98] cursor-pointer"
            >
              <FcGoogle size={18} />

              <span>Continue with Google</span>
            </button>

          </div>
        </div>
      )} */}

    </div>
  );
}

export default Home;
