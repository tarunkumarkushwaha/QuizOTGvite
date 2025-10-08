import React from 'react'
import { Link } from "react-router-dom"
const PleaseLogin = () => {
  return (
    <>
      <div className="mainbg bg-no-repeat bg-left min-h-screen">
        <h1 className="smooth-entry text-3xl text-lime-800 font-sans">Please log in to use app</h1>
        <button type="button" className="smooth-entry h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          <Link to={"/login"}>login</Link>
        </button>
      </div>
    </>
  )
}

export default PleaseLogin