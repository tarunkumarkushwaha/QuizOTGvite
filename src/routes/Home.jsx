// import Navbar from "../components/Navbar"
import { Link, useNavigate } from "react-router-dom"
// import { toast } from "react-toastify"
// import Foot from "../components/Foot"
import { Context } from '../MyContext';
import { useContext } from 'react';

const Home = () => {
  const { signIn } = useContext(Context);
  let navigate = useNavigate()

  const TestSetting = () => {
    navigate("/testsetting")
    // toast.warn("test setting")
  }
  return (
    <>
      {/* <Navbar /> */}
      <div className="mainbg bg-no-repeat bg-left h-screen">
        <div className="bg-slate-950/60 h-screen flex justify-center m-0 item-center flex-col">
          <div className="flex flex-col smooth-entry justify-center item-center">
            <h1 className="md:text-5xl text-3xl text-white font-bold text-center font-sans p-5 w-full">
              Welcome to QuizOTG!
            </h1>
            <h1 className="sm:text-xl text-base text-white self-center text-center font-sans p-5 sm:w-1/2 w-full sm:min-w-1/2 min-w-9/12">
            Master your knowledge with our diverse range of quizzes and challenges.
              Choose your subject, and dive into a world of coding quizzes designed to challenge.
              Start exploring now and unlock your potential!
            </h1>
          </div>

          <div className="absolute bottom-10 sm:right-5 right-1/2 sm:translate-x-0 translate-x-1/2 smooth-entry">
            {signIn ? <button type="button" onClick={TestSetting} className="h-10 sm:w-48 w-44 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg sm:text-sm text-xs px-5 py-2.5 text-center">
              Start Test
            </button> : <button type="button" className="h-10 sm:w-48 w-44 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg sm:text-sm text-xs px-5 py-2.5 text-center">
              <Link to="/about">click for more detail</Link>
            </button>}
          </div>
        </div>
      </div>

      {/* <Foot /> */}
    </>
  )
}

export default Home