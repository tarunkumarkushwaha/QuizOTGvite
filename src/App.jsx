import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { Context } from "./MyContext";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import Home from './routes/Home';
import About from './routes/About';
import Contact from './routes/Contact';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Testsetting from './routes/Testsetting';
import Result from './routes/Result';
import Termsandconditions from "./routes/Termsandconditions";
import Discussions from './routes/Discussions';
import Test from "./routes/Test";
import CustomTest from "./routes/CustomTest";
import Navbar from "./components/Navbar";
import Foot from "./components/Foot";
import ErrorPage from "./components/ErrorPage";
import QuizManager from "./routes/ManageQuestions";
import LoadingSpinner from "./components/LoadingSpinner";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [testSub, settestSub] = useState("javascript")
  const [min, setmin] = useState(10)
  const [TestQuestion, setTestQuestion] = useState()
  const [dark, setdark] = useState(false)
  const [userName, setuserName] = useState("")
  const [CustomQuestions, setCustomQuestions] = useState([]);
  const [correctresponse, setcorrectresponse] = useState(0)
  const [incorrectresponse, setincorrectresponse] = useState(0)
  const [pastpercentage, setpastpercentage] = useState(0)
  const [start, setstart] = useState(false)
  const [loading, setLoading] = useState(true);

  // const backendURL = "http://localhost:3000"
  const backendURL = "https://quiztimequestionapi.onrender.com"

  useEffect(() => {
    const refresh = async () => {
      try {
        // setLoading(true)
        const res = await fetch(`${backendURL}/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) {
          console.log("No valid refresh token (new user)");
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
    let res = await fetch(backendURL + url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      credentials: "include",
    });

    if (res.status === 401) {
      // refresh token
      const refreshRes = await fetch(`${backendURL}/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (refreshRes.ok) {
        const { accessToken: newToken } = await refreshRes.json();
        setAccessToken(newToken);

        // retry request with new token
        res = await fetch(backendURL + url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newToken}`,
          },
          credentials: "include",
        });
      }
    }

    return res;
  };

  const themeChange = () => {
    dark ? localStorage.setItem('Theme', JSON.stringify(false)) : localStorage.setItem('Theme', JSON.stringify(true));
    setdark(prevtheme => !prevtheme)
  }

  useEffect(() => {
    const QUESTION = localStorage.getItem('questions');
    const THEME = localStorage.getItem('Theme');
    const PERCENT = localStorage.getItem('result');
    if (THEME) {
      setdark(JSON.parse(THEME));
    }
    if (QUESTION) {
      setTestQuestion(JSON.parse(QUESTION));
    }
    if (PERCENT) {
      setpastpercentage(JSON.parse(PERCENT));
    }
  }, []);

  // useEffect(() => {
  //   const savedToken = localStorage.getItem("accessToken");
  //   if (savedToken) setAccessToken(savedToken);
  // }, []);

  // useEffect(() => {
  //   if (accessToken) localStorage.setItem("accessToken", accessToken);
  // }, [accessToken]);

  return (
    <>
      <Context.Provider value={{
        accessToken, authFetch, setAccessToken,
        start, setstart, userName, setuserName, backendURL,
        TestQuestion, setTestQuestion, min, setmin,
        pastpercentage, loading, setLoading,
        dark, themeChange,
        correctresponse, setcorrectresponse, setincorrectresponse,
        incorrectresponse, CustomQuestions, setCustomQuestions,
        testSub, settestSub
      }}>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testsetting" element={<ProtectedRoute><Testsetting /></ProtectedRoute>} />
            <Route path="/test" element={<ProtectedRoute><Test /></ProtectedRoute>} />
            <Route path="/managequestions" element={<ProtectedRoute><QuizManager /></ProtectedRoute>} />
            <Route path="/customtest" element={<ProtectedRoute><CustomTest /></ProtectedRoute>} />
            <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/signup" element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            } />
            <Route path="/termsandconditions" element={<Termsandconditions />} />
            <Route path="/discussions" element={<ProtectedRoute><Discussions /></ProtectedRoute>} />
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
  )
}

export default App
