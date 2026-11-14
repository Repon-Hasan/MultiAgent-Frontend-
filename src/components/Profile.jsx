
import { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvide } from "../../utils/firebase.js";
import api from "../../utils/axios.js";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setUserdata } from "../redux/userSlice.js";
import { LogOut, UserRound } from "lucide-react";
import { setConversations } from "../redux/conversationSlice.js";

function Profile({ collapsed }) {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // Backend login
  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/api/auth/login", { token });

      dispatch(setUserdata(data));

      console.log("Login successful:", data);

      return data;
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data || error.message
      );

      return null;
    }
  };

  // Google authentication
  const googleLogin = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvide);

      const token = await result.user.getIdToken();

      const data = await handleLogin(token);

      // Clean Firebase authentication if backend login fails
      if (!data) {
        await signOut(auth);
      }
    } catch (error) {
      console.error("Google login error:", error.message);

      try {
        await signOut(auth);
      } catch (signOutError) {
        console.error("Firebase cleanup error:", signOutError);
      }
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    if (loading) return;

    setLoading(true);

    try {
      await api.post("/api/auth/logout");
    } catch (error) {
      console.error(
        "Backend logout error:",
        error.response?.data || error.message
      );
    } finally {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Firebase logout error:", error.message);
      }

     // Clear Redux data
    dispatch(setUserdata(null));
    dispatch(setConversations([]));
      setLoading(false);
    }
  };

  return (
    <div className="w-full">

      {/* Logged In User */}
      {userData ? (
        <div
          className={`
            flex items-center
            ${collapsed ? "justify-center" : "gap-3 p-3"}
            rounded-xl
            bg-white/[0.04]
            border border-white/[0.06]
          `}
        >
          {/* User Avatar */}
          {userData.avatar ? (
            <img
              src={userData.avatar}
              alt="User avatar"
              className="w-9 h-9 shrink-0 rounded-full object-cover border border-white/10"
            />
          ) : (
            <div className="w-9 h-9 shrink-0 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <UserRound size={19} className="text-indigo-400" />
            </div>
          )}

          {/* User Information */}
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-100 truncate">
                  {userData.name || "User"}
                </p>

                <p className="text-xs text-slate-500 truncate">
                  {userData.email}
                </p>
              </div>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                title="Logout"
                className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer disabled:opacity-50"
              >
                <LogOut size={17} />
              </button>
            </>
          )}
        </div>
      ) : (
        /* Logged Out User */
        <button
          type="button"
          onClick={googleLogin}
          disabled={loading}
          title={collapsed ? "Continue with Google" : ""}
          className={`
            w-full flex items-center
            ${collapsed ? "justify-center" : "justify-center gap-3 px-3"}
            py-3 rounded-xl
            bg-white/[0.04]
            border border-white/[0.08]
            text-slate-300
            hover:bg-white/[0.08]
            hover:border-white/[0.15]
            transition-all duration-200
            cursor-pointer
            disabled:opacity-50
          `}
        >
          <FcGoogle size={19} />

          {!collapsed && (
            <span className="text-sm font-medium">
              {loading ? "Signing in..." : "Continue with Google"}
            </span>
          )}
        </button>
      )}
    </div>
  );
}

export default Profile;
