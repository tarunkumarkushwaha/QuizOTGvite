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

function App() {
  const [accessToken, setAccessToken] = useState(null);
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

  const accessTokenRef = useRef(null);

  const backendURL = "http://localhost:3000";
  // const backendURL = "https://quiztimequestionapi.onrender.com"

  useEffect(() => {
    accessTokenRef.current = accessToken;
  }, [accessToken]);

  useEffect(() => {
    const refresh = async () => {
      try {
        // setLoading(true)
        const res = await fetch(`${backendURL}/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) {
          setLoading(false);
          if (accessToken) {
            toast.warn("Session expired. Please login again.");
          }
          return;
        }

        const data = await res.json();

        if (data?.accessToken) {
          setAccessToken(data.accessToken);
        } else {
          console.log("No refresh token, user not logged in");
        }
      } catch (err) {
        console.log("Error refreshing token:", err);
      } finally {
        setLoading(false);
      }
    };

    refresh();
  }, []);

  // wrapper fetch that handles auto refresh
  const authFetch = async (url, options = {}) => {
    let token = accessTokenRef.current;

    let res = await fetch(backendURL + url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
    });

    if (res.status === 401) {
      const refreshRes = await fetch(`${backendURL}/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!refreshRes.ok) {
        setAccessToken(null);
        return res;
      }

      const data = await refreshRes.json();

      if (!data?.accessToken) {
        setAccessToken(null);
        return res;
      }

      setAccessToken(data.accessToken);

      accessTokenRef.current = data.accessToken;

      res = await fetch(backendURL + url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${data.accessToken}`,
        },
        credentials: "include",
      });
    }

    return res;
  };

  const themeChange = () => {
    dark
      ? localStorage.setItem("Theme", JSON.stringify(false))
      : localStorage.setItem("Theme", JSON.stringify(true));
    setdark((prevtheme) => !prevtheme);
  };

  useEffect(() => {
    const THEME = localStorage.getItem("Theme");
    const PERCENT = localStorage.getItem("result");
    if (THEME) {
      setdark(JSON.parse(THEME));
    }
    if (PERCENT) {
      setpastresult(JSON.parse(PERCENT));
    }
  }, []);

  return (
    <>
      <Context.Provider
        value={{
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
