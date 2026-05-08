import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState, useRef } from 'react';
import { Context } from '../MyContext';
import { toast } from "react-toastify"
import PerformanceHistory from "../components/PerformanceHistory";
import { Score } from "@mui/icons-material";


const Result = () => {
  const { TestQuestion, responses, dark, accessToken, pastresult, setpastresult, testSub, min, timeLeft, backendURL, userName } = useContext(Context);
  const [explanations, setExplanations] = useState({});
  const [allresults, setallresults] = useState([])
  const [loadingExplain, setLoadingExplain] = useState(null);
  const [showtestHistory, setshowtestHistory] = useState(false);
  const hasPosted = useRef(false);
  let Score = useRef(0);

  useEffect(() => {
    const loadResults = async () => {
      if (!accessToken) return;
      try {
        // setLoading(true);
        // console.log("im o")
        const res = await fetch(`${backendURL}/results/result`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        setallresults(data || [])
        // console.log(data);
        // return data
      } catch (err) {
        console.error("Error loading questions", err);
        // setLoading(false);
      }
    };
    loadResults()
  }, []);


  useEffect(() => {
    if (hasPosted.current) return;
    hasPosted.current = true;

    const postresult = async () => {
      if (!accessToken) return;

      const subject = testSub;
      const time = Math.max(0, min * 60 - timeLeft);

      const totalQuestions = TestQuestion?.length || 1;
      const correctAnswers = responses?.filter(i => i.marks).length;

      /**
       * Calculates a weighted score out of 100
       * @param {number} correct - Total correct answers
       * @param {number} total - Total number of questions
       * @param {number} timeLeft - Remaining time in seconds
       * @param {number} totalTime - Initial total time in seconds
       * @returns {number} - Rounded score from 0-100
       */
      const calculateWeightedScore = (correct, total, timeLeft, totalTime) => {
        // 1. Prevent Division by Zero
        if (total === 0) return 0;

        // 2. Accuracy Component (80% of total score)
        const accuracyRatio = correct / total;
        const accuracyScore = accuracyRatio * 80;

        // 3. Time Component (20% of total score)
        // Ensure we don't get negative time or divide by zero
        const timeRatio = totalTime > 0 ? Math.max(0, timeLeft) / totalTime : 0;
        const timeScore = timeRatio * 20;

        // 4. Final Result (Rounded to nearest whole number)
        return Math.round(accuracyScore + timeScore);
      };

      // const accuracy = (correctAnswers / totalQuestions) * 100;
      // const score = correctAnswers * accuracy;
      const score = calculateWeightedScore(correctAnswers, totalQuestions, timeLeft, min * 60)
      Score.current = score
      // console.log(score)
      const data = {
        subject,
        score,
        timeTaken: time,
        totalQuestions,
        correctAnswers,
      };

      const res = await fetch(`${backendURL}/results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "Result saved");
      } else {
        toast.error(result.message || "Error saving result");
      }
    };

    postresult();
  }, []);


  const explainQuestion = async (item, index) => {
    if (explanations[index]) return;

    try {
      setLoadingExplain(index);

      const url = `${backendURL}/ask/explain?question=${encodeURIComponent(
        item.question.question
      )}&correct=${encodeURIComponent(
        item.question.correctresponse
      )}&yourAnswer=${encodeURIComponent(
        item.yourAnswer || "Not Attempted"
      )}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error("Explain API failed");
      }

      const data = await res.json();

      setExplanations(prev => ({
        ...prev,
        [index]: data.explanation
      }));
    } catch (err) {
      console.error(err);
      setExplanations(prev => ({
        ...prev,
        [index]: "Failed to load explanation."
      }));
    } finally {
      setLoadingExplain(null);
    }
  };


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
  const unattempted = responses.filter(r => r.marks === null).length;
  const incorrectresponse = responses?.filter(item => item.marks == false).length
  const questionlength = TestQuestion?.length || 0;
  const percentage = questionlength
    ? (correctresponse / questionlength) * 100
    : 0;
  const pastpercentage = (pastresult?.correctresponse / pastresult?.questionlength) * 100
  const timeTaken = Math.max(0, (min * 60) - timeLeft);
  const minute = Math.floor(timeTaken / 60);
  const sec = timeTaken % 60;

  // console.log(responses, "rexsult")

  return (
    <>
      {accessToken ? (
        <div className={`${style.ui} ${style.text} min-h-screen mt-16 flex items-center justify-center px-4`}>

          <div className="smooth-entry w-full max-w-2xl rounded-2xl 
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
              <div className="flex justify-between ">
                <span>Total Time</span>
                <span className="font-semibold">{min} min</span>
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
                  {unattempted}
                </span>
              </div>
              <div className="flex justify-between text-yellow-400">
                <span>Time taken</span>
                <span className="font-semibold">
                  {String(minute).padStart(2, "0")}:
                  {String(sec).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-sky-400 text-lg">
                <span>Percentage</span>
                <span className="font-bold">
                  {Number(Math.round(percentage + "e2") + "e-2")}%
                </span>
              </div>
              <div className="  border-white/10 flex justify-between text-sky-400 text-lg">
                <span>Score</span>
                <span className="font-bold">
                  {Score.current}
                </span>
              </div>

              {!!pastresult?.questionlength && <>
                <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-sky-400 text-lg">
                  <span>Past Percentage</span>
                  <span className="font-semibold">
                    {Number(Math.round(pastpercentage + "e2") + "e-2")}% on {pastresult.subject}
                  </span>
                </div>
              </>}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  navigate("/leaderboard")
                }}
                className="px-8 py-3 rounded-xl text-sm font-semibold text-white
            bg-gradient-to-r from-green-400 to-blue-600
            shadow-lg shadow-blue-500/30
            transition-all duration-300
            hover:shadow-blue-500/50 hover:-translate-y-0.5
            active:scale-95"
              >
                LeaderBoard
              </button>
              <button
                type="button"
                onClick={() => {
                  setshowtestHistory(!showtestHistory)
                }}
                className="px-8 py-3 rounded-xl text-sm font-semibold text-white
            bg-gradient-to-r from-green-400 to-blue-600
            shadow-lg shadow-blue-500/30
            transition-all duration-300
            hover:shadow-blue-500/50 hover:-translate-y-0.5
            active:scale-95"
              >
                Past performances
              </button>
              <button
                type="button"
                onClick={() => {
                  setpastresult({ questionlength: TestQuestion?.length, correctresponse, subject: testSub })
                  navigate("/discussions")
                }}
                className="px-8 py-3 rounded-xl text-sm font-semibold text-white
            bg-gradient-to-r from-green-400 to-blue-600
            shadow-lg shadow-blue-500/30
            transition-all duration-300
            hover:shadow-blue-500/50 hover:-translate-y-0.5
            active:scale-95"
              >
                Discussion Forum
              </button>
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

            {showtestHistory && <div>
              <PerformanceHistory allresults={allresults} />
            </div>}

            {/* Question Review */}
            <div className="mt-10 border-t border-white/10 pt-8">
              <h2 className="text-xl font-bold text-slate-200 mb-6 text-center">
                Question Review
              </h2>

              <div className="space-y-5 max-h-[400px] overflow-y-auto pr-2">
                {responses?.map((item, index) => {
                  const { question, marks, yourAnswer, timestamp } = item;
                  let time = (index !== 0 ? responses[index - 1]?.timestamp : min * 60) - timestamp
                  let questionTimeTaken = {
                    minute: Math.floor(time / 60),
                    second: (time % 60)
                  }
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
                          Q{index + 1}. {question?.question}
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
                          <>

                            <button
                              onClick={() => explainQuestion(item, index)}
                              disabled={loadingExplain === index}
                              className="text-xs px-4 py-2 rounded-lg font-semibold
      bg-gradient-to-r from-purple-500 to-indigo-600
      text-white shadow-md shadow-indigo-500/30
      hover:shadow-indigo-500/50 transition
      disabled:opacity-50"
                            >
                              {loadingExplain === index ? "Loading..." : "Explain with gemini AI"}
                            </button>

                            {explanations[index] && (
                              <div className="mt-3 p-4 rounded-xl bg-slate-900/60 border border-white/10 text-sm text-slate-200 leading-relaxed">
                                <span className="font-semibold text-indigo-400">AI Explanation:</span>
                                <p className="mt-2 whitespace-pre-line">
                                  {explanations[index]}
                                </p>
                              </div>
                            )}
                          </>

                        )}
                        {!marks && (
                          <p className="text-slate-300">
                            <span className="font-medium text-slate-400">
                              Correct Answer:
                            </span>{" "}
                            <span className="text-green-400">
                              {question?.correctresponse}
                            </span>
                          </p>
                        )}
                        {(
                          <p className="text-slate-300">
                            <span className="font-medium text-slate-400">
                              Time taken:
                            </span>{" "}
                            <span className="text-green-400">
                              {String(questionTimeTaken?.minute).padStart(2, "0")}:
                              {String(questionTimeTaken?.second).padStart(2, "0")}
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
        </div >
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