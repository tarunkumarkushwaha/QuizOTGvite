

const Timeover = ({ finalSubmit,style }) => {

  return (
    <>
      <div className={`${style} h-[87vh] flex justify-center items-center p-10 flex-col`}>
        <div className="flex flex-col smooth-entry">
          <h1 className="font-bold text-2xl p-10">Your test is over </h1>
          <button type="button" onClick={finalSubmit} className="h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
            Final Submit
          </button>
        </div>
      </div>
    </>
  )
}

export default Timeover