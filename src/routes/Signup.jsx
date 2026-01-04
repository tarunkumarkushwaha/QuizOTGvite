import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Context } from '../MyContext';
import { useContext } from 'react';
import { useState } from "react"

const Signup = () => {
  const [naam, setnaam] = useState("")
  const [password, setpassword] = useState("")
  const [showpass, setshowpass] = useState(false)
  const [checkpassword, setcheckpassword] = useState("")
  const { setuserName, backendURL } = useContext(Context);

  const passwordValidator = (pass) => {
    let passobject = { password: pass, error: false, errormessege: "" }
    if (pass.length > 8) {
      let capital = []
      let small = []
      let specialordigit = []
      pass.split('').map((char) => {
        if (char.charCodeAt() >= 65 && char.charCodeAt() <= 90) {
          capital.push(char)
        }
        else if (char.charCodeAt() >= 97 && char.charCodeAt() <= 122) {
          small.push(char)
        } else { specialordigit.push(char) }
      })
      if (capital.length < 1) {
        passobject.error = true
        passobject.errormessege = "password must contain a capital letter"
        return passobject
      }
      if (specialordigit.length < 1) {
        passobject.error = true
        passobject.errormessege = "password must contain a special letter"
        return passobject
      }
      else { return passobject }
    }
    else if (pass.length < 8 || pass.length == 0) {
      passobject.error = true
      passobject.errormessege = "password must be of 8 characters"
      return passobject
    }
  }

  const handle = async () => {
    setuserName(naam)
    let username = naam
    try {
      const res = await fetch(`${backendURL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) return toast.error(await res.text());
      toast.success("User created! You can now login.");
      navigate("/login");
    } catch {
      toast.error("Server error");
    }
  };

  let navigate = useNavigate()

  const handleSignup = () => {
    if (naam.length <= 3) {
      toast.error("name must be of 3 characters")
      return
    }

    // if (passwordValidator(password).error) {
    //   let messege = passwordValidator(password).errormessege
    //   toast.error(messege)
    //   return
    // }
    if (checkpassword == password) {
      handle()
      navigate("/login")
      toast.success("account created")
      localStorage.setItem('Name', JSON.stringify(naam));
    }
    else { toast.error("confirm password do not match") }
  }

  return (
    <>
      <section className="mainbg mt-10 bg-no-repeat bg-left min-h-screen">
        <div className="min-h-screen bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-slate-950/80 flex items-center justify-center px-4">

          <div className="smooth-entry w-full max-w-md">

            <div className="rounded-2xl bg-white/10 backdrop-blur-xl 
          border border-white/10 shadow-2xl shadow-black/40">

              <div className="p-8 space-y-6">

                <div className="text-center">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                    Create your account
                  </h1>
                  <p className="mt-2 text-sm text-slate-300">
                    Join QuizOTG and start practicing smarter
                  </p>
                </div>


                <div className="space-y-5">

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-1 text-sm font-medium text-slate-200"
                    >
                      Email
                    </label>
                    <input
                      value={naam}
                      onChange={(e) => setnaam(e.target.value)}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="name@anymail.com"
                      required
                      className="w-full rounded-lg px-4 py-2.5 text-sm
                    bg-white/10 text-white placeholder-slate-400
                    border border-white/10
                    focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-1 text-sm font-medium text-slate-200"
                    >
                      Password
                    </label>
                    <input
                      value={password}
                      onChange={(e) => setpassword(e.target.value.trim())}
                      type={showpass ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      required
                      className="w-full rounded-lg px-4 py-2.5 text-sm
                    bg-white/10 text-white placeholder-slate-400
                    border border-white/10
                    focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block mb-1 text-sm font-medium text-slate-200"
                    >
                      Confirm Password
                    </label>
                    <input
                      value={checkpassword}
                      onChange={(e) => setcheckpassword(e.target.value)}
                      type={showpass ? "text" : "password"}
                      name="confirm-password"
                      id="confirm-password"
                      placeholder="••••••••"
                      required
                      className="w-full rounded-lg px-4 py-2.5 text-sm
                    bg-white/10 text-white placeholder-slate-400
                    border border-white/10
                    focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      id="check"
                      name="check"
                      checked={showpass}
                      onChange={(e) => setshowpass(e.target.checked)}
                      className="accent-sky-500"
                    />
                    <label htmlFor="check">Show passwords</label>
                  </div>

                  <button
                    onClick={handleSignup}
                    className="w-full rounded-xl py-3 text-sm font-semibold text-white
                  bg-gradient-to-r from-green-400 to-blue-600
                  shadow-lg shadow-blue-500/30
                  transition-all duration-300
                  hover:shadow-blue-500/50 hover:-translate-y-0.5
                  active:scale-95"
                  >
                    Create Account
                  </button>

                  <p className="text-center text-sm text-slate-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-sky-400 hover:underline"
                    >
                      Login here
                    </Link>
                  </p>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>

  )
}

export default Signup