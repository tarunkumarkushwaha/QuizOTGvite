import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Context } from "./MyContext";
import { useEffect, useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";

import Home from "./routes/Home";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Testsetting from "./routes/Testsetting";
import Result from "./routes/Result";
import Termsandconditions from "./routes/Termsandconditions";
import Discussions from "./routes/Discussions";
import Test from "./routes/Test";
import Navbar from "./components/Navbar";
import Foot from "./components/Foot";
import ErrorPage from "./components/ErrorPage";
import QuizManager from "./routes/ManageQuestions";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import Leaderboard from "./routes/LeaderBoard";
import Interview from "./routes/Interview";
import ProfileApiTester from "./routes/ProfileApiTester";
import Profile from "./routes/Profile";
import ProfileUpdate from "./routes/ProfileUpdate";

let sharedRefreshPromise = null;

function App() {
  const [user, setuser] = useState(null);
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("accessToken") || null;
  });
  const [testSub, settestSub] = useState("javascript");
  const [min, setmin] = useState(10);
  const [timeLeft, setTimeLeft] = useState(10);
  const [TestQuestion, setTestQuestion] = useState();
  const [dark, setdark] = useState(true);
  const [userName, setuserName] = useState("");
  const [CustomQuestions, setCustomQuestions] = useState([]);
  const [InterviewQuestions, setInterviewQuestions] = useState([]);
  const [responses, setresponses] = useState([]);
  const [pastresult, setpastresult] = useState({});
  const [start, setstart] = useState(false);
  const [loading, setLoading] = useState(true);

  const accessTokenRef = useRef(accessToken);
  const backendURL = "https://quiztimequestionapi.onrender.com";
  // const backendURL = "http://localhost:3000";

  useEffect(() => {
    accessTokenRef.current = accessToken;
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const silentRefresh = async () => {
      try {
        const res = await fetch(`${backendURL}/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            handleLogout();
            toast.warn("Session expired. Please login again.");
          }
          return;
        }

        const data = await res.json();
        if (data?.accessToken) {
          updateAuth(data.accessToken);
        }
      } catch (err) {
        console.error(
          "Background refresh error (network down or server asleep):",
          err,
        );
      } finally {
        setLoading(false);
      }
    };

    silentRefresh();

    const interval = setInterval(silentRefresh, 14 * 60 * 1000);
    return () => clearInterval(interval);
  }, [accessToken]);

  const updateAuth = (newToken) => {
    accessTokenRef.current = newToken;
    setAccessToken(newToken);
    localStorage.setItem("accessToken", newToken);
  };

  const handleLogout = () => {
    accessTokenRef.current = null;
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  const authFetch = async (url, options = {}) => {
    let token = accessTokenRef.current;

    const makeRequest = async (currentToken) => {
      return fetch(backendURL + url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: currentToken ? `Bearer ${currentToken}` : "",
        },
        credentials: "include",
      });
    };

    let res = await makeRequest(token);

    if (res.status !== 401) {
      return res;
    }

    try {
      if (!sharedRefreshPromise) {
        sharedRefreshPromise = fetch(`${backendURL}/refresh`, {
          method: "POST",
          credentials: "include",
        })
          .then(async (r) => {
            if (!r.ok) throw new Error(`Refresh HTTP Error: ${r.status}`);
            const data = await r.json();
            if (!data?.accessToken) throw new Error("No token returned");
            return data.accessToken;
          })
          .finally(() => {
            sharedRefreshPromise = null;
          });
      }

      const newToken = await sharedRefreshPromise;
      updateAuth(newToken);

      return await makeRequest(newToken);
    } catch (err) {
      console.error("Intercepted Auth refresh failed completely:", err);
      handleLogout();
      return res;
    }
  };

  const themeChange = () => {
    const nextDark = !dark;
    localStorage.setItem("Theme", JSON.stringify(nextDark));
    setdark(nextDark);
  };

  useEffect(() => {
    const THEME = localStorage.getItem("Theme");
    const PERCENT = localStorage.getItem("result");
    if (THEME) setdark(JSON.parse(THEME));
    if (PERCENT) setpastresult(JSON.parse(PERCENT));
  }, []);

useEffect(() => {
  // no token get out you idiot 
  if (!accessToken) return;

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${backendURL}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch profile: ${res.statusText}`);
      }

      const data = await res.json();
      setuser(data);
    } catch (error) {
      console.error("Profile fetch error:", error);
      setuser(null); 
    }
  };

  fetchProfile();
}, [accessToken, backendURL]);

  return (
    <>
      <Context.Provider
        value={{
          user,
          accessToken,
          authFetch,
          setAccessToken,
          start,
          setstart,
          userName,
          setuserName,
          backendURL,
          TestQuestion,
          setTestQuestion,
          min,
          setmin,
          pastresult,
          loading,
          setLoading,
          setpastresult,
          dark,
          themeChange,
          responses,
          setresponses,
          CustomQuestions,
          setCustomQuestions,
          testSub,
          settestSub,
          timeLeft,
          setTimeLeft,
          InterviewQuestions,
          setInterviewQuestions,
          handleLogout,
        }}
      >
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/testsetting"
              element={
                <ProtectedRoute>
                  <Testsetting />
                </ProtectedRoute>
              }
            />
            <Route
              path="/test"
              element={
                <ProtectedRoute>
                  <Test />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interview"
              element={
                <ProtectedRoute>
                  <Interview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/managequestions"
              element={
                <ProtectedRoute>
                  <QuizManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/result"
              element={
                <ProtectedRoute>
                  <Result />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="/termsandconditions"
              element={<Termsandconditions />}
            />
            <Route
              path="/discussions"
              element={
                <ProtectedRoute>
                  <Discussions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile-api-test"
              element={
                <ProtectedRoute>
                  <ProfileApiTester />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profileupdate"
              element={
                <ProtectedRoute>
                  <ProfileUpdate/>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Foot />
        </BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
      </Context.Provider>
    </>
  );
}

export default App;
