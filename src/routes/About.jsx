const About = () => {
    return (
        <div className="mainbg bg-no-repeat bg-left mt-10 min-h-screen">
            <div className="min-h-screen bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-slate-950/80 px-6 py-16">

                <div className="smooth-entry text-center mb-14">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                        Quiz on the Go
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-slate-300 text-sm sm:text-base">
                        A modern quiz platform designed to help you practice, test, and improve your skills —
                        anytime, anywhere.
                    </p>
                </div>


                <div className="smooth-entry max-w-4xl mx-auto">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white mb-8 text-center">
                        What makes QuizOTG special?
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-6">

                        <div className="rounded-xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 text-slate-200">
                            <h3 className="font-semibold text-white mb-2">
                                Preloaded Quizzes
                            </h3>
                            <p className="text-sm">
                                Ready-to-use quizzes across multiple topics, especially coding,
                                so you can start testing instantly.
                            </p>
                        </div>

                        <div className="rounded-xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 text-slate-200">
                            <h3 className="font-semibold text-white mb-2">
                                AI-Powered Question Generation
                            </h3>
                            <p className="text-sm">
                                Generate quizzes dynamically using AI based on your prompt
                                and desired difficulty.
                            </p>
                        </div>

                        <div className="rounded-xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 text-slate-200">
                            <h3 className="font-semibold text-white mb-2">
                                Anti-Cheat Mechanism
                            </h3>
                            <p className="text-sm">
                                Built-in anti-cheat measures to ensure fair test attempts
                                and reliable results.
                            </p>
                        </div>

                        <div className="rounded-xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 text-slate-200">
                            <h3 className="font-semibold text-white mb-2">
                                Manual CSV Question Upload
                            </h3>
                            <p className="text-sm">
                                Upload your own custom questions using CSV files
                                and create personalized tests effortlessly.
                            </p>
                        </div>

                        <div className="rounded-xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 text-slate-200">
                            <h3 className="font-semibold text-white mb-2">
                                Save Custom Questions
                            </h3>
                            <p className="text-sm">
                                Store and reuse your personally created questions
                                for future practice and assessments.
                            </p>
                        </div>

                        <div className="rounded-xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 text-slate-200">
                            <h3 className="font-semibold text-white mb-2">
                                Mobile App Availability
                            </h3>
                            <p className="text-sm">
                                QuizOTG is also available as a mobile app on the
                                <span className="text-emerald-400 font-medium"> Amazon App Store</span>,
                                making practice truly on-the-go.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="smooth-entry mt-14 max-w-3xl mx-auto text-center">
                    <p className="text-sm text-slate-400">
                        <span className="font-medium text-slate-300">Discussion Forum</span> is currently in development
                        and will be added in a future update.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default About;
