import { Context } from "../MyContext";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const InterviewSetting = ({ setinterviewsetting }) => {
  const [customRole, setCustomRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    role: "",
    level: "Beginner",
    type: "mixed",
    count: 5,
  });

  const {
    InterviewQuestions,
    setInterviewQuestions,
    backendURL,
    accessToken,
    authFetch,
  } = useContext(Context);

  const navigate = useNavigate();

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "React Developer",
    "React Native Developer",
    "Node.js Developer",
    "JavaScript Developer",
    "Python Developer",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStart = async () => {
    try {
      const finalRole = settings.role === "custom" ? customRole : settings.role;

      const payload = {
        ...settings,
        role: finalRole,
      };

      if (!payload.role) {
        alert("Please select or enter a role");
        return;
      }

      setLoading(true);

      const response = await authFetch("/ask/interview/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate interview");
        return;
      }

      console.log(data);
      setInterviewQuestions(data);
      navigate(`/interview`);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mainbg mt-10 bg-no-repeat bg-left min-h-screen">
      <div className="bg-slate-950/70 min-h-screen flex justify-center items-start px-4 py-10">
        <div
          className="smooth-entry w-full max-w-4xl 
          bg-white/10 backdrop-blur-xl border border-white/10 
          rounded-2xl shadow-2xl shadow-black/40 p-8"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100">
              AI Interview Mode
            </h1>

            <p className="text-slate-300 mt-3 text-sm md:text-base">
              Practice realistic interview questions and get AI-powered feedback
              on your answers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-200 mb-2 font-medium">
                Select Role
              </label>

              <select
                name="role"
                value={settings.role}
                onChange={handleChange}
                className="w-full bg-slate-900/80 border border-slate-700 
                text-slate-100 rounded-xl px-4 py-3 outline-none 
                focus:border-cyan-500 transition-all"
              >
                <option value="">Choose Role</option>

                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}

                <option value="custom">Other (Custom Role)</option>
              </select>
            </div>

            {settings.role === "custom" && (
              <div>
                <label className="block text-slate-200 mb-2 font-medium">
                  Enter Custom Role
                </label>

                <input
                  type="text"
                  placeholder="Example: DevOps Engineer"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-700 
                  text-slate-100 rounded-xl px-4 py-3 outline-none 
                  focus:border-cyan-500 transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-slate-200 mb-2 font-medium">
                Experience Level
              </label>

              <select
                name="level"
                value={settings.level}
                onChange={handleChange}
                className="w-full bg-slate-900/80 border border-slate-700 
                text-slate-100 rounded-xl px-4 py-3 outline-none 
                focus:border-cyan-500 transition-all"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Experienced">Experienced</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-200 mb-2 font-medium">
                Interview Type
              </label>

              <select
                name="type"
                value={settings.type}
                onChange={handleChange}
                className="w-full bg-slate-900/80 border border-slate-700 
                text-slate-100 rounded-xl px-4 py-3 outline-none 
                focus:border-cyan-500 transition-all"
              >
                <option value="mixed">Mixed</option>
                <option value="coding">Coding</option>
                <option value="theory">Theory</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-200 mb-2 font-medium">
                Number of Questions
              </label>

              <input
                type="number"
                name="count"
                min={1}
                max={20}
                value={settings.count}
                onChange={handleChange}
                className="w-full bg-slate-900/80 border border-slate-700 
                text-slate-100 rounded-xl px-4 py-3 outline-none 
                focus:border-cyan-500 transition-all"
              />
            </div>
          </div>

          <div className="mt-10 flex justify-center gap-4">
            <button
              type="button"
              onClick={() => setinterviewsetting(false)}
              disabled={loading}
              className={`px-10 py-3 text-sm font-bold text-white rounded-xl
              bg-gradient-to-r from-green-400 to-blue-600
              shadow-lg shadow-blue-500/30
              transition-all duration-300
              hover:shadow-blue-500/50 hover:-translate-y-0.5
              active:scale-95
              ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              Back to Normal Mode
            </button>
            <button
              onClick={handleStart}
              disabled={loading}
              className={`px-10 py-3 text-sm font-bold text-white rounded-xl
              bg-gradient-to-r from-green-400 to-blue-600
              shadow-lg shadow-blue-500/30
              transition-all duration-300
              hover:shadow-blue-500/50 hover:-translate-y-0.5
              active:scale-95
              ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              Start AI Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSetting;
