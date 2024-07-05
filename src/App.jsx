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

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getFirestore } from "firebase/firestore";

function App() {
  const [data, setdata] = useState()
  const [testSub, settestSub] = useState("javascript")
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

  // firebase 

  const firebaseConfig = {
    apiKey: "AIzaSyB4bf4q5bhq_x8rttlQWpgQhMmdgbwjdwg",
    authDomain: "quizotg-tarun.firebaseapp.com",
    projectId: "quizotg-tarun",
    storageBucket: "quizotg-tarun.appspot.com",
    messagingSenderId: "692133132591",
    appId: "1:692133132591:web:a25a3ccf74cd828c04c9da",
    measurementId: "G-0XNKZT4FP2",
    databaseURL: "https://quizotg-tarun-default-rtdb.firebaseio.com/",
  };

  // Initialize Firebase

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const db = getFirestore(app);

  // Get a list of cities from your database
  async function getdbQuestions() {
    // console.log("i m called");
    const dbRef = ref(getDatabase());
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

  const database = getDatabase(app);

  // console.log(data);

  function setdbCustomQuestions() {
    const db = getDatabase();
    set(ref(db, 'questions/wordpress'), 
    wordpress
    ).then(() => {
      console.log("data sent");
    })
      .catch((error) => {
        console.log("The write failed...");
      })
  }

  useEffect(() => {
    if (!data) {
      getdbQuestions()
    }
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

  return (
    <>
      {/* <Usercontext> */}
      <Context.Provider value={{
        start, setstart, setdbCustomQuestions, getdbQuestions, data,
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
