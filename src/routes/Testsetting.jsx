import { Navigate, useNavigate } from "react-router-dom"
import { Context } from '../MyContext';
import { useContext, useEffect, useState, useCallback } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { toast } from "react-toastify";
import TestRules from "../components/TestRules.jsx";
import FileUploadComponent from "../components/FileUploadComponent.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const Testsetting = () => {
  const {
    testSub,
    settestSub,
    setTimeLeft,
    setstart,
    setmin,
    TestQuestion,
    setTestQuestion,
    backendURL,
    accessToken,
    min,
    setresponses
  } = useContext(Context);

  const [questionLength, setquestionLength] = useState(10);
  const [maxquestionLength, setmaxquestionLength] = useState(30);
  const [loading, setLoading] = useState(false);
  const [questionGenerateInput, setquestionGenerateInput] = useState(false);
  const [questionGenerateInputText, setquestionGenerateInputText] = useState("");

  const navigate = useNavigate();

  const handleChange = (text) => {
    const numericTimeValue = text.replace(/[^0-9]/g, "");
    setmin(numericTimeValue);
  };

  function randomShuffle(array) {
    const copy = [...array];
    const newArray = [];
    while (copy.length) {
      const randomIndex = Math.floor(Math.random() * copy.length);
      newArray.push(copy.splice(randomIndex, 1)[0]);
    }
    return newArray;
  }

  const GenerateQuestion = () => {
    setLoading(true);
    fetch(
      `${backendURL}/ask?prompt=${encodeURIComponent(
        questionGenerateInputText
      )}&count=${questionLength}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data?.question) {
          let shuffledQuestions = randomShuffle(data.question)
          setTestQuestion(shuffledQuestions);
          // setmin(String(data.time || 10));
          setmin(data.time || 10);
          setTimeLeft(data.time * 60 || 10 * 60);
          toast.success("Questions generated successfully!");
        } else {
          console.log(data)
          toast.error("No questions returned from AI");
        }
      })
      .catch((err) => {
        console.log(err.message);
        toast.warning("Please wait — AI is waking up");
      })
      .finally(() => setLoading(false));
  };

  const startTest = () => {
    if (testSub === "Your Questions" && (!Array.isArray(TestQuestion) || TestQuestion.length === 0)) {
      toast.warning("No custom questions found");
      return;
    }

    if (testSub === "generate question" && (!Array.isArray(TestQuestion) || TestQuestion.length === 0)) {
      toast.error("Generate questions first");
      return;
    }

    let shortenedQuestions = TestQuestion.slice(0, questionLength)

    setTestQuestion(shortenedQuestions)
    setresponses([])
    setstart(true);
    navigate("/test");
  };


  useEffect(() => {
    if (!testSub || !backendURL) return;

    if (testSub === "generate question") {
      setquestionGenerateInput(true);
      setTestQuestion([]);
      setmaxquestionLength(20)
      return;
    }

    if (testSub === "Your Questions") {
      setquestionGenerateInput(false);
      setmaxquestionLength(30)
      return;
    }

    setquestionGenerateInput(false);
    setLoading(true);

    fetch(`${backendURL}/questions/${testSub.toLowerCase()}questions`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.questions?.length) {
          setTestQuestion(randomShuffle(data.questions));
          setmin(data.time || 10);
          setTimeLeft(data.time * 60 || 10 * 60);
          setmaxquestionLength(data.questions.length)
        } else {
          setTestQuestion([]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [testSub]);



  return (
    <>
      <div className="mainbg mt-10 bg-no-repeat bg-left min-h-screen">
        {accessToken ? <div className="bg-slate-950/70 min-h-screen flex justify-center items-start px-4 py-10">


          <div className="smooth-entry w-full max-w-4xl 
        bg-white/10 backdrop-blur-xl border border-white/10 
        rounded-2xl shadow-2xl shadow-black/40 p-8">


            <h1 className="text-center text-3xl font-extrabold text-slate-100 mb-2">
              Test Settings
            </h1>
            <p className="text-center text-slate-300 text-sm mb-8">
              Configure your test before starting
            </p>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-200">
                    Subject
                  </label>

                  <select
                    value={testSub}
                    onChange={(e) => settestSub(e.target.value)}
                    className="w-full rounded-xl px-4 py-3
      bg-slate-200 text-slate-900
      border border-slate-300
      focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option disabled value="">Select subject</option>
                    <option value="generate question">Generate Question (AI)</option>
                    <option value="Your Questions">Your Custom Questions</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="javascript">JavaScript</option>
                    <option value="React">React</option>
                    <option value="wordpress">WordPress</option>
                    <option value="Python">Python</option>
                    <option value="Science">Science</option>
                    <option value="Funny">Funny</option>
                    <option value="Reasoning">Reasoning</option>
                  </select>
                </div>

              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-200">
                    Time (minutes)
                  </label>

                  <input
                    type="number"
                    min={1}
                    value={min}
                    onChange={(e) => handleChange(e.target.value)}
                    className="w-full rounded-xl px-4 py-3
      bg-slate-200 text-slate-900
      border border-slate-300
      focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>


                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-200">
                    Number of Questions
                  </label>

                  <select
                    value={questionLength}
                    onChange={(e) => setquestionLength(Number(e.target.value))}
                    className="w-full rounded-xl px-4 py-3
      bg-slate-200 text-slate-900
      border border-slate-300
      focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Array.from({ length: maxquestionLength }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>
                        {num} Questions
                      </option>
                    ))}
                  </select>
                </div>


              </div>
            </div>


            {testSub === "generate question" && (
              <div className="mt-8 p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-slate-100 font-semibold mb-4">
                  AI Question Generator
                </h3>

                {questionGenerateInput && (
                  <TextField
                    className="bg-slate-300 mb-4 rounded-md"
                    type="text"
                    id="ai-prompt"
                    name="aiPrompt"
                    label="Describe what questions you want"
                    value={questionGenerateInputText}
                    onChange={(e) => setquestionGenerateInputText(e.target.value)}
                    fullWidth
                  />
                )}

                <button
                  type="button"
                  onClick={GenerateQuestion}
                  disabled={loading}
                  className={`w-full text-white my-4 font-semibold rounded-xl px-6 py-3
                bg-gradient-to-r from-purple-500 to-pink-500
                shadow-lg shadow-pink-500/30
                transition-all duration-300
                hover:shadow-pink-500/50 hover:-translate-y-0.5
                active:scale-95
                ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {loading ? "Generating..." : "Generate Questions"}
                </button>
              </div>
            )}

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={startTest}
                disabled={loading}
                className={`px-10 py-3 text-sm font-bold text-white rounded-xl
              bg-gradient-to-r from-green-400 to-blue-600
              shadow-lg shadow-blue-500/30
              transition-all duration-300
              hover:shadow-blue-500/50 hover:-translate-y-0.5
              active:scale-95
              ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                Start Test
              </button>
            </div>

            <div className="mt-10">
              {testSub === "Your Questions" ? (
                <FileUploadComponent
                  randomShuffle={randomShuffle}
                  setmaxquestionLength={setmaxquestionLength}
                />
              ) : (
                <TestRules />
              )}
            </div>

          </div>
        </div> : <LoadingSpinner />}
      </div>
    </>

  )
}

export default Testsetting