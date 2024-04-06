import Navbar from "../components/Navbar.jsx"
import SingleQuestion from "../components/SingleQuestion.jsx"
import Timer from "../components/Timer.jsx"
import { toast } from "react-toastify"
import Foot from "../components/Foot.jsx"
import { useEffect, useMemo, useRef, useState } from "react"
import { useContext } from 'react';
import { Context } from '../MyContext.js';
import { useNavigate, Link } from "react-router-dom"
import Javascriptquestion from '../questions/Javascriptquestions.js'
import CSSquestion from '../questions/CSSquestion.js'
import htmlquestion from '../questions/htmlquestions.js'
import Reactquestion from '../questions/Reactquestions.js'


const Test = () => {
  const [questionNO, setquestionNO] = useState(0)
  const [response, setresponse] = useState("")
  const [disabled, setdisabled] = useState(false)
  const [timeover, settimeover] = useState(false)


  const { setincorrectresponse, setmin, min, setcorrectresponse, testSub, dark, signIn, TestQuestion, setTestQuestion } = useContext(Context);

  let navigate = useNavigate()
  const currentsong = useRef()
  const currentsong2 = useRef()

  // audios srcs 
  let trueSound = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_b8c9103636.mp3?filename=correct-83487.mp3";
  let falseSound = "https://cdn.pixabay.com/download/audio/2021/08/04/audio_c6ccf3232f.mp3?filename=negative_beeps-6008.mp3";
  // let timeover = "https://cdn.pixabay.com/download/audio/2022/03/10/audio_ad24b5e301.mp3?filename=bell-ringing-43862.mp3"


  const style = {
    ui: dark ?
      "bg-slate-700"
      :
      "bg-gradient-to-b from-green-50 to-green-200 "
  }

  const checkAns = () => {
    if (TestQuestion[questionNO].correctresponse == response) {
      setcorrectresponse(prev => prev + 1)
      currentsong.current.play()
      toast.success("correct")
    }
    else {
      setincorrectresponse(prev => prev + 1)
      currentsong2.current.play()
      toast.error("apka jawap galat hai")
    }
    setdisabled(true)
  }

  const yourNext = () => {
    if (disabled == false) {
      if (response != TestQuestion[questionNO].correctresponse) {
        response == "" ? toast.warn("no response submitted") : setincorrectresponse(prev => prev + 1);
      }
      else if (TestQuestion[questionNO].correctresponse == response) {
        setcorrectresponse(prev => prev + 1)
      }
      else { toast.error("some error occured") }
    }
    setdisabled(false)
    setresponse("")
    questionNO < TestQuestion.length - 1 ?
      setquestionNO((prevQues) => prevQues + 1)
      :
      toast.warn("it is last question")
  }

  const finalSubmit = () => {
    if (disabled == false) {
      if (response != TestQuestion[questionNO].correctresponse) {
        response == "" ? toast.warn("blank response") : setincorrectresponse(prev => prev + 1);
      }
      else if (TestQuestion[questionNO].correctresponse == response) {
        setcorrectresponse(prev => prev + 1)
      }
    }
    toast.success("test submitted successfully")
    navigate("/result")
  }

  useEffect(() => {
    if (testSub == "Javascript") { setTestQuestion(Javascriptquestion.Javascript) }
    else if (testSub == "CSS") { setTestQuestion(CSSquestion.CSS) }
    else if (testSub == "HTML") { setTestQuestion(htmlquestion.HTML) }
    else if (testSub == "React") { setTestQuestion(Reactquestion.React) }
  }, [testSub])

  return (
    <>
      <Navbar />
      <Timer min={min} settimeover={settimeover} setmin={setmin} />
      <audio src={trueSound} loop={false} ref={currentsong} crossOrigin={'anonymous'}></audio>
      <audio src={falseSound} loop={false} ref={currentsong2} crossOrigin={'anonymous'}></audio>
      {signIn ? timeover ? <div>timeover</div> :
        <div className={`${style.ui} h-[87vh] flex justify-center items-center p-10 flex-col`}>
          <SingleQuestion question={TestQuestion[questionNO]} disabled={disabled} response={response} setresponse={setresponse} />
          <div className="flex">
            <button type="button" onClick={yourNext} className="h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
              Next
            </button>
            <button type="button" disabled={disabled} onClick={checkAns} className="h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
              check
            </button>
            <button type="button" onClick={finalSubmit} className="h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
              Final Submit
            </button>
          </div>
        </div>

        :

        <><div className="mainbg bg-no-repeat bg-left min-h-[87vh] flex justify-between items-center p-10 flex-col">
          <h1 className="text-3xl text-lime-800 font-sans">Please log in to use app</h1>
          <button type="button" className="h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            <Link to={"/login"}>login</Link>
          </button>
        </div></>
      }
      <Foot />
    </>
  )
}

export default Test