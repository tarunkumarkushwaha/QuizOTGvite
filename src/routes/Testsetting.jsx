import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Foot from "../components/Foot"
import { Context } from '../MyContext';
import { useContext } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import AddQuestions from "../components/AddQuestions";
import { toast } from "react-toastify";

const Testsetting = () => {
  const { signIn, CustomQuestions, testSub, settestSub } = useContext(Context);
  let navigate = useNavigate()

  const starttest = () => {
    setstart(true)
    toast.warn("test has started")
    navigate("/customtest")
    localStorage.setItem('questions', JSON.stringify(CustomQuestions))
  }
  const jstest = () => {
    toast.warn("test has started")
    navigate("/test")
  }

  return (
    <>
      <Navbar />
      {signIn ? <div className="mainbg bg-no-repeat bg-left min-h-[87vh] flex items-center p-10 flex-col">
        <h1 className="text-3xl bg-green-100 m-10 rounded-lg p-5 text-slate-900 font-sans">Test settings</h1>

        <div className="flex">
          <div className="flex flex-col justify-center">
            {/* <TextField id="outlined-basic" type="number" onChange={(e)=>setmin(e.target.value)} label="Outlined" variant="outlined" /> */}
            <div className="w-96">
              <FormControl className="bg-slate-300" fullWidth>
                <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={testSub}
                  label="Subject"
                  onChange={(e) => {
                    let ee = e.target.value
                    settestSub(ee)
                  }
                  }
                >
                  <MenuItem value={"HTML"}>HTML</MenuItem>
                  <MenuItem value={"CSS"}>CSS</MenuItem>
                  <MenuItem value={"Javascript"}>Javascript</MenuItem>
                  <MenuItem value={"React"}>React</MenuItem>
                  <MenuItem value={"Previous paper"}>Previous paper</MenuItem>
                  <MenuItem value={"Your Questions"}>Your Custom Questions</MenuItem>
                </Select>
              </FormControl>
            </div>
            {testSub !== "Your Questions" && testSub !== "Previous paper" &&
              <div className="flex">
                <button type="button" onClick={jstest} className="mt-10 w-96 h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
                  {testSub}
                </button>
              </div>}
            {testSub == "Your Questions" && <><AddQuestions />
            </>
            }
            {CustomQuestions.length > 0 ? testSub == "Previous paper" && <><button type="button" onClick={starttest} className="mt-10 w-96 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
              Start test
            </button>
            </> : testSub == "Previous paper" && <h1 className="text-xl p-5 text-lime-800 font-sans">There is no previous questions available</h1>
            }
            {CustomQuestions.length > 0 && testSub == "Your Questions" && <button type="button" onClick={starttest} className="mt-10 w-96 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
              Start test
            </button>}
          </div>
        </div>
      </div>
        : <><div className="mainbg bg-no-repeat bg-left min-h-[87vh] flex justify-between items-center p-10 flex-col">
          <h1 className="text-3xl text-lime-800 font-sans">Please log in to use app</h1>
          <button type="button" className="h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            <Link to={"/login"}>login</Link>
          </button>
        </div></>
      }
      <Foot />
    </>
  )
}

export default Testsetting