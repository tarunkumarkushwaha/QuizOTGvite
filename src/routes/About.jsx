import Foot from "../components/Foot"
import Navbar from "../components/Navbar"

const About = () => {
    return (
        <>
            <Navbar />
            <div className="bg-[url('src/assets/mainbg.jpg')] bg-no-repeat bg-left h-[87vh] p-8 flex xl:flex-col h-[80vh] justify-center item-center gap-4 flex-col">

                <div className="flex justify-center item-center">
                    <h2 className="text-4xl text-lime-800 font-bold ">Quiz on the go</h2>
                </div>
                <div className="flex justify-center item-center">
                    <h3 className="text-3xl text-lime-700 font-bold">The app that makes it easy to create and take tests.</h3>
                </div>
                <div className="flex text-3xl justify-center item-center">
                    <h1 className="text-lime-700">
                        Salient features
                    </h1>
                </div>
                <div className="flex justify-center item-center">

                    <div className="flex-col text-lime-900">

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