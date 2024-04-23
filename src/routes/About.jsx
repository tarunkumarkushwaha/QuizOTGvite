

const About = () => {
    return (
        <>
            <div className="mainbg bg-no-repeat bg-left h-[85vh]">
                <div className="bg-slate-950/60 h-[85vh] flex justify-center m-0 item-center flex-col">
                    <div className="smooth-entry flex justify-center item-center">
                        <h2 className="sm:text-4xl text-3xl text-slate-100 font-bold p-2">Quiz on the go</h2>
                    </div>
                    <div className="smooth-entry flex justify-center item-center">
                        <h3 className="md:text-sm text-xs text-slate-100 text-center font-medium px-2">The app that makes it easy to create and take tests.</h3>
                    </div>
                    <div className="smooth-entry flex sm:text-2xl text-xl font-medium justify-center item-center">
                        <h1 className="text-slate-100 p-5">
                            Salient features
                        </h1>
                    </div>
                    <div className="smooth-entry flex justify-center item-center">
                        <div className="flex-col text-slate-100 md:text-lg text-xs gap-2 px-2">
                            <p>1. It is completely open source and free</p>
                            <p>2. Preloaded coding test</p>
                            <p>3. custom test</p>
                            <p>4. Discussion forums</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default About