import { Link, useNavigate } from "react-router-dom"
import { useContext } from 'react';
import { Context } from '../MyContext';
import { useRef } from "react";

const Result = () => {
  const { TestQuestion, correctresponse, incorrectresponse, dark, CustomQuestions, testSub, accessToken } = useContext(Context);
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
      {accessToken ? (
        <div className={`${style.ui} ${style.text} min-h-screen flex items-center justify-center px-4`}>

          <div className="smooth-entry w-full max-w-xl rounded-2xl 
      bg-white/10 backdrop-blur-xl border border-white/10 
      shadow-2xl shadow-black/40 p-8">


            <h1 className="text-center text-3xl font-extrabold text-emerald-400 mb-2">
              Test Result
            </h1>
            <p className="text-center text-slate-300 text-sm mb-8">
              Here’s a summary of your performance
            </p>

            {/* Stats */}
            <div className="space-y-4 text-sm sm:text-base">
              <div className="flex justify-between text-slate-200">
                <span>Total Questions</span>
                <span className="font-semibold">{questionlength.current}</span>
              </div>

              <div className="flex justify-between text-emerald-400">
                <span>Correct Responses</span>
                <span className="font-semibold">{correctresponse}</span>
              </div>

              <div className="flex justify-between text-red-400">
                <span>Incorrect Responses</span>
                <span className="font-semibold">{incorrectresponse}</span>
              </div>

              <div className="flex justify-between text-yellow-400">
                <span>Unattempted Questions</span>
                <span className="font-semibold">
                  {questionlength.current - (incorrectresponse + correctresponse)}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-sky-400 text-lg">
                <span>Percentage</span>
                <span className="font-bold">
                  {Number(Math.round(percentage.current + "e2") + "e-2")}%
                </span>
              </div>
            </div>


            <div className="mt-10 flex justify-center gap-4">
              <button
                type="button"
                onClick={() => navigate("/testsetting")}
                className="px-8 py-3 rounded-xl text-sm font-semibold text-white
            bg-gradient-to-r from-green-400 to-blue-600
            shadow-lg shadow-blue-500/30
            transition-all duration-300
            hover:shadow-blue-500/50 hover:-translate-y-0.5
            active:scale-95"
              >
                Restart Test
              </button>

              {/* under construction discussion forum  */}
              {/* <button
          type="button"
          className="px-8 py-3 rounded-xl text-sm font-semibold text-white
            bg-gradient-to-r from-green-400 to-blue-600
            shadow-lg shadow-blue-500/30
            transition-all duration-300
            hover:shadow-blue-500/50 hover:-translate-y-0.5
            active:scale-95"
        >
          <Link to={"/discussions"}>Discussions</Link>
        </button> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="mainbg bg-no-repeat bg-left min-h-[87vh] flex items-center justify-center px-4">
          <div className="smooth-entry text-center rounded-2xl 
      bg-white/10 backdrop-blur-xl border border-white/10 
      shadow-2xl shadow-black/40 p-8 max-w-md">

            <h1 className="text-2xl font-bold text-slate-200 mb-6">
              Please log in to view results
            </h1>

            <Link
              to="/login"
              className="inline-block px-8 py-3 rounded-xl text-sm font-semibold text-white
          bg-gradient-to-r from-green-400 to-blue-600
          shadow-lg shadow-blue-500/30
          transition-all duration-300
          hover:shadow-blue-500/50 hover:-translate-y-0.5
          active:scale-95"
            >
              Login
            </Link>
          </div>
        </div>
      )}


    </>
  )
}

export default Result