import Navbar from "../components/Navbar"
import { Link, useNavigate } from "react-router-dom"
// import { toast } from "react-toastify"
import Foot from "../components/Foot"
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
      <Navbar />
      <div className=" bg-[url('src/assets/mainbg.jpg')] bg-no-repeat bg-left h-[87vh] flex justify-between m-0 item-center gap-4 flex-col">
        <div className="flex justify-center item-center p-[15%]">
          <h3 className="text-3xl text-lime-700 font-sans">The app that makes it easy to create and take tests.</h3>
        </div>

        <div className="flex flex-row justify-end">
          {signIn ? <button type="button" onClick={TestSetting} className="h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Start Test
          </button> : <button type="button" className="h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            <Link to="/about">click for more detail</Link>
          </button>}
          {/*  */}
        </div>
      </div>

      <Foot />
    </>
  )
}

export default Home