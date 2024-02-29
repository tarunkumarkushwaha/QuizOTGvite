import Foot from "../components/Foot"
import Navbar from "../components/Navbar"

const Contact = () => {
    return (
        <>
            <Navbar />
            <div className="bg-[url('src/assets/mainbg.jpg')] bg-no-repeat bg-left h-[87vh] flex justify-center items-center p-10 flex-col">
               email- tkk.tarunkumar02@gmail.com
            </div>
            <Foot/>
        </>
    )
}

export default Contact