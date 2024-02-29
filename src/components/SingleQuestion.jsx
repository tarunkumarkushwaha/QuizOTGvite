import pkg from 'prop-types';
// import { useState } from 'react';

const { PropTypes } = pkg;

const SingleQuestion = ({ question, response, setresponse, disabled }) => {
    // const [checked, setchecked] = useState(false)
    const responseHandler = (e) => {setresponse(e.target.value)}

    return (
        <>
            <div className="flex flex-col justify-center">
                <h2 className="text-xl p-10 text-lime-500 font-bold">{question.question}</h2>

                <ul className="w-[50rem] text-sm font-medium rounded-lg">
                    <li className="w-full rounded-t-lg">
                        <div className="flex items-center ps-3">
                            <input onChange={responseHandler} disabled={disabled} checked={(response == question.option1)}
                                id="list-radio-a" type="radio" value={question.option1} name="list-radio" className="w-10 h-4 " />
                            <label htmlFor="list-radio-a" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                <p className={`text-l ${!disabled ? "text-lime-600" : question.correctresponse == question.option1 ? "text-green-600" : "text-red-600"} font-bold`}>
                                    <span>a. </span>{question.option1}</p>
                            </label>
                        </div>
                    </li>
                    <li className="w-full rounded-t-lg">
                        <div className="flex items-center ps-3">
                            <input onChange={responseHandler} disabled={disabled} checked={(response == question.option2)}
                                id="list-radio-b" type="radio" value={question.option2} name="list-radio" className="w-10 h-4 " />
                            <label htmlFor="list-radio-b" className="w-full py-3 ms-2 text-sm font-medium">
                                <p className={`text-l ${!disabled ? "text-lime-600" : question.correctresponse == question.option2 ? "text-green-600" : "text-red-600"} font-bold`}>
                                    <span>b. </span>{question.option2}</p>
                            </label>
                        </div>
                    </li>
                    <li className="w-full rounded-t-lg">
                        <div className="flex items-center ps-3">
                            <input onChange={responseHandler} disabled={disabled} checked={(response == question.option3)}
                                id="list-radio-c" type="radio" value={question.option3} name="list-radio" className="w-10 h-4" />
                            <label htmlFor="list-radio-c" className="w-full py-3 ms-2 text-sm font-medium">
                                <p className={`text-l ${!disabled ? "text-lime-600" : question.correctresponse == question.option3 ? "text-green-600" : "text-red-600"} font-bold`}>
                                    <span>c. </span>{question.option3}</p>
                            </label>
                        </div>
                    </li>
                    <li className="w-full rounded-t-lg">
                        <div className="flex items-center ps-3">
                            <input onChange={responseHandler} disabled={disabled} checked={(response == question.option4)}
                                id="list-radio-d" type="radio" value={question.option4} name="list-radio" className="w-10 h-4" />
                            <label htmlFor="list-radio-d" className="w-full py-3 ms-2 text-sm font-medium">
                                <p className={`text-l ${!disabled ? "text-lime-600" : question.correctresponse == question.option4 ? "text-green-600" : "text-red-600"} font-bold`}>
                                    <span>d. </span>{question.option4}</p>
                            </label>
                        </div>
                    </li>
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