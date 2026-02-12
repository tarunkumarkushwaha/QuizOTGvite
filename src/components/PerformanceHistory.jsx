import React from 'react'

const PerformanceHistory = ({ allresults }) => {
    let dark = true
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
    return (
        <div
            className={`${style.ui} ${style.text} smooth-entry mt-16 flex items-center justify-center`}
        >
            <div
                className=" w-full 
    bg-white/10 
    shadow-2xl shadow-black/40 p-4"
            >
                <h1 className="text-center text-3xl font-extrabold text-emerald-400 mb-2">
                    Your Test History
                </h1>
                <p className="text-center text-sm mb-8">
                    All your previous attempts
                </p>

                <div className="flex flex-col items-center gap-2 justify-center">
                    {allresults?.length === 0 && (
                        <p className="text-center text-slate-400">
                            No results available
                        </p>
                    )}

                    {allresults?.map((item, index) => {
                        const minutes = Math.floor(item.timeTaken / 60);
                        const seconds = item.timeTaken % 60;

                        return (
                            <div
                                key={item._id}
                                className="rounded-xl p-5 border 
              bg-slate-900/40 border-white/10 w-full flex flex-col items-stretch gap-1
              hover:border-emerald-400/30 transition"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-lg font-semibold text-slate-100">
                                        Subject - <span className='font-medium text-base'>{item.subject}</span>
                                    </h3>
                                    <span className="text-xs text-slate-400">
                                        {new Date(item.createdAt).toLocaleString()}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Total Questions</span>
                                        <span className="font-semibold">
                                            {item.totalQuestions}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Correct</span>
                                        <span className="font-semibold text-emerald-400">
                                            {item.correctAnswers}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Score</span>
                                        <span className="font-semibold text-sky-400">
                                            {item.score}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Accuracy</span>
                                        <span className="font-semibold text-yellow-400">
                                            {item.accuracy.toFixed(2)}%
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Time Taken</span>
                                        <span className="font-semibold text-indigo-400">
                                            {String(minutes).padStart(2, "0")}:
                                            {String(seconds).padStart(2, "0")}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Rank</span>
                                        <span className="font-semibold text-indigo-400">
                                            N/A
                                        </span>
                                    </div>

                                    
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

    )
}

export default PerformanceHistory