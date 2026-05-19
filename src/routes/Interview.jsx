import React, { useContext, useMemo, useState } from "react";
import { Context } from "../MyContext";
import InterviewResult from "../components/InterviewResult";

const Interview = () => {
  const { InterviewQuestions, backendURL, accessToken, authFetch } =
    useContext(Context);

  const questions = InterviewQuestions?.questions || [];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState({});

  const [loading, setLoading] = useState(false);

  const [reviewResult, setReviewResult] = useState(null);

  const activeQuestion = useMemo(() => {
    return questions[currentQuestion];
  }, [questions, currentQuestion]);

  const handleAnswerChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmitInterview = async () => {
    try {
      const formattedAnswers = questions.map((q, index) => ({
        question: q.question,
        type: q.type,
        answer: answers[index] || "",
      }));

      setLoading(true);

      const response = await authFetch(`/ask/interview/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: formattedAnswers,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Review failed");
      }

      setReviewResult(data);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        No interview questions found.
      </div>
    );
  }

  console.log(reviewResult);

  return (
    <div className="mainbg mt-10 bg-no-repeat bg-left min-h-screen">
      <div className="mainbg min-h-screen px-4 pt-10">
        <div
          className="max-w-6xl mx-auto 
          bg-white/10 backdrop-blur-xl 
          border border-white/10 
          rounded-3xl shadow-2xl 
          shadow-black/40 overflow-hidden"
        >
          {/* <div
            className="border-b border-slate-800 
            px-6 py-5 flex flex-col md:flex-row 
            md:items-center md:justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-extrabold text-slate-100">
                AI Interview Session
              </h1>

              <p className="text-slate-300 mt-1">
                Answer realistically as if you're in a real interview.
              </p>
            </div>

            <div
              className="bg-cyan-500/20 border border-cyan-400/30 
              text-cyan-300 px-5 py-3 rounded-2xl text-sm font-semibold"
            >
              Question {currentQuestion + 1} / {questions.length}
            </div>
          </div> */}

          {reviewResult ? (
            <InterviewResult reviewResult={reviewResult} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
              <div
                className="border-r border-slate-800 
              bg-slate-950/40 p-5"
              >
                <div className="space-y-1">
                  {questions.map((item, index) => {
                    const answered = answers[index];

                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentQuestion(index)}
                        className={`
                        w-full text-left p-4 rounded-2xl border transition-all
                        ${
                          currentQuestion === index
                            ? "bg-cyan-500/20 border-cyan-400 text-cyan-200"
                            : "bg-slate-900/70 border-slate-800 text-slate-300"
                        }
                      `}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Q{index + 1}</span>

                          {answered && (
                            <span className="text-green-400 text-xs">
                              Answered
                            </span>
                          )}
                        </div>

                        <p className="text-xs mt-2 opacity-80 capitalize">
                          {item.type}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 md:p-8">
                {/* <div
                className="inline-flex px-4 py-2 rounded-full 
                bg-purple-500/20 border border-purple-400/30 
                text-purple-300 text-sm font-medium capitalize"
              >
                {activeQuestion?.type} Question
              </div> */}

                <div className="">
                  <h2
                    className="text-2xl font-bold 
                  leading-relaxed text-slate-100"
                  >
                    {activeQuestion?.question}
                  </h2>
                </div>

                <div className="mt-1">
                  <label className="block text-slate-200 mb-3 font-semibold">
                    Your Answer
                  </label>

                  <textarea
                    value={answers[currentQuestion] || ""}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    placeholder="Write your answer here..."
                    className="w-full min-h-[280px] resize-none 
                  bg-slate-900/80 border border-slate-700 
                  rounded-3xl p-5 text-slate-100 
                  outline-none focus:border-cyan-500 
                  transition-all"
                  />
                </div>

                <div
                  className="flex flex-col sm:flex-row 
                justify-between gap-4 mt-2"
                >
                  <button
                    onClick={handlePrev}
                    disabled={currentQuestion === 0}
                    className="px-6 py-3 rounded-2xl 
                  bg-slate-800 hover:bg-slate-700 
                  disabled:opacity-50 disabled:cursor-not-allowed 
                  text-slate-100 font-semibold transition-all"
                  >
                    Previous
                  </button>

                  {currentQuestion === questions.length - 1 ? (
                    <button
                      onClick={handleSubmitInterview}
                      disabled={loading || reviewResult}
                      className="px-8 py-3 rounded-2xl 
                    bg-cyan-500 hover:bg-cyan-400 
                    disabled:opacity-60 disabled:cursor-not-allowed
                    text-slate-950 font-bold 
                    transition-all duration-300"
                    >
                      {loading ? "Reviewing Interview..." : "Submit Interview"}
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="px-8 py-3 rounded-2xl 
                    bg-cyan-500 hover:bg-cyan-400 
                    text-slate-950 font-bold 
                    transition-all duration-300"
                    >
                      Next Question
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interview;
