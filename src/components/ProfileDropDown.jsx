import React, { useState, useRef, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown({ user, onLogout, themeChange, dark }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    setIsOpen(false);
    navigate("/profile");
  };

  const handleLogoutClick = () => {
    setIsOpen(false);
    if (onLogout) onLogout();
  };

  // console.log(user,"data")

  const profilePic = user?.profile?.profilePic;
  const displayName =
    user?.profile?.displayName || user?.user?.username || "User";
  const email = user?.profile?.email;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 p-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-500/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        aria-label="User menu"
      >
        {profilePic ? (
          <img
            src={profilePic}
            alt={displayName}
            className="w-9 h-9 rounded-full object-cover border border-slate-700 shadow-sm"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
            <AccountCircleIcon style={{ fontSize: "1.8rem" }} />
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl backdrop-blur-xl z-50 py-2 divide-y divide-white/5 text-slate-200 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-4 py-2.5">
            <p className="text-sm text-center font-semibold text-white truncate">
              {displayName}
            </p>
            {/* {email && (
              <p className="text-xs text-slate-400 truncate mt-0.5">{email}</p>
            )} */}
          </div>

          <div className="py-1">
            <button
              onClick={themeChange}
              className="w-full flex items-center gap-3 px-2 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors text-left"
            >
              {dark ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  height="10"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <rect fill="none" height="24" width="24" />
                  <path
                    d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,
              0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1
              ,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,
              1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39
              ,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,
              1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  height="10"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <rect fill="none" height="24" width="24" />
                  <path d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z" />
                </svg>
              )}
              {!dark ? "Dark mode" : "Light mode"}
            </button>
          </div>
          <div className="py-1">
            <button
              onClick={handleProfileClick}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors text-left"
            >
              {user?.profile.profilePic ? (
                <img
                  src={profilePic}
                  alt={displayName}
                  className="w-4 h-4 rounded-full object-cover border border-slate-700 shadow-sm"
                />
              ) : (
                <PersonIcon fontSize="small" className="text-emerald-400" />
              )}
              View Profile
            </button>
          </div>
          <div className="py-1">
            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
            >
              <LogoutIcon fontSize="small" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
