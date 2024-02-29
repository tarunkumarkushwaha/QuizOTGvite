import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Foot from "../components/Foot"
import { Context } from '../MyContext';
import { useContext, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Testsetting = () => {
  const { signIn } = useContext(Context);
  const [testSub, settestSub] = useState("")

  return (
    <>
      <Navbar />
      {signIn ? <div className=" bg-lime-50 bg-left h-[87vh] flex justify-center items-center p-10 flex-col">
        <h1 className="text-3xl p-20 text-lime-800 font-sans">testsetting</h1>

        <div className="flex">
          <div className="flex flex-col justify-center">
            <div className="w-[200px]">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Test Subject</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={testSub}
                  label="Subject"
                  onChange={(e) => {settestSub(e.target.value)}}
                >
                  <MenuItem value={"Javascript test"}>Javascript test</MenuItem>
                  <MenuItem value={"Your Questions"}>Your Questions</MenuItem>
                  {/* <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>
            </div>
            {testSub!="" ? <div className="flex">
            <h1 className="text-xl p-10 text-lime-800 font-sans">choose test type</h1>
              <button type="button" className="h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
                <Link to={"/onebyone"}>One by one</Link>
              </button>
              <button type="button" className="h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
                <Link to={"/fulltest"}>Full test</Link>
              </button>
            </div> : <div></div>}
          </div>
        </div>
      </div>
        : <><div className="bg-[url('public/assets/mainbg.jpg')] bg-no-repeat bg-left h-[87vh] flex justify-between items-center p-10 flex-col">
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