import { Link, useNavigate } from "react-router-dom"
import Foot from "../components/Foot"
import Navbar from "../components/Navbar"
import { toast } from "react-toastify"
import { Context } from '../MyContext';
import { useContext } from 'react';
import { useEffect, useState } from "react"

const Signup = () => {
  const [naam, setnaam] = useState("")
  const [pata, setpata] = useState("")
  const [checkpata, setcheckpata] = useState("")
  const { setName, setPwd } = useContext(Context);

  const handle = () => {
    setName(naam)
    setPwd(pata)
  };

  let navigate = useNavigate()

  const handleSignup = () => {
    if(checkpata == pata){handle()
    navigate("/login")
    toast.success("account created")}
    else{toast.error("confirm password do not match")}
  }

  useEffect(() => {
    localStorage.setItem('Name', JSON.stringify(naam));
  }, [naam]);

  useEffect(() => {
    localStorage.setItem('Password', JSON.stringify(pata));
  }, [pata]);

  return (
    <>
      <Navbar />
      <section className="mainbg bg-no-repeat bg-left">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create and account
              </div>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input
                    value={naam}
                    onChange={(e) => setnaam(e.target.value)}
                    type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input
                    value={pata}
                    onChange={(e) => setpata(e.target.value)}
                    type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                  <input
                  value={checkpata}
                  onChange={(e) => setcheckpata(e.target.value)}
                  type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <button onClick={handleSignup} className="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account? <Link to={"/login"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Foot />
    </>
  )
}

export default Signup