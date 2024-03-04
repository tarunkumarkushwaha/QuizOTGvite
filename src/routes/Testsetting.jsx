import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Foot from "../components/Foot"
import { Context } from '../MyContext';
import { useContext, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AddQuestions from "../components/AddQuestions";
import { toast } from "react-toastify";

const Testsetting = () => {
  const { signIn, Questions } = useContext(Context);
  const [testSub, settestSub] = useState("")
  let navigate = useNavigate()

  const starttest = () => {
    toast.warn("test has started")
    navigate("/fulltest")
    localStorage.setItem('questions', JSON.stringify(Questions))
  }
  const jstest = () => {
    toast.warn("test has started")
    navigate("/onebyone")
  }

  return (
    <>
      <Navbar />
      {signIn ? <div className="min-h-[87vh] bg-lime-200 flex items-center p-10 flex-col">
        <h1 className="text-3xl p-5 text-lime-800 font-sans">Test setting</h1>

        <div className="flex">
          <div className="flex flex-col justify-center">
            {/* <h1 className="text-xl p-10 text-lime-800 font-sans">choose test type</h1> */}
            <div className="w-96">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={testSub}
                  label="Subject"
                  onChange={(e) => { settestSub(e.target.value)
                  }
                }
                >
                  <MenuItem value={"Javascript test"}>Javascript test</MenuItem>
                  <MenuItem value={"Previous paper"}>Previous paper</MenuItem>
                  <MenuItem value={"Your Questions"}>Your Questions</MenuItem>
                </Select>
              </FormControl>
            </div>
            {testSub == "Javascript test" &&
              <div className="flex">
                <button type="button" onClick={jstest} className="mt-10 w-96 h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
                  javascript test
                </button>
              </div>}
            {testSub == "Your Questions" && <><AddQuestions />
            </>
            }
            {Questions.length >0 ? testSub == "Previous paper" && <><button type="button" onClick={starttest} className="mt-10 w-96 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
              Start test
            </button>
            </>: testSub == "Previous paper" && <h1 className="text-xl p-5 text-lime-800 font-sans">There is no previous questions available</h1>
            }
            {Questions.length > 0 && testSub == "Your Questions" && <button type="button" onClick={starttest} className="mt-10 w-96 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
              Start test
            </button>}
          </div>
        </div>
      </div>
        : <><div className="bg-[url('/assets/mainbg.jpg')] bg-no-repeat bg-left h-[87vh] flex justify-between items-center p-10 flex-col">
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