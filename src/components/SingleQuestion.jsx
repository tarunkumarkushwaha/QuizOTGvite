import pkg from 'prop-types';
// import { useState } from 'react';

const { PropTypes } = pkg;

const SingleQuestion = ({ question, response, setresponse, disabled }) => {
    // const [checked, setchecked] = useState(false)
    const responseHandler = (e) => {setresponse(e.target.value)}
    // console.log(response)

    return (
        <>
            <div className="flex flex-col justify-center items-center smooth-entry">
                <h2 className="md:text-2xl text-xl text-lime-300 font-semibold m-10">{question.question}</h2>

                <ul className=" self-start md:text-lg text-sm font-extralight rounded-lg p-3">
                    <li className="w-full rounded-t-lg">
                        <div className="flex items-center ps-3">
                            <input onChange={responseHandler} disabled={disabled} checked={(response == question.option1)}
                                id="list-radio-a" type="radio" value={question.option1} name="list-radio" className="w-10 h-4 " />
                            <label htmlFor="list-radio-a" className="w-full py-3 ms-2  font-extralight text-gray-900 dark:text-gray-300">
                                <p className={`text-l ${!disabled ? "text-lime-300" : question.correctresponse == question.option1 ? "text-green-600" : "text-red-600"} font-bold`}>
                                    <span className="text-green-400 mr-1">a. </span>{question.option1}</p>
                            </label>
                        </div>
                    </li>
                    <li className="w-full rounded-t-lg">
                        <div className="flex items-center ps-3">
                            <input onChange={responseHandler} disabled={disabled} checked={(response == question.option2)}
                                id="list-radio-b" type="radio" value={question.option2} name="list-radio" className="w-10 h-4 " />
                            <label htmlFor="list-radio-b" className="w-full py-3 ms-2  font-extralight">
                                <p className={`text-l ${!disabled ? "text-lime-300" : question.correctresponse == question.option2 ? "text-green-600" : "text-red-600"} font-bold`}>
                                    <span className="text-green-400 mr-1">b. </span>{question.option2}</p>
                            </label>
                        </div>
                    </li>
                    <li className="w-full rounded-t-lg">
                        <div className="flex items-center ps-3">
                            <input onChange={responseHandler} disabled={disabled} checked={(response == question.option3)}
                                id="list-radio-c" type="radio" value={question.option3} name="list-radio" className="w-10 h-4" />
                            <label htmlFor="list-radio-c" className="w-full py-3 ms-2  font-extralight">
                                <p className={`text-l ${!disabled ? "text-lime-300" : question.correctresponse == question.option3 ? "text-green-600" : "text-red-600"} font-bold`}>
                                    <span className="text-green-400 mr-1">c. </span>{question.option3}</p>
                            </label>
                        </div>
                    </li>
                    <li className="w-full rounded-t-lg">
                        <div className="flex items-center ps-3">
                            <input onChange={responseHandler} disabled={disabled} checked={(response == question.option4)}
                                id="list-radio-d" type="radio" value={question.option4} name="list-radio" className="w-10 h-4" />
                            <label htmlFor="list-radio-d" className="w-full py-3 ms-2  font-extralight">
                                <p className={`text-l ${!disabled ? "text-lime-300" : question.correctresponse == question.option4 ? "text-green-600" : "text-red-600"} font-bold`}>
                                    <span className="text-green-400 mr-1">d. </span>{question.option4}</p>
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