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
                <FormControl className="bg-slate-300 rounded-md w-full" fullWidth>
                  <InputLabel id="subject-select-label">Subject</InputLabel>
                  <Select
                    labelId="subject-select-label"
                    name="subject"
                    id="subject-select"
                    value={testSub}
                    label="Subject"
                    onChange={(e) => settestSub(e.target.value)}
                  >
                    <MenuItem value="generate question">Generate Question (AI)</MenuItem>
                    <MenuItem value="Your Questions">Your Custom Questions</MenuItem>
                    <MenuItem value="html">HTML</MenuItem>
                    <MenuItem value="css">CSS</MenuItem>
                    <MenuItem value="javascript">JavaScript</MenuItem>
                    <MenuItem value="React">React</MenuItem>
                    <MenuItem value="wordpress">WordPress</MenuItem>
                    <MenuItem value="Python">Python</MenuItem>
                    <MenuItem value="Science">Science</MenuItem>
                    <MenuItem value="Funny">Funny</MenuItem>
                    <MenuItem value="Reasoning">Reasoning</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="flex flex-col gap-4">
                <TextField
                  id="time-input"
                  name="time"
                  className="bg-slate-300"
                  type="number"
                  label="Time (minutes)"
                  value={min}
                  onChange={(e) => handleChange(e.target.value)}
                  inputProps={{ min: 1 }}
                  fullWidth
                />

                <FormControl className="bg-slate-300 rounded-md" fullWidth>
                  <InputLabel id="question-count-label">
                    Number of Questions
                  </InputLabel>

                  <Select
                    labelId="question-count-label"
                    id="question-count"
                    value={questionLength}
                    label="Number of Questions"
                    onChange={(e) => setquestionLength(Number(e.target.value))}
                  >
                    {Array.from({ length: maxquestionLength }, (_, i) => i + 1).map((num) => (
                      <MenuItem key={num} value={num}>
                        {num} Questions
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

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