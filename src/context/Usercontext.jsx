import React from 'react'
import { Context } from '../MyContext';
import { useEffect, useState } from "react";
import Javascriptquestion from '../questions/Javascriptquestions.js'
import CSSquestion from '../questions/CSSquestion.js'
import htmlquestion from '../questions/htmlquestions.js'
import Reactquestion from '../questions/Reactquestions.js'
import PleaseLogin from "../components/PleaseLogin.jsx";
const Usercontext = ({ children }) => {
    const [testSub, settestSub] = useState("Javascript")
    const [min, setmin] = useState(10)
    const [TestQuestion, setTestQuestion] = useState(Javascriptquestion.Javascript)
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
    return (
        <Context.Provider value={{
            start, setstart,
            TestQuestion, setTestQuestion, min, setmin,
            name, setName, pwd, pastpercentage,
            setPwd, signIn, setsignIn, dark, themeChange,
            correctresponse, setcorrectresponse, setincorrectresponse,
            incorrectresponse, CustomQuestions, setCustomQuestions,
            testSub, settestSub
        }}>
            { children }

        </Context.Provider>
    )
}

export default Usercontext