// import Foot from "../components/Foot"
// import Navbar from "../components/Navbar"
import { useState } from 'react';
import { CircularProgress } from "@mui/material";
// import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AddNewsModal from "../components/AddNewsModal";
import { useContext } from 'react';
import { Context } from '../MyContext';
import NewsObject from "../components/NewsObject";
// import { useEffect } from "react";
import { Link } from "react-router-dom"

const Discussions = () => {
  // const [discuss, setdiscuss] = useState(false)
  const [postitems, setpostitems] = useState([])
  const [post, setpost] = useState("")
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const { dark, signIn } = useContext(Context);

  const style = {
    ui: dark ?
      "bg-slate-700"
      :
      "bg-gradient-to-b from-green-50 to-green-200 "
  }

  // useEffect(() => {
  //   postitems.length && localStorage.setItem("Posts", JSON.stringify(postitems))
  // }, [postitems])

  // useEffect(() => {
  //   const POSTS = JSON.parse(localStorage.getItem('Posts'));
  //   if (POSTS) {
  //     setpostitems(POSTS);
  //   }
  // }, [])


  return (

    <>
      {/* <Navbar /> */}
      {signIn ? <div className={`${style.ui} min-h-[87vh] flex justify-center items-center p-10 flex-col`}>
        <div className='smooth-entry mx-2 flex xl:flex-row justify-center item-center gap-4 flex-col'>
          <div className='w-full max-w-xl xl:mx-0 mx-auto'>
            <div onClick={() => { setShowAddNewsModal(true) }} className='w-[30vw] shadow mx-auto my-0 p-1.5 rounded-lg border bg-white border-[#D1D5DB] flex items-center flex-col no-scrollbar'>
              <textarea
                type="text"
                rows={5}
                value={post}
                // disabled={true}
                onChange={(e) => setpost(e.target.value)}
                className="bg-[#F9FAFB] w-full self-start flex border resize-none active:border-gray-300 border-gray-300 focus:ring-blue-600 focus:outline-none focus:ring-1 rounded py-2 px-3 text-tiny"
                placeholder="Share your thoughts on the test"
              />
              <div className='flex flex-row w-full p-1 pt-2 justify-between'>
                <div className='flex flex-row '>
                  <button className='mx-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M2.66645 0.777832C1.68461 0.777832 0.888672 1.57377 0.888672 2.55561V11.4445C0.888672 12.4263 1.68461 13.2223 2.66645 13.2223H13.3331C14.315 13.2223 15.1109 12.4263 15.1109 11.4445V2.55561C15.1109 1.57377 14.315 0.777832 13.3331 0.777832H2.66645ZM13.3331 11.4445H2.66645L6.22201 4.33339L8.88867 9.66672L10.6664 6.11117L13.3331 11.4445Z" fill="#6B7280" />
                    </svg>
                  </button>
                  <button className='mx-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M15.9998 23.1109C19.9271 23.1109 23.1109 19.9271 23.1109 15.9998C23.1109 12.0724 19.9271 8.88867 15.9998 8.88867C12.0724 8.88867 8.88867 12.0724 8.88867 15.9998C8.88867 19.9271 12.0724 23.1109 15.9998 23.1109ZM13.3331 15.1109C13.824 15.1109 14.222 14.7129 14.222 14.222C14.222 13.7311 13.824 13.3331 13.3331 13.3331C12.8422 13.3331 12.4442 13.7311 12.4442 14.222C12.4442 14.7129 12.8422 15.1109 13.3331 15.1109ZM19.5553 14.222C19.5553 14.7129 19.1574 15.1109 18.6664 15.1109C18.1755 15.1109 17.7776 14.7129 17.7776 14.222C17.7776 13.7311 18.1755 13.3331 18.6664 13.3331C19.1574 13.3331 19.5553 13.7311 19.5553 14.222ZM19.1425 19.1424C19.4896 18.7953 19.4896 18.2325 19.1425 17.8853C18.7953 17.5382 18.2325 17.5382 17.8854 17.8853C16.844 18.9267 15.1556 18.9267 14.1142 17.8853C13.767 17.5382 13.2042 17.5382 12.8571 17.8853C12.51 18.2325 12.51 18.7953 12.8571 19.1424C14.5927 20.8781 17.4068 20.8781 19.1425 19.1424Z" fill="#6B7280" />
                    </svg>
                  </button>
                </div>
                <div className='flex flex-row justify-center'>
                  <button
                    onClick={() => { setShowAddNewsModal(true) }} className='py-2 px-1 w-24 bg-[#EAEAEA] hover:bg-[#F3F4F6] active:bg-[#96A2FF] text-tiny font-medium text-[#6B7280] rounded'>
                    Create Post</button>
                </div>
              </div>
            </div>
            <AddNewsModal
              open={showAddNewsModal}
              postitems={postitems}
              setpostitems={setpostitems}
              onCancelClick={() => setShowAddNewsModal(false)}
            />

            {/* post items  */}


            {postitems.map((item, index) =>
              <NewsObject item={item} postitems={postitems} setpostitems={setpostitems} key={"post no - " + index} />
            )}
          </div>
        </div>
        {/* } */}
      </div> : <><div className="mainbg bg-no-repeat bg-left min-h-[87vh] flex justify-between items-center p-10 flex-col">
        <h1 className="smooth-entry text-3xl text-lime-800 font-sans">Please log in to use app</h1>
        <CircularProgress />
        <button type="button" className="h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          <Link to={"/login"}>login</Link>
        </button>
      </div></>
      }
      {/* <Foot /> */}
    </>
  )
}

export default Discussions