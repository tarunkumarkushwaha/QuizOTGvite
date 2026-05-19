import React from "react";

const InterviewResult = ({ reviewResult }) => {
  return (
    <>
      {reviewResult && (
        <div
          className="mt-10 bg-slate-900/70 
    border border-slate-800 rounded-3xl p-6"
        >
        
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-100">
                Interview Result
              </h2>

              <p className="text-slate-400 mt-1">
                AI-powered interview evaluation and feedback
              </p>
            </div>

            <div
              className={`px-5 py-3 rounded-2xl font-bold text-lg border
        ${
          reviewResult.result === "Selected"
            ? "bg-green-500/20 text-green-300 border-green-400/30"
            : "bg-red-500/20 text-red-300 border-red-400/30"
        }`}
            >
              {reviewResult.result}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-8">
            <div
              className="bg-slate-950/60 rounded-2xl 
        border border-slate-800 p-6"
            >
              <p className="text-slate-400 text-sm">Overall Score</p>

              <h3 className="text-5xl font-extrabold text-cyan-400 mt-3">
                {reviewResult.overallScore}
                <span className="text-2xl text-slate-500">/100</span>
              </h3>
            </div>

            <div
              className="bg-slate-950/60 rounded-2xl 
        border border-slate-800 p-6"
            >
              <p className="text-slate-400 text-sm">Performance Summary</p>

              <p className="text-slate-200 mt-3 leading-relaxed">
                {reviewResult.message}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div
              className="bg-slate-950/60 rounded-2xl 
        border border-slate-800 p-6"
            >
              <h3 className="text-xl font-bold text-green-400 mb-4">
                Strengths
              </h3>

              {reviewResult.strengths?.length > 0 ? (
                <div className="space-y-3">
                  {reviewResult.strengths.map((item, index) => (
                    <div
                      key={index}
                      className="bg-green-500/10 border border-green-400/20 
                rounded-xl p-3 text-slate-200"
                    >
                      • {item}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">No major strengths identified.</p>
              )}
            </div>

            <div
              className="bg-slate-950/60 rounded-2xl 
        border border-slate-800 p-6"
            >
              <h3 className="text-xl font-bold text-red-400 mb-4">
                Areas to Improve
              </h3>

              {reviewResult.weaknesses?.length > 0 ? (
                <div className="space-y-3">
                  {reviewResult.weaknesses.map((item, index) => (
                    <div
                      key={index}
                      className="bg-red-500/10 border border-red-400/20 
                rounded-xl p-3 text-slate-200"
                    >
                      • {item}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">No weaknesses identified.</p>
              )}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-bold text-slate-100 mb-6">
              Question Analysis
            </h3>

            <div className="space-y-6">
              {reviewResult.reviews?.map((review) => (
                <div
                  key={review.id}
                  className="bg-slate-950/60 border border-slate-800 
            rounded-3xl p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-slate-500 text-sm">
                        Question {review.id}
                      </p>

                      <h4
                        className="text-lg font-bold 
                  text-slate-100 mt-1"
                      >
                        {review.question}
                      </h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`px-4 py-2 rounded-xl text-sm font-bold border
                  ${
                    review.status === "Strong"
                      ? "bg-green-500/20 text-green-300 border-green-400/30"
                      : review.status === "Average"
                        ? "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
                        : "bg-red-500/20 text-red-300 border-red-400/30"
                  }`}
                      >
                        {review.status}
                      </div>

                      <div
                        className="bg-cyan-500/10 border border-cyan-400/20 
                  text-cyan-300 px-4 py-2 rounded-xl font-bold"
                      >
                        {review.score}/10
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-slate-400 text-sm mb-2">Your Answer</p>

                    <div
                      className="bg-slate-900 border border-slate-800 
                rounded-2xl p-4 text-slate-200 whitespace-pre-wrap"
                    >
                      {review.userAnswer}
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-slate-400 text-sm mb-2">AI Feedback</p>

                    <div
                      className="bg-slate-900 border border-slate-800 
                rounded-2xl p-4 text-slate-300 leading-relaxed"
                    >
                      {review.feedback}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InterviewResult;
