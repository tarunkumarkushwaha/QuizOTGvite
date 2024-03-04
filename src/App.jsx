// import { useState } from 'react'
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
import Onebyone from "./routes/Onebyone";
import Fulltest from './routes/Fulltest';
import Result from './routes/Result';
import Termsandconditions from "./routes/Termsandconditions";
import Discussions from './routes/Discussions';

function App() {

  const [dark, setdark] = useState(false)
  const [signIn, setsignIn] = useState(false)
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [Questions, setQuestions] = useState([]);
  const [correctresponse, setcorrectresponse] = useState(0)
  const [incorrectresponse, setincorrectresponse] = useState(0)
  const [pastpercentage, setpastpercentage] = useState(0)

  const themeChange = () => {
    dark ? localStorage.setItem('Theme', JSON.stringify(false)) : localStorage.setItem('Theme', JSON.stringify(true));
    setdark(prevtheme => !prevtheme)
    // console.log(dark)
  }

  // console.log(signIn)

  // const responseCheck = () => {
  //   setcorrectresponse(prev => prev + 1)
  // }
  // const responseCross = () => {
  //   setincorrectresponse(prev => prev + 1)
  // }

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
      setQuestions(JSON.parse(QUESTION));
    }
    if (PERCENT) {
      setpastpercentage(JSON.parse(PERCENT));
    }
  }, []);

  return (
    <>
      <Context.Provider value={{
        name, setName, pwd, pastpercentage,
        setPwd, signIn, setsignIn, dark, themeChange,
        correctresponse, setcorrectresponse, setincorrectresponse,
        incorrectresponse, Questions, setQuestions
      }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testsetting" element={<Testsetting />} />
            <Route path="/onebyone" element={<Onebyone />} />
            <Route path="/fulltest" element={<Fulltest />} />
            <Route path="/result" element={<Result />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/termsandconditions" element={<Termsandconditions />} />
            {/* <Route path="/termsandcondition" element={<Termsandcondition />} /> */}
            <Route path="/discussions" element={<Discussions />} />
          </Routes>
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
