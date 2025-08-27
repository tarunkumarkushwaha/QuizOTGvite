import { useNavigate } from "react-router-dom"
import { Context } from '../MyContext';
import { useContext, useEffect, useState, useCallback } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import AddQuestions from "../components/AddQuestions";
import { toast } from "react-toastify";
import PleaseLogin from "../components/PleaseLogin.jsx";
import TestRules from "../components/TestRules.jsx";

const Testsetting = () => {
  const {
    CustomQuestions,
    testSub,
    settestSub,
    setstart,
    setmin,
    TestQuestion,
    setTestQuestion,
    signIn
  } = useContext(Context);

  const [questionLength, setquestionLength] = useState(10);
  const [maxquestionLength, setmaxquestionLength] = useState(30);
  const [Timevalue, setTimeValue] = useState("10");
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState("");
  const [questionGenerateInput, setquestionGenerateInput] = useState(false);
  const [questionGenerateInputText, setquestionGenerateInputText] = useState("");

  const navigate = useNavigate();

  const handleChange = (text) => {
    const numericTimeValue = text.replace(/[^0-9]/g, "");
    setTimeValue(numericTimeValue);
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
      `https://quiztimequestionapi.onrender.com/ask?prompt=${encodeURIComponent(
        questionGenerateInputText
      )}&count=${questionLength}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data?.question) {
          let shuffledQuestions = randomShuffle(data.question)
          setTestQuestion(shuffledQuestions);
          setTimeValue(String(data.time || 10));
          setmin(data.time || 10);
          toast.success("Questions generated successfully!");
        } else {
          console.log(data)
          toast.error("No questions returned from AI");
        }
      })
      .catch((err) => {
        seterror(err.message);
        toast.warning("Please wait — AI is waking up");
      })
      .finally(() => setLoading(false));
  };

  const startTest = () => {
    if (testSub === "custom" && CustomQuestions.length <= 0) {
      toast.warning("No custom questions, switching to GK");
      settestSub("indianGK");
    }
    if (testSub === "generate question" && !TestQuestion?.length) {
      toast.error("Generate questions first");
      return;
    }
    setstart(true);
    navigate(testSub === "custom" ? "/customtest" : "/test");
    localStorage.setItem(
      "questions",
      JSON.stringify(testSub === "custom" ? CustomQuestions : TestQuestion)
    );
  };

  useEffect(() => {
    if (testSub !== "generate question") {
      setLoading(true)
      fetch(
        `https://quiztimequestionapi.onrender.com/questions/${testSub.toLowerCase()}questions`
      )
        .then((res) => res.json())
        .then((data) => {
          let shuffledQuestions = randomShuffle(data.questions)
          setTestQuestion(shuffledQuestions);
          setmin(data.time);
        })
        .catch((err) => console.error("Error fetching data:", err))
        .finally(() => setLoading(false));
    } else { setquestionGenerateInput(true) }
  }, [testSub]);

  // console.log(TestQuestion,"question",testSub)
  // local question files 

  //   const questionModules = {
  //   javascript: () => import("../questions/javascriptquestions"),
  //   react: () => import("../questions/reactquestions"),
  //   html: () => import("../questions/htmlquestions"),
  //   css: () => import("../questions/cssquestions"),
  //   indianGK: () => import("../questions/indianGKquestions"),
  //   wordpress: () => import("../questions/wordpressquestions"),
  //   math: () => import("../questions/mathquestions"),
  //   python: () => import("../questions/pythonquestions"),
  //   science: () => import("../questions/sciencequestions"),
  //   reasoning: () => import("../questions/reasoningquestions"),
  //   funny: () => import("../questions/funnyquestions"),
  // };

  // useEffect(() => {
  //   if (testSub !== "generate question") {
  //     setquestionGenerateInput(false)
  //     loadQuestions();
  //   } else { setquestionGenerateInput(true) }
  // }, [testSub, loadQuestions]);

  //   const loadQuestions = useCallback(async () => {
  //   if (testSub === "generate question") {
  //     return
  //   };

  //   if (questionModules[testSub]) {
  //     // setquestionGenerateInput(false)
  //     try {
  //       const module = await questionModules[testSub]();
  //       const availableLength = module.default.questions.length;
  //       setmaxquestionLength(availableLength);

  //       const length = Math.min(questionLength, availableLength);
  //       const shuffled = randomShuffle(module.default.questions).slice(
  //         0,
  //         length
  //       );

  //       setTestQuestion(shuffled);
  //       setmin(parseInt(Timevalue, 10) || 10);
  //     } catch (err) {
  //       toast.error(`Unable to load questions for ${testSub}`);
  //     }
  //   }
  // }, [testSub, questionLength, Timevalue]);

  return (
    <>
      {signIn ? (
        <div className="mainbg bg-no-repeat bg-left min-h-screen">
          <div className="bg-slate-950/60 min-h-screen flex flex-col items-center p-10">
            <h1 className="smooth-entry text-3xl m-1 p-5 mt-8 text-slate-100 text-center font-sans">
              Test Settings
            </h1>

            <div className="flex flex-col justify-center items-center smooth-entry">
              <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 p-4">

                {/* Subject Selector */}
                <div className="w-full sm:w-64 md:w-80">
                  <FormControl className="bg-slate-300 rounded-md w-full" fullWidth>
                    <InputLabel id="subject-select-label">Subject</InputLabel>
                    <Select
                      labelId="subject-select-label"
                      id="subject-select"
                      value={testSub}
                      label="Subject"
                      onChange={(e) => settestSub(e.target.value)}
                    >
                      <MenuItem value="html">HTML</MenuItem>
                      <MenuItem value="css">CSS</MenuItem>
                      <MenuItem value="javascript">javascript</MenuItem>
                      <MenuItem value="React">React</MenuItem>
                      <MenuItem value="wordpress">WordPress</MenuItem>
                      <MenuItem value="Python">Python</MenuItem>
                      <MenuItem value="Science">Science</MenuItem>
                      <MenuItem value="Funny">Funny</MenuItem>
                      <MenuItem value="Reasoning">Reasoning</MenuItem>
                      <MenuItem value="generate question">Generate Question (AI)</MenuItem>
                      <MenuItem value="Previous paper">Previous Paper</MenuItem>
                      <MenuItem value="Your Questions">Your Custom Questions</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                {/* Time & Question Inputs */}
                <div className="flex flex-col gap-3 w-full sm:w-64 md:w-80">
                  <TextField
                    className="bg-slate-300"
                    type="number"
                    label="Time (minutes)"
                    value={Timevalue}
                    onChange={(e) => handleChange(e.target.value)}
                    inputProps={{ min: 1 }}
                    fullWidth
                  />
                  <TextField
                    className="bg-slate-300"
                    type="number"
                    label="Number of Questions"
                    value={questionLength}
                    onChange={(e) => setquestionLength(Number(e.target.value))}
                    inputProps={{ min: 1, max: maxquestionLength }}
                    fullWidth
                  />

                  {/* Generate AI Questions */}
                  {testSub === "generate question" && (
                    <>
                      {questionGenerateInput && (
                        <TextField
                          className="bg-slate-300"
                          type="text"
                          label="Generate questions via AI"
                          value={questionGenerateInputText}
                          onChange={(e) => setquestionGenerateInputText(e.target.value)}
                          fullWidth
                        />
                      )}
                      <button
                        type="button"
                        onClick={GenerateQuestion}
                        disabled={loading}
                        className="w-full text-white bg-gradient-to-br from-purple-500 to-pink-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5"
                      >
                        {loading ? "Please Wait..." : "Generate Questions"}
                      </button>
                    </>
                  )}

                  
                </div>
                {/* Start Test */}
                  {testSub !== "Your Questions" && testSub !== "Previous paper" && (
                    <button
                      type="button"
                      onClick={startTest}
                      disabled={loading}
                      className="text-white w-1/3 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                      Start Test
                    </button>
                  )}
              </div>

              {/* Conditional Render for Rules or Adding Questions */}
              {testSub === "Your Questions" ? <AddQuestions /> : <TestRules />}
            </div>
          </div>
        </div>
      ) : (
        <PleaseLogin />
      )}

    </>
  )
}

export default Testsetting