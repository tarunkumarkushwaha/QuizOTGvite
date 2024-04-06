import Foot from "../components/Foot"
import Navbar from "../components/Navbar"

const Termsandconditions = () => {
    return (
        <>
            <Navbar />
            <div className="mainbg text-xl text-slate-900 bg-no-repeat bg-left min-h-[87vh] flex justify-center items-center p-10 flex-col">
            <h1 className="text-2xl text-slate-800 p-10">Terms and conditions</h1>
            <p>A <span title="I know spelling of messege is wrong, it is not grammer lecture">massege </span>
             to viewers from Tarun</p>
            <p>buddy do not copy projects. It takes time to create a project.</p>
            <p>if you really want to create something you can contact me</p>
            <p title="no payment for help">free of cost</p>
            </div>
            <Foot />
        </>
    )
}

export default Termsandconditions