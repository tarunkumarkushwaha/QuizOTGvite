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

import { ref, set, get, child } from "firebase/database";
import { auth, database } from "../api/firebase";

function App() {
  const [user, setUser] = useState(null);
  const [data, setdata] = useState()
  const [testSub, settestSub] = useState("javascript")
  const [min, setmin] = useState(10)
  const [TestQuestion, setTestQuestion] = useState()
  const [dark, setdark] = useState(false)
  const [signIn, setsignIn] = useState(false)
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [pwd, setPwd] = useState("");
  const [CustomQuestions, setCustomQuestions] = useState([]);
  const [correctresponse, setcorrectresponse] = useState(0)
  const [incorrectresponse, setincorrectresponse] = useState(0)
  const [pastpercentage, setpastpercentage] = useState(0)
  const [start, setstart] = useState(false)

  // console.log(user)

  const themeChange = () => {
    dark ? localStorage.setItem('Theme', JSON.stringify(false)) : localStorage.setItem('Theme', JSON.stringify(true));
    setdark(prevtheme => !prevtheme)
  }

  async function getdbQuestions() {
    // console.log("i m called");
    const dbRef = ref(database);
    get(child(dbRef, `questions`)).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        setdata(snapshot.val())
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  function setdbCustomQuestions() {
    const db = database;
    set(ref(db, 'questions/wordpress'),
      wordpress
    ).then(() => {
      console.log("data sent");
    })
      .catch((error) => {
        console.log("The write failed...", error);
      })
  }

  // function discussionPost(post) {
  //   const db = database;
  //   set(ref(db, `discussion/${testSub}`), 
  //   post
  //   ).then(() => {
  //     console.log("data sent");
  //   })
  //     .catch((error) => {
  //       console.log("The write failed...");
  //     })
  // }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setsignIn(true)
      } else {
        setsignIn(false)
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!data) {
      getdbQuestions()
    }
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

  return (
    <>
      <Context.Provider value={{
        email, setemail,
        start, setstart, setdbCustomQuestions, getdbQuestions, data,
        TestQuestion, setTestQuestion, min, setmin,
        name, setName, pwd, pastpercentage, user,
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
      </Context.Provider>
    </>
  )
}

export default App
