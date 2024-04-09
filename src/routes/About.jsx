import Foot from "../components/Foot"
import Navbar from "../components/Navbar"

const About = () => {
    return (
        <>
            <Navbar />
            <div className="mainbg bg-no-repeat bg-left min-h-[87vh] p-8 flex xl:flex-col h-[80vh] justify-center item-center gap-4 flex-col">

                <div className="smooth-entry flex justify-center item-center">
                    <h2 className="text-4xl text-slate-800 font-bold ">Quiz on the go</h2>
                </div>
                <div className="smooth-entry flex justify-center item-center">
                    <h3 className="text-3xl text-slate-700 font-bold">The app that makes it easy to create and take tests.</h3>
                </div>
                <div className="smooth-entry flex text-3xl justify-center item-center">
                    <h1 className="text-slate-700">
                        Salient features
                    </h1>
                </div>
                <div className="smooth-entry flex justify-center item-center">

                    <div className="flex-col text-slate-800">

                        <p>1. It is completely open source and free</p>
                        <p>2. features different test formats</p>
                        <p>3. Discussion forums</p>
                    </div>
                </div>

            </div>
            <Foot/>
        </>
    )
}

export default About