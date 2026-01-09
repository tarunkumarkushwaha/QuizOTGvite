import SingleQuestion from "../components/SingleQuestion.jsx"
import Timer from "../components/Timer.jsx"
import { toast } from "react-toastify"
import { useEffect, useMemo, useRef, useState } from "react"
import { useContext } from 'react';
import { Context } from '../MyContext.js';
import { useNavigate, Link } from "react-router-dom"
import Timeover from "../components/Timeover.jsx"
import useWindowFocusDetector from "../customhooks/WindowFocusDetector.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";


const Test = () => {
  const [questionNO, setquestionNO] = useState(0)
  const [response, setresponse] = useState("")
  const [disabled, setdisabled] = useState(false)
  const [timeover, settimeover] = useState(false)

  const { timeLeft, accessToken,
    dark, TestQuestion, setresponses } = useContext(Context);

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
      setresponses(prev => [...prev, { question: TestQuestion[questionNO], marks: true, yourAnswer: response, timestamp: timeLeft }])
      currentsong.current?.play().catch(() => { });
      toast.success("correct")
    }
    else {
      setresponses(prev => [...prev, { question: TestQuestion[questionNO], marks: false, yourAnswer: response, timestamp: timeLeft }])
      currentsong2.current?.play().catch(() => { });
      toast.error("oops, Your answer is INCORRECT")
    }
    setdisabled(true)
  }

  const yourNext = () => {
    if (!disabled) {
      if (response === "") {
        setresponses(prev => [
          ...prev,
          {
            question: TestQuestion[questionNO],
            marks: null,
            yourAnswer: "",
            timestamp: timeLeft
          }
        ]);
      } else if (response === TestQuestion[questionNO].correctresponse) {
        setresponses(prev => [
          ...prev,
          {
            question: TestQuestion[questionNO],
            marks: true,
            yourAnswer: response,
            timestamp: timeLeft
          }
        ]);
      } else {
        setresponses(prev => [
          ...prev,
          {
            question: TestQuestion[questionNO],
            marks: false,
            yourAnswer: response,
            timestamp: timeLeft
          }
        ]);
      }
    }

    setdisabled(false);
    setresponse("");

    if (questionNO >= TestQuestion.length - 1) {
      toast.success("Test completed");
      navigate("/result");
      return;
    }

    setquestionNO(prev => prev + 1);
  };

  const finalSubmit = () => {
    if (!disabled && response !== "") {
      if (response != TestQuestion[questionNO].correctresponse) {
        response == "" ? toast.warn("no response submitted in previous question") :
          setresponses(prev => [...prev, { question: TestQuestion[questionNO], marks: false, yourAnswer: response, timestamp: timeLeft }])
      }
      else if (TestQuestion[questionNO].correctresponse == response) {
        setresponses(prev => [...prev, { question: TestQuestion[questionNO], marks: true, yourAnswer: response, timestamp: timeLeft }])
      }
    }
    toast.success("test submitted successfully")
    navigate("/result")
  }

  // anti cheat 

  const handleKeyPress = (event) => {
    // console.log('Key pressed:', event.key);
    navigate('/result')
    toast.error("early submission, BECAUSE, BOOOO... You tried to cheat")
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, []);

  const focus = useWindowFocusDetector()

  useEffect(() => {
    if (!focus) {
      navigate('/result')
      toast.error("Booo.... you are a cheater")
    }

  }, [focus])

  if (!TestQuestion?.length) {
    return (
      <LoadingSpinner />
    );
  }


  return (
    <>
      <Timer settimeover={settimeover} />
      <audio src={trueSound} loop={false} ref={currentsong} crossOrigin={'anonymous'}></audio>
      <audio src={falseSound} loop={false} ref={currentsong2} crossOrigin={'anonymous'}></audio>
      {accessToken ? timeover ? <Timeover style={style.ui} finalSubmit={finalSubmit} />
        :
        TestQuestion && (
          <div
            className={`${style.ui} min-h-screen smooth-entry 
    flex flex-col items-center justify-center 
    px-4 py-10 mt-14 gap-8`}
          >

            <div className="w-full max-w-3xl">
              <div className="flex justify-between items-center mb-2 text-sm text-slate-300">
                <span>
                  Question <span className="text-lime-400 font-semibold">
                    {questionNO + 1}
                  </span>{" "}
                  of {TestQuestion.length}
                </span>

                <span className="text-slate-400">
                  {Math.round(((questionNO + 1) / TestQuestion.length) * 100)}%
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-lime-400 to-green-500
          transition-all duration-500 ease-out"
                  style={{
                    width: `${((questionNO + 1) / TestQuestion.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <SingleQuestion
              question={TestQuestion[questionNO]}
              disabled={disabled}
              response={response}
              setresponse={setresponse}
              dark={dark}
            />

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

              <button
                type="button"
                onClick={yourNext}
                disabled={questionNO === TestQuestion.length - 1}
                className="px-6 py-2.5 rounded-xl font-semibold text-white
        bg-gradient-to-br from-sky-400 to-blue-600
        hover:from-sky-300 hover:to-blue-500
        transition-all duration-300 active:scale-95"
              >
                {questionNO === TestQuestion.length - 1 ? "Finish" : "Next"}
              </button>

              <button
                type="button"
                disabled={disabled}
                onClick={checkAns}
                className={`px-6 py-2.5 rounded-xl font-semibold text-white
        transition-all duration-300 active:scale-95
        ${disabled
                    ? "bg-white/20 cursor-not-allowed"
                    : "bg-gradient-to-br from-emerald-400 to-green-600 hover:from-emerald-300 hover:to-green-500"
                  }`}
              >
                Check Answer
              </button>

              <button
                type="button"
                onClick={finalSubmit}
                className="px-6 py-2.5 rounded-xl font-semibold text-white
        bg-gradient-to-br from-purple-500 to-pink-600
        hover:from-purple-400 hover:to-pink-500
        transition-all duration-300 active:scale-95"
              >
                Final Submit
              </button>

            </div>
          </div>
        )


        :

        <><div className="mainbg bg-no-repeat bg-left min-h-[87vh] flex justify-between items-center p-10 flex-col">
          <h1 className="text-3xl text-lime-800 font-sans">Please log in to use app</h1>
          <button type="button" className="h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            <Link to={"/login"}>login</Link>
          </button>
        </div></>
      }
    </>
  )
}

export default Test