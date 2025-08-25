import { Link, useNavigate } from "react-router-dom"
import { useContext } from 'react';
import { Context } from '../MyContext';
import { useRef } from "react";

const Result = () => {
  const { TestQuestion, correctresponse, incorrectresponse, dark, CustomQuestions, testSub, signIn } = useContext(Context);
  let navigate = useNavigate()
  const style = {
    ui: dark ?
      "bg-slate-700"
      :
      "bg-gradient-to-b from-green-50 to-green-200 ",
    text: dark ?
      "text-white"
      :
      "text-slate-900"
  }

  const questionlength = useRef(testSub !== "Your Questions" ? TestQuestion ? TestQuestion.length : 1 : CustomQuestions ? CustomQuestions.length : 1)
  const percentage = useRef((correctresponse / questionlength.current) * 100)
  //  console.log(percentage)
  return (
    <>
      {signIn ? (
        <div className={`${style.ui} h-screen ${style.text} flex justify-center items-center text-start p-10 flex-col`}>
          <h1 className="smooth-entry text-3xl text-green-500 font-sans">Result</h1>
          <div className="smooth-entry flex">
            Your Result
          </div>
          <div className="smooth-entry flex">
            Correct Responses - {correctresponse}
          </div>
          <div className="smooth-entry flex">
            Incorrect Responses - {incorrectresponse}
          </div>
          <div className="smooth-entry flex">
            Unattempted Questions - {questionlength.current - (incorrectresponse + correctresponse)}
          </div>
          <div className="smooth-entry flex">
            Total Questions - {questionlength.current}
          </div>
          <div className="smooth-entry flex">
            Percentage - {Number(Math.round(percentage.current + 'e2') + 'e-2')} %
          </div>
          <div className="smooth-entry flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/testsetting")}
              className="h-10 m-[5%] text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
            >
              Restart
            </button>
            <button
              type="button"
              className="h-10 m-[5%] text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
            >
              <Link to={"/discussions"}>Discussions</Link>
            </button>
          </div>
        </div>
      ) : (
        <div className="mainbg bg-no-repeat bg-left min-h-[87vh] flex justify-between items-center p-10 flex-col">
          <h1 className="text-3xl smooth-entry text-lime-800 font-sans">Please Log In to Use the App</h1>
          <button
            type="button"
            className="smooth-entry h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            <Link to={"/login"}>Login</Link>
          </button>
        </div>
      )}

    </>
  )
}

export default Result