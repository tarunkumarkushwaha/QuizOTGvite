import { useNavigate } from "react-router-dom"
import { Context } from '../MyContext';
import { useContext } from 'react';

const Home = () => {
  const { accessToken, loading } = useContext(Context);
  let navigate = useNavigate()

  const TestSetting = () => {
    navigate("/testsetting")
  }
  const login = () => {
    navigate("/login")
  }
  return (
    <>
      <div className="mainbg bg-no-repeat bg-left min-h-screen">

        <div className="min-h-screen bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-slate-950/80 flex flex-col justify-center relative">


          <div className="smooth-entry flex flex-col items-center text-center px-6">

            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-xs tracking-wide text-sky-300 backdrop-blur-md">
              Learn - Practice - Win
            </span>


            <h1 className="font-sans font-extrabold text-white 
        text-3xl sm:text-4xl md:text-6xl 
        leading-tight max-w-3xl">
              Welcome to <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                QuizOTG
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed">
              Master your knowledge with interactive quizzes and challenges.
              Pick a subject, test your skills, and grow smarter with every attempt.
            </p>

            {loading && <div className="flex smooth-entry items-center my-4 justify-center text-white">
              <div className="text-center">
                <div className="text-xl font-semibold mb-3">
                  Starting server…
                </div>
                <p className="text-sm text-slate-400">
                  Free-tier backend may take up to 30 seconds
                </p>
              </div>
            </div>}


            <div className="mt-10 smooth-entry">
              {accessToken ? (
                <button
                  onClick={TestSetting}
                  className="group relative inline-flex items-center justify-center
              px-8 py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-green-400 to-blue-600
              shadow-lg shadow-blue-500/30
              transition-all duration-300
              hover:shadow-blue-500/50 hover:-translate-y-1 active:scale-95">

                  <span className="relative z-10">Start Test</span>


                  <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition" />
                </button>
              ) : (
                <button
                  onClick={login}
                  className="group relative inline-flex items-center justify-center
              px-8 py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-green-400 to-blue-600
              shadow-lg shadow-green-500/30
              transition-all duration-300
              hover:shadow-green-500/50 hover:-translate-y-1 active:scale-95">

                  <span className="relative z-10">{loading ? "Starting server…" : "Sign In"}</span>
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

    </>
  )
}

export default Home