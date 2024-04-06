import { Link } from "react-router-dom"
import Foot from "../components/Foot"
import Navbar from "../components/Navbar"
import { useContext } from 'react';
import { Context } from '../MyContext';
import { useRef } from "react";

const Result = () => {
  const { TestQuestion, correctresponse, incorrectresponse, dark, CustomQuestions, testSub, signIn } = useContext(Context);

  const style = {
    ui: dark ?
      "bg-slate-700"
      :
      "bg-gradient-to-b from-green-50 to-green-200 "
  }

  const questionlength = useRef(testSub !== "Your Questions" ? TestQuestion.length : CustomQuestions.length)
  const percentage = useRef((correctresponse / questionlength.current) * 100)

  return (
    <>
      <Navbar />
      {signIn ? <div className={`${style.ui} h-[87vh] flex justify-center items-center p-10 flex-col`}>

        <h1 className="text-3xl text-lime-500 font-sans">Result</h1>
        <div className="flex">
          your result
        </div>
        <div className="flex">
          correct responses - {correctresponse}
        </div>
        <div className="flex">
          incorrect responses - {incorrectresponse}
        </div>
        <div className="flex">
          unattemped question - {questionlength.current - (incorrectresponse + correctresponse)}
        </div>
        <div className="flex">
          total question - {questionlength.current}
        </div>
        <div className="flex">
          Percentage - {Number(Math.round(percentage.current + 'e2') + 'e-2')} %
        </div>
        <div className="flex justify-between">
          <button type="button" className="h-10 m-[5%] text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
            <Link to={"/discussions"}>discussions</Link>
          </button>
        </div>
      </div> : <><div className="mainbg bg-no-repeat bg-left min-h-[87vh] flex justify-between items-center p-10 flex-col">
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

export default Result