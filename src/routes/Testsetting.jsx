import { useNavigate } from "react-router-dom"
import { Context } from '../MyContext';
import { useContext, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import AddQuestions from "../components/AddQuestions";
import { toast } from "react-toastify";
import PleaseLogin from "../components/PleaseLogin.jsx";

const Testsetting = () => {
  const { signIn, CustomQuestions, testSub, settestSub, setstart, setmin } = useContext(Context);
  let navigate = useNavigate()
  // console.log(min)
  const starttest = () => {
    setstart(true)
    toast.warn("test has started")
    navigate("/customtest")
    localStorage.setItem('questions', JSON.stringify(CustomQuestions))
  }
  const jstest = () => {
    setstart(true)
    toast.warn("test has started")
    navigate("/test")
  }

  return (
    <>
      {signIn ? <div className="mainbg bg-no-repeat bg-left min-h-[87vh]">
      <div className="bg-slate-950/60 min-h-[87vh] flex item-center p-10 flex-col">
        <h1 className=" smooth-entry text-3xl m-1 p-5 text-slate-100 text-center font-sans">
          Test settings</h1>

        <div className="flex flex-col justify-center items-center smooth-entry">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="md:w-96 w-52 m-4">
              <FormControl className="bg-slate-300 rounded-md" fullWidth>
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
                  <MenuItem value={"html"}>HTML</MenuItem>
                  <MenuItem value={"css"}>CSS</MenuItem>
                  <MenuItem value={"Javascript"}>Javascript</MenuItem>
                  <MenuItem value={"React"}>React</MenuItem>
                  <MenuItem value={"wordpress"}>wordpress</MenuItem>
                  <MenuItem value={"Previous paper"}>Previous paper</MenuItem>
                  <MenuItem value={"Your Questions"}>Your Custom Questions</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="m-4">
            {/* <TextField id="outlined-basic" type="number" onChange={(e)=>setmin(e.target.value)} label="Outlined" variant="outlined" /> */}
            {testSub !== "Your Questions" && testSub !== "Previous paper" &&
              <div className="flex">
                <button type="button" onClick={jstest} className="md:w-60 w-40 h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Start test
                </button>
              </div>}
            {CustomQuestions.length > 0 ? testSub == "Previous paper" && <><button type="button" onClick={starttest} className="md:w-60 w-40 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Start test
            </button>
            </> : testSub == "Previous paper" && <h1 className="md:w-60 w-40 md:text-xl text-lg text-center text-lime-100 font-sans">not available</h1>
            }
            {testSub == "Your Questions" && <button type="button" onClick={starttest} className="md:w-60 w-40 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Start test
            </button>}
          </div>
          </div>
          {testSub == "Your Questions" && <><AddQuestions />
          </>}
        </div>
      </div>
      </div>
        :
        <PleaseLogin />
      }
    </>
  )
}

export default Testsetting