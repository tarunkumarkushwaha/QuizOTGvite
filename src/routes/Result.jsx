import { Link } from "react-router-dom"
import Foot from "../components/Foot"
import Navbar from "../components/Navbar"
import { useContext } from 'react';
import { Context } from '../MyContext';
import questions from "../questions/questions"
// import { useEffect, useRef, useState } from "react";
import {useRef} from "react";

const Result = () => {
  // const [items, setItems] = useState([correctresponse, incorrectresponse]);

  const { correctresponse } = useContext(Context);
  const { incorrectresponse } = useContext(Context);
  const { dark } = useContext(Context);

  const style = {
    ui: dark ?
      "bg-slate-700"
      :
      "bg-gradient-to-b from-green-50 to-green-200 "
  }
  // useEffect(() => {
  //   localStorage.setItem('items', JSON.stringify(items));
  // }, [items]);

  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem('items'));
  //   if (items) {
  //     setItems(items);
  //   }
  // }, []);

  const percentage = useRef((correctresponse / questions.length) * 100)

  // const Improvement = useRef(`${Number(Math.round((percentage.current - parseInt(items[0] / questions.length)) + 'e2') + 'e-2')} %`)


  return (
    <>
      <Navbar />
      <div className={`${style.ui} h-[87vh] flex justify-center items-center p-10 flex-col`}>

        <h1 className="text-3xl text-lime-500 font-sans">Result</h1>
        <div className="flex">
          your result
        </div>
        <div className="flex">
          correct responses - {correctresponse}
        </div>
        <div className="flex">
          incorrect responses - {incorrectresponse}
        </div>
        <div className="flex">
          unattemped question - {questions.length - (incorrectresponse + correctresponse)}
        </div>
        <div className="flex">
          total question - {questions.length}
        </div>
        <div className="flex">
          Percentage - {percentage.current}
        </div>
        {/* <div className="flex">
          Percentage - {Improvement}
        </div> */}
        <div className="flex justify-between">
          <button type="button" className="h-10 m-[5%] text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
            <Link to={"/discussions"}>discussions</Link>
          </button>
        </div>
      </div>
      <Foot />
    </>
  )
}

export default Result