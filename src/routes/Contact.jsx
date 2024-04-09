import Foot from "../components/Foot"
import Navbar from "../components/Navbar"

const Contact = () => {
    return (
        <>
            <Navbar />
            <div className="mainbg text-xl text-slate-900 bg-no-repeat bg-left min-h-[87vh] flex justify-center items-center p-10 flex-col">
              <p className=" smooth-entry"> email- tkk_tarunkumar04@gmail.com </p>
            </div>
            <Foot/>
        </>
    )
}

export default Contact