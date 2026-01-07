import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect } from 'react';
import { Context } from '../MyContext';

const Result = () => {
  const { TestQuestion, responses, dark, accessToken, pastresult, setpastresult, testSub } = useContext(Context);
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

  const correctresponse = responses?.filter(item => item.marks == true).length
  const incorrectresponse = responses?.filter(item => item.marks == false).length
  const questionlength = TestQuestion ? TestQuestion?.length : 10
  const percentage = correctresponse / questionlength * 100
  const pastpercentage = (pastresult?.correctresponse / pastresult?.questionlength) * 100

  return (
    <>
      {accessToken ? (
        <div className={`${style.ui} ${style.text} min-h-screen mt-16 flex items-center justify-center px-4`}>

          <div className="smooth-entry w-full max-w-xl rounded-2xl 
      bg-white/10 backdrop-blur-xl border border-white/10 
      shadow-2xl shadow-black/40 p-8">


            <h1 className="text-center text-3xl font-extrabold text-emerald-400 mb-2">
              Test Result
            </h1>
            <p className="text-center text-sm mb-8">
              Here’s a summary of your performance
            </p>

            {/* Stats */}
            <div className="space-y-4 text-sm sm:text-base">
              <div className="flex justify-between ">
                <span>Total Questions</span>
                <span className="font-semibold">{questionlength}</span>
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
                  {questionlength - (incorrectresponse + correctresponse)}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-sky-400 text-lg">
                <span>Percentage</span>
                <span className="font-bold">
                  {Number(Math.round(percentage + "e2") + "e-2")}%
                </span>
              </div>

              {Object.keys(pastresult).length !== 0 && <>
                <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-sky-400 text-lg">
                  <span>Past Percentage</span>
                  <span className="font-semibold">
                    {Number(Math.round(pastpercentage + "e2") + "e-2")}% on {pastresult.subject}
                  </span>
                </div>
                {/* <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-sky-400 text-lg">
                  <span>Past Subject</span>
                  <span className="font-bold">
                    {pastresult.subject}
                  </span>
                </div> */}
              </>}
            </div>


            <div className="mt-10 flex justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setpastresult({ questionlength: TestQuestion?.length, correctresponse, subject: testSub })
                  navigate("/testsetting")
                }}
                className="px-8 py-3 rounded-xl text-sm font-semibold text-white
            bg-gradient-to-r from-green-400 to-blue-600
            shadow-lg shadow-blue-500/30
            transition-all duration-300
            hover:shadow-blue-500/50 hover:-translate-y-0.5
            active:scale-95"
              >
                Restart Test
              </button>

            </div>

            {/* Question Review */}
            <div className="mt-10 border-t border-white/10 pt-8">
              <h2 className="text-xl font-bold text-slate-200 mb-6 text-center">
                Question Review
              </h2>

              <div className="space-y-5 max-h-[400px] overflow-y-auto pr-2">
                {responses.map((item, index) => {
                  const { question, marks, yourAnswer } = item;

                  return (
                    <div
                      key={index}
                      className={`rounded-xl p-5 border 
            ${marks
                          ? "bg-green-500/10 border-green-500/30"
                          : "bg-red-500/10 border-red-500/30"
                        }`}
                    >
                      {/* Header */}
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-slate-100 text-sm md:text-base">
                          Q{index + 1}. {question.question}
                        </h3>

                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full
                ${marks
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                            }`}
                        >
                          {marks ? "Correct" : "Wrong"}
                        </span>
                      </div>

                      {/* Answers */}
                      <div className="text-sm space-y-2">
                        <p className="text-slate-300">
                          <span className="font-medium text-slate-400">Your Answer:</span>{" "}
                          <span className={marks ? "text-green-400" : "text-red-400"}>
                            {yourAnswer || "Not Attempted"}
                          </span>
                        </p>

                        {!marks && (
                          <p className="text-slate-300">
                            <span className="font-medium text-slate-400">
                              Correct Answer:
                            </span>{" "}
                            <span className="text-green-400">
                              {question.correctresponse}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}

              </div>


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