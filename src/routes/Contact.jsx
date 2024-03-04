import Foot from "../components/Foot"
import Navbar from "../components/Navbar"

const Contact = () => {
    return (
        <>
            <Navbar />
            <div className="bg-[url('src/assets/mainbg.jpg')] text-xl text-slate-900 bg-no-repeat bg-left min-h-[87vh] flex justify-center items-center p-10 flex-col">
               email- tkk_tarunkumar04@gmail.com
            </div>
            <Foot/>
        </>
    )
}

export default Contact