import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"
import { useContext } from 'react';
import { Context } from '../MyContext';
import { toast } from "react-toastify";

const Navbar = () => {
  const { dark, themeChange, signIn, setsignIn, name } = useContext(Context);
  let navigate = useNavigate()

  const handleLogout = () => {
    toast.success(`user ${name} has successfully signed out`)
    localStorage.setItem('login', JSON.stringify(false));
    navigate("/login")
    setsignIn(false)
  }
  const style = {
    btnMode: !dark ?
      "from-green-600 to-blue-900"
      :
      "from-green-100 to-blue-200"
    ,
    uiMode: dark ?
      "bg-slate-900"
      :
      "bg-green-200"

    ,
    text: dark ?
      "text-white"
      :
      "text-grey-500"
  }

  return (
    <>
      <nav className={`${style.uiMode} shadow shadow-gray-300 w-100 px-8 md:px-auto`}>
        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">

          <div className="text-indigo-500 md:order-1">
            <Link to="/">
              <img className="h-10 w-25" src={logo} alt="QUIZ OTG" />
            </Link>
          </div>
          <div className={`${style.text} border-3 w-full md:w-auto md:order-2`}>
            <ul className="flex font-semibold justify-between">

              <li className="md:px-4 md:py-2 hover:text-indigo-400"><Link to="/">Home</Link></li>
              <li className="md:px-4 md:py-2 hover:text-indigo-400"><Link to="/about">About</Link></li>
              <li className="md:px-4 md:py-2 hover:text-indigo-400"><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="order-2 md:order-3">
            {signIn ?
              <button type="button" onClick={handleLogout} className="h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                log out
              </button>
              :
              <button type="button" className="h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                <Link to={"/login"}>login</Link>
              </button>
            }
            <button className={`${style.btnMode} h-10 mt-2 text-white bg-gradient-to-br hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-2 text-center me-2 mb-2`}
              onClick={themeChange}>
              {dark ? 
              <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"/>
              <path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,
              0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1
              ,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,
              1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39
              ,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,
              1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/>
              </svg>
               : 
               <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"/>
               <path d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/></svg>
               }
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar