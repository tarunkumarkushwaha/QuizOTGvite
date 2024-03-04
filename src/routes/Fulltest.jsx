import Navbar from "../components/Navbar.jsx"
import SingleQuestion from "../components/SingleQuestion.jsx"
import Timer from "../components/Timer.jsx"
// import questions from "../questions/questions.js"
import { toast } from "react-toastify"
import Foot from "../components/Foot.jsx"
import { useRef, useState } from "react"
import { useContext } from 'react';
import { Context } from '../MyContext';
import { useNavigate } from "react-router-dom"

const Fulltest = () => {
  const [questionNo, setquestionNo] = useState(0)
  const [response, setresponse] = useState("")
  const [disabled, setdisabled] = useState(false)
  const {setincorrectresponse, setcorrectresponse, Questions } = useContext(Context);

  let navigate = useNavigate()

  const { dark } = useContext(Context);
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
    setdisabled(true)
    if (Questions[questionNo].correctresponse == response) {
      responseCheck()
      currentsong.current.play()
      toast.success("correct")
    }
    else {
      responseCross()
      currentsong2.current.play()
      toast.error("apka jawap galat hai")
    }
  }

  const yourNext = () => {
    setdisabled(false)
    if (response != Questions[questionNo].correctresponse) {
      response == "" ? questionNo <= Questions.length - 1 && toast.warn("no response submitted") : questionNo <= Questions.length - 1 && responseCross();
    }
    else if (Questions[questionNo].correctresponse == response) {
      responseCheck()
    }
    else { toast.error("some error occured") }
    questionNo <= Questions.length - 1 ?  toast.warn("it is last question") : setquestionNo((prev)=>{return prev + 1 })
  }

  // console.log("log",Questions[questionNo],questionNo)

  const finalSubmit = () => {
    if (response != Questions[questionNo].correctresponse) {
      response == "" ? toast.warn("blank response") : responseCross();
    }
    else if (Questions[questionNo].correctresponse == response) {
      responseCheck()
    }
    else { toast.error("some error occured") }
    toast.success("test submitted successfully")
    navigate("/result")
  }

  // useEffect(() => {
  //   setquestion()
  // }, [])
  

  return (
    <>
      <Navbar />
      <audio src={trueSound} loop={false} ref={currentsong} crossOrigin={'anonymous'}></audio>
      <audio src={falseSound} loop={false} ref={currentsong2} crossOrigin={'anonymous'}></audio>
      <div className={`${style.ui} h-[87vh] flex justify-center items-center p-10 flex-col`}>
        <Timer />
        <SingleQuestion question={Questions[questionNo]} disabled={disabled} response={response} setresponse={setresponse} />
        <div className="flex">
          <button type="button" onClick={yourNext} className="h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
            Next
          </button>
          <button type="button" onClick={checkAns} className="h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
            check
          </button>
          <button type="button" onClick={finalSubmit} className="h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
            Final Submit
          </button>
        </div>
      </div>
      <Foot />
    </>
  )
}

export default Fulltest