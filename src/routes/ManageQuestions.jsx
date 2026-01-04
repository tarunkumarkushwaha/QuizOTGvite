import { toast } from "react-toastify";
import { Context } from "../MyContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizManager = () => {
  const [formData, setFormData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctresponse: "",
    time: "",
    subject: "",
  });
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const { backendURL, accessToken, setTestQuestion, setstart } = useContext(Context);

  useEffect(() => {
    getAllSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) loadQuestions();
  }, [selectedSubject]);

  const getAllSubjects = async () => {
    try {
      const res = await fetch(`${backendURL}/quiz/allsubjects`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.ok) {
        const result = await res.json();
        setSubjects(result.subjects || []);
      } else {
        setSubjects([]);
      }
    } catch (err) {
      console.error("Error fetching subjects", err);
    }
  };

  const loadQuestions = async () => {
    if (!selectedSubject) return;
    try {
      setLoading(true);
      const res = await fetch(`${backendURL}/quiz/${selectedSubject}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const result = await res.json();
      const data = Array.isArray(result) ? result : result.data || [];
      setQuestions(data);
      setLoading(false);
    } catch (err) {
      console.error("Error loading questions", err);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctresponse: "",
      time: "",
      subject: "",
    });
    setEditingId(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitQuestion = async (e) => {
    e.preventDefault();

    const subject = formData.subject.trim() || selectedSubject;
    if (!subject) return alert("Please enter or select a subject");

    const data = {
      question: formData.question,
      option1: formData.option1,
      option2: formData.option2,
      option3: formData.option3,
      option4: formData.option4,
      correctresponse: formData.correctresponse,
      time: parseInt(formData.time),
      subject,
    };

    let url = `${backendURL}/quiz/${subject}`;
    let method = "POST";
    if (editingId) {
      url = `${backendURL}/quiz/${subject}/${editingId}`;
      method = "PUT";
    }

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success(editingId ? "Question updated!" : "Question added!");
      setSelectedSubject(subject);
      await getAllSubjects();
      await loadQuestions();
      resetForm();
    } else {
      toast.error("Error saving question");
    }
  };

  const editQuestion = (q) => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
    setEditingId(q._id);
    setFormData({
      question: q.question,
      option1: q.option1,
      option2: q.option2,
      option3: q.option3,
      option4: q.option4,
      correctresponse: q.correctresponse,
      time: q.time,
      subject: selectedSubject,
    });
  };

  const deleteQuestion = async (id) => {
    if (!window.confirm("Delete this question?")) return;

    const res = await fetch(`${backendURL}/quiz/${selectedSubject}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (res.ok) {
      toast.success("Question deleted");
      loadQuestions();
    } else {
      toast.error("Error deleting question");
    }
  };

  const startTest = () => {
    if (questions.length > 0) {
      setTestQuestion(questions)
      setstart(true);
      navigate("/test");
    }
    else { toast.error("no question found please select question") }
  };

  return (
    <div className="font-sans min-h-screen mt-10 bg-gradient-to-br from-slate-100 to-slate-200 py-12 px-4">

      <h1 className="text-4xl font-bold text-center text-slate-800 mb-10">
        Quiz Manager
      </h1>

      <div className="max-w-3xl mx-auto mb-10">
        <label
          htmlFor="collection-select"
          className="block text-sm font-semibold text-slate-700 mb-2"
        >
          Select Subject
        </label>

        <div className="flex gap-3">
          <select
            id="collection-select"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3
        focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Choose a subject</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* <button
        onClick={() => alert("Implement delete subject API")}
        className="bg-red-500 hover:bg-red-600 text-white px-4 rounded-xl transition"
      >
        Delete
      </button> */}
        </div>
      </div>

      <div className="flex justify-center mb-12">
        <button
          onClick={startTest}
          className="px-8 py-3 rounded-xl font-semibold text-white
      bg-gradient-to-br from-green-500 to-emerald-600
      hover:from-green-400 hover:to-emerald-500
      shadow-lg transition active:scale-95"
        >
          Start Test
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-6 mb-10">
        <h2 className="text-xl font-semibold text-slate-700 mb-6">
          Questions
        </h2>

        {loading ? (
          <p className="text-slate-500">Loading questions...</p>
        ) : questions.length === 0 ? (
          <p className="text-slate-500">No questions found.</p>
        ) : (
          <div className="space-y-5">
            {questions.map((q) => (
              <div
                key={q._id}
                className="p-5 rounded-2xl border border-slate-200
            bg-slate-50 hover:bg-slate-100 transition"
              >
                <p className="font-semibold text-slate-800 mb-3">
                  {q.question}
                </p>

                <div className="text-sm text-slate-700 space-y-1">
                  <p>A. {q.option1}</p>
                  <p>B. {q.option2}</p>
                  <p>C. {q.option3}</p>
                  <p>D. {q.option4}</p>

                  <p className="mt-2">
                    <span className="font-medium">Correct:</span>{" "}
                    <span className="text-green-600">{q.correctresponse}</span>
                  </p>

                  <p>
                    <span className="font-medium">Time:</span> {q.time}s
                  </p>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => editQuestion(q)}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-white
                bg-amber-500 hover:bg-amber-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteQuestion(q._id)}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-white
                bg-red-500 hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-slate-700 mb-6">
          {editingId ? "Edit Question" : "Add New Question"}
        </h2>

        <form onSubmit={submitQuestion} className="grid gap-4">
          {[
            "question",
            "option1",
            "option2",
            "option3",
            "option4",
            "correctresponse",
            "time",
            "subject",
          ].map((field) => (
            <input
              key={field}
              id={field}
              type={field === "time" ? "number" : "text"}
              placeholder={
                field === "time"
                  ? "Time (seconds)"
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          ))}

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-semibold text-white
          bg-blue-600 hover:bg-blue-700 transition"
            >
              {editingId ? "Update Question" : "Add Question"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 rounded-xl font-semibold text-white
            bg-slate-500 hover:bg-slate-600 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>


  );
};

export default QuizManager;
