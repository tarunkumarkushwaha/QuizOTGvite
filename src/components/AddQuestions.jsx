import { useState } from "react"
import { useContext } from 'react';
import { Context } from '../MyContext';
import { toast } from "react-toastify";
import ViewQuestions from "./ViewQuestions";

const AddQuestions = () => {
    const [ques, setques] = useState("")
    const [Viewques, setViewques] = useState(false)
    const [option1, setoption1] = useState("")
    const [option2, setoption2] = useState("")
    const [option3, setoption3] = useState("")
    const [option4, setoption4] = useState("")
    const [correctAnswer, setcorrectAnswer] = useState("")
    const { CustomQuestions, setCustomQuestions, setmin, min } = useContext(Context);

    const removePreviousQues = () => {
        toast.success("previous questions removed")
        setCustomQuestions([])
        localStorage.setItem('questions', JSON.stringify([]))
    }

    const addquestiontotest = () => {
        setCustomQuestions((prevques) => {
            return [...prevques,
            {
                question: ques,
                option1: option1,
                option2: option2,
                option3: option3,
                option4: option4,
                correctresponse: correctAnswer,
                time: 1
            }
            ]
        })
        toast.success("question added")
        setcorrectAnswer("")
        setques("")
        setoption1("")
        setoption2("")
        setoption3("")
        setoption4("")
    }

    return (
        <>
            <div className="flex flex-col smooth-entry items-center">
                {CustomQuestions.length > 0 && <div className="flex flex-col items-center justify-center">
                    <h1 className="text-l p-1 text-lime-900 font-sans">there are some previous questions</h1>
                    <button onClick={removePreviousQues} type="button" className="h-10 md:w-60 w-28 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
                        remove Previous Questions
                    </button></div>}
                    <ViewQuestions
                    open={Viewques}
                    questions={CustomQuestions}
                    onCancelClick={()=>setViewques(false)}
                    />
                <button onClick={() => setViewques(true)} className="h-10 md:w-60 w-40 m-4 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    View Questions
                </button>
                <div className="flex flex-col items-center md:min-w-[50rem] min-w-48">
                    <div className="mb-6">
                        <label htmlFor="large-input" className=" mb-2 text-sm font-medium text-gray-100 ">Enter Question</label>
                        <textarea onChange={(e) => setques(e.target.value)} value={ques} type="text" id="large-input" className="resize-none bg-grey-50 outline-none p-4 text-gray-900 border border-gray-300 rounded-lg block md:w-[600px] sm:w-[500px] w-60"  />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="default-input" className="mb-2 text-sm font-medium text-gray-100">option 1</label>
                        <input onChange={(e) => setoption1(e.target.value)} value={option1} type="text" id="default-input" className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block md:w-[600px] sm:w-[500px] w-60 p-2.5" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="default-input" className="mb-2 text-sm font-medium text-gray-100">option 2</label>
                        <input onChange={(e) => setoption2(e.target.value)} value={option2} type="text" id="default-input" className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block md:w-[600px] sm:w-[500px] w-60 p-2.5" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="default-input" className="mb-2 text-sm font-medium text-gray-100">option 3</label>
                        <input onChange={(e) => setoption3(e.target.value)} value={option3} type="text" id="default-input" className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block md:w-[600px] sm:w-[500px] w-60 p-2.5" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="default-input" className="mb-2 text-sm font-medium text-gray-100">option 4</label>
                        <input onChange={(e) => setoption4(e.target.value)} value={option4} type="text" id="default-input" className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block md:w-[600px] sm:w-[500px] w-60 p-2.5" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="default-input" className="mb-2 text-sm font-medium text-gray-100">Correct Answer</label>
                        <input onChange={(e) => setcorrectAnswer(e.target.value)} value={correctAnswer} type="text" id="default-input" className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg block md:w-[600px] sm:w-[500px] w-60 p-2.5" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="default-input" className="mb-2 text-sm font-medium text-gray-100">Set time for all questions</label>
                        <input onChange={(e) => setmin(e.target.value)} value={min} type="text" id="default-input" className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block md:w-[600px] sm:w-[500px] w-60 p-2.5" />
                    </div>
                </div>
                <button onClick={addquestiontotest} type="button" className="h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
                    Add question
                </button>
            </div>
        </>
    )
}

export default AddQuestions