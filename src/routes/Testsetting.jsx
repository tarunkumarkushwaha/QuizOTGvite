import { Navigate, useNavigate } from "react-router-dom"
import { Context } from '../MyContext';
import { useContext, useEffect, useState, useCallback, useRef } from 'react';
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
  const [file, setFile] = useState(null);
  const [questionLength, setquestionLength] = useState(10);
  const [maxquestionLength, setmaxquestionLength] = useState(30);
  const [loading, setLoading] = useState(false);
  const [questionGenerateInput, setquestionGenerateInput] = useState(false);
  const [questionGenerateInputText, setquestionGenerateInputText] = useState("");

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

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

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  const generateQuestionsViaPdf = async () => {
    if (!file) {
      toast.error("Please upload a PDF first")
      return
    };

    setLoading(true);
    setTestQuestion([]);
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append("count", questionLength);

    try {
      const response = await fetch(`${backendURL}/ask/generate-from-pdf`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to generate questions");
      }


      const data = await response.json();
      // console.log(data,"data")
      if (data?.questions) {
        let shuffledQuestions = randomShuffle(data.questions)
        setTestQuestion(shuffledQuestions);
        // setmin(String(data.time || 10));
        setmin(data.time || 10);
        setTimeLeft(data.time * 60 || 10 * 60);
        // removeFile();
        toast.success("Questions generated successfully!");
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
      return
    }
  };

  const GenerateQuestion = () => {
    // if ((questionGenerateInputText.length < 1) || file ? false : true) {
    //   console.log(questionGenerateInputText.length < 1 || file)
    //   toast.error("please enter prompt")
    //   return
    // }
    if (file) {
      generateQuestionsViaPdf()
      return
    }
    setLoading(true);
    fetch(
      `${backendURL}/ask?prompt=${encodeURIComponent(
        questionGenerateInputText
      )}&count=${questionLength}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
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
          setmin(data?.time || 10);
          setTimeLeft(data?.time * 60 || 10 * 60);
          setmaxquestionLength(data.questions.length)
        } else {
          setTestQuestion([]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [testSub]);

  const submitMultipleQuestions = async () => {
    if (!Array.isArray(TestQuestion) || TestQuestion.length === 0) {
      toast.warn("Please generate question");
      return;
    }

    const subject = questionGenerateInputText ? questionGenerateInputText.slice(0, 20) : file?.name?.split(".")[0];
    // if (!subject) {
    //   toast.warn("Please generate question1");
    //   return;
    // }
    setLoading(true);

    try {
      const res = await fetch(`${backendURL}/quiz/bulk/${subject}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ questions: TestQuestion }),
      });

      if (res.ok) {
        toast.success("All questions uploaded successfully!");
        // await getAllSubjects();
        // await loadQuestions();
      } else {
        const errMsg = await res.text();
        console.error(errMsg);
        toast.error("Error uploading questions");
      }
    } catch (err) {
      console.error("Bulk upload failed", err);
      toast.error("Bulk upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    setFile(selectedFile);
  };
  // console.log(questionGenerateInputText ? questionGenerateInputText.slice(0, 20) : file?.name?.split(".")[0],TestQuestion)

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

              <div className="flex flex-col gap-4">
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
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-200">
                    Manage Your Questions
                  </label>
                  <button
                    onClick={() => navigate("/managequestions")}
                    className="bg-green-500 text-white px-4 py-3 rounded-xl shadow border border-slate-300
      focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-green-600"
                  >
                    Manage Your Questions
                  </button>
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

                {/* Upload Box */}
                <div className="relative group my-4">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />

                  <div
                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-10 transition-all ${file
                      ? "border-green-400 bg-green-50"
                      : "border-gray-300 bg-gray-50 group-hover:border-indigo-400 group-hover:bg-indigo-50"
                      }`}
                  >
                    {file ? (
                      <div className="text-center text-green-700 relative">
                        {/* Delete button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile()
                          }}
                          className="absolute -top-20 -right-60 bg-red-500 text-white rounded-md w-24 h-8 flex items-center justify-center hover:bg-red-600"
                        >
                          delete file
                        </button>

                        <svg
                          className="w-12 h-12 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>

                        <p className="font-semibold underline truncate max-w-[200px]">
                          {file.name}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center text-gray-400">
                        <svg
                          className="w-12 h-12 mx-auto mb-2 opacity-60"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="text-sm font-medium">Click to upload or drag and drop</p>
                        <p className="text-xs mt-1">PDF files only</p>
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-slate-100 text-center font-semibold mb-4">
                  OR
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
                    disabled={file ? true : false}
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
                <button
                  type="button"
                  onClick={submitMultipleQuestions}
                  disabled={loading}
                  className={`w-full text-white my-4 font-semibold rounded-xl px-6 py-3
                bg-gradient-to-r from-purple-500 to-pink-500
                shadow-lg shadow-pink-500/30
                transition-all duration-300
                hover:shadow-pink-500/50 hover:-translate-y-0.5
                active:scale-95
                ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {loading ? "Wait..." : "Save Genererated Questions"}
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