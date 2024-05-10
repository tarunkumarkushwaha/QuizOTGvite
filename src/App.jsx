import {
  BrowserRouter,
  Route,
  Routes
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
// import Usercontext from "./context/Usercontext";

function App() {
  const [testSub, settestSub] = useState("Javascript")
  const [min, setmin] = useState(10)
  const [TestQuestion, setTestQuestion] = useState()
  const [dark, setdark] = useState(false)
  const [signIn, setsignIn] = useState(false)
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [CustomQuestions, setCustomQuestions] = useState([]);
  const [correctresponse, setcorrectresponse] = useState(0)
  const [incorrectresponse, setincorrectresponse] = useState(0)
  const [pastpercentage, setpastpercentage] = useState(0)
  const [start, setstart] = useState(false)

  const themeChange = () => {
    dark ? localStorage.setItem('Theme', JSON.stringify(false)) : localStorage.setItem('Theme', JSON.stringify(true));
    setdark(prevtheme => !prevtheme)
  }

  useEffect(() => {
    const item1 = localStorage.getItem('Name');
    const item2 = localStorage.getItem('Password');
    const item3 = localStorage.getItem('login');
    const QUESTION = localStorage.getItem('questions');
    const THEME = localStorage.getItem('Theme');
    const PERCENT = localStorage.getItem('result');
    if (item1) {
      setName(JSON.parse(item1));
    }
    if (item2) {
      setPwd(JSON.parse(item2));
    }
    if (item3) {
      setsignIn(JSON.parse(item3));
    }
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
  //   fetch("/api/css").then(
  //     response => response.json()
  //   ).then(
  //     data => console.log(data)
  //   ).catch(error => console.log('Error fetching data:', error));
  // }, []);

  return (
    <>
      {/* <Usercontext> */}
      <Context.Provider value={{
        start, setstart,
        TestQuestion, setTestQuestion, min, setmin,
        name, setName, pwd, pastpercentage,
        setPwd, signIn, setsignIn, dark, themeChange,
        correctresponse, setcorrectresponse, setincorrectresponse,
        incorrectresponse, CustomQuestions, setCustomQuestions,
        testSub, settestSub
      }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testsetting" element={<Testsetting />} />
            <Route path="/test" element={<Test />} />
            <Route path="/customtest" element={<CustomTest />} />
            <Route path="/result" element={<Result />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/termsandconditions" element={<Termsandconditions />} />
            <Route path="/discussions" element={<Discussions />} />
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
        {/* </Usercontext> */}
      </Context.Provider>
    </>
  )
}

export default App
