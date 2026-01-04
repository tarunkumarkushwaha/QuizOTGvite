const Contact = () => {
    return (
        <div className="mainbg bg-no-repeat bg-left min-h-screen">
            <div className="min-h-screen bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-slate-950/80 flex items-center justify-center px-4">

                <div className="smooth-entry max-w-md w-full rounded-2xl 
          bg-white/10 backdrop-blur-xl border border-white/10 
          shadow-2xl shadow-black/40 p-8 text-center">

                    <h1 className="text-3xl font-extrabold text-white mb-3">
                        Get in Touch
                    </h1>

                    <p className="text-slate-300 text-sm mb-8">
                        Have feedback, ideas, or collaboration in mind?
                        Feel free to reach out.
                    </p>

                    <div className="mb-6">
                        <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                            Email
                        </p>
                        <a
                            href="mailto:tkk.tarunkushwaha05@gmail.com"
                            className="text-sky-400 font-medium hover:underline break-all"
                        >
                            tkk.tarunkushwaha05@gmail.com
                        </a>
                    </div>

                    <div className="mb-8">
                        <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                            Portfolio / Contact Site
                        </p>
                        <a
                            href="https://tarunkushwahaportfolio.netlify.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 font-medium hover:underline"
                        >
                            tarunkushwahaportfolio.netlify.app
                        </a>
                    </div>

                    {/* <a
                        href="https://tarunkushwahaportfolio.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full
              rounded-xl px-6 py-3 text-sm font-semibold text-white
              bg-gradient-to-r from-green-400 to-blue-600
              shadow-lg shadow-blue-500/30
              transition-all duration-300
              hover:shadow-blue-500/50 hover:-translate-y-1 active:scale-95"
                    >
                        Visit Contact Page
                    </a> */}
                </div>
            </div>
        </div>
    );
};

export default Contact;
