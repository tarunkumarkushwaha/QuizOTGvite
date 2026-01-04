import pkg from 'prop-types';
// import { useState } from 'react';

const { PropTypes } = pkg;

const SingleQuestion = ({ question, response, setresponse, disabled }) => {
    // const [checked, setchecked] = useState(false)
    const responseHandler = (e) => { setresponse(e.target.value) }
    // console.log(response)

    return (
        <>
            <div className="smooth-entry w-full max-w-3xl mx-auto px-4">


                <div className="mb-8 p-6 rounded-2xl 
      bg-white/10 backdrop-blur-md 
      border border-white/10 shadow-xl">

                    <h2 className="md:text-2xl text-lg font-semibold text-lime-300 leading-relaxed">
                        {question.question}
                    </h2>
                </div>

                <ul className="space-y-4">
                    {[
                        { key: "a", value: question.option1 },
                        { key: "b", value: question.option2 },
                        { key: "c", value: question.option3 },
                        { key: "d", value: question.option4 },
                    ].map((opt, idx) => {
                        const isSelected = response === opt.value;
                        const isCorrect = question.correctresponse === opt.value;

                        const baseColor = !disabled
                            ? isSelected
                                ? "border-lime-400 bg-lime-400/10"
                                : "border-white/10 bg-white/5 hover:bg-white/10"
                            : isCorrect
                                ? "border-green-500 bg-green-500/10"
                                : isSelected
                                    ? "border-red-500 bg-red-500/10"
                                    : "border-white/10 bg-white/5";

                        return (
                            <li key={idx}>
                                <label
                                    htmlFor={`option-${opt.key}`}
                                    className={`flex items-center gap-4 p-4 rounded-md 
                border transition-all duration-300 cursor-pointer
                ${baseColor}`}
                                >

                                    <input
                                        id={`option-${opt.key}`}
                                        type="radio"
                                        name="list-radio"
                                        value={opt.value}
                                        onChange={responseHandler}
                                        disabled={disabled}
                                        checked={isSelected}
                                        className="hidden"
                                    />

                                    <div className="w-8 h-8 flex items-center justify-center 
                rounded-full font-bold text-sm
                bg-lime-400/20 text-lime-300">
                                        {opt.key}
                                    </div>

                                    <p
                                        className={`text-sm md:text-base font-medium
                  ${!disabled
                                                ? "text-slate-100"
                                                : isCorrect
                                                    ? "text-green-400"
                                                    : isSelected
                                                        ? "text-red-400"
                                                        : "text-slate-300"
                                            }`}
                                    >
                                        {opt.value}
                                    </p>
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>

    )
}

SingleQuestion.propTypes = {
    questions: PropTypes.array,
    question: PropTypes.object,
    correct: PropTypes.object,
    setresponse: PropTypes.func,
    response: PropTypes.string,
    disabled: PropTypes.bool
};
export default SingleQuestion