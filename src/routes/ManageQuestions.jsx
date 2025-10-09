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
      alert(editingId ? "Question updated!" : "Question added!");
      setSelectedSubject(subject);
      await getAllSubjects();
      await loadQuestions();
      resetForm();
    } else {
      alert("Error saving question");
    }
  };

  const editQuestion = (q) => {
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
      alert("Question deleted");
      loadQuestions();
    } else {
      alert("Error deleting question");
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
    <div className="font-sans bg-gray-100 min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Quiz Manager
      </h1>

      <div className="max-w-3xl mx-auto mb-8">
        <label
          htmlFor="collection-select"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Available Subjects:
        </label>
        <div className="flex items-center gap-3">
          <select
            id="collection-select"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select subject</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <button
            onClick={() => alert("Implement delete subject API")}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition"
          >
            X
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={startTest}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 ml-2"
        >
          Start Test
        </button>
      </div>

      <div className="bg-white p-6 mt-6 rounded-2xl shadow-md max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Questions</h2>

        {loading ? (
          <p className="text-gray-600">Loading questions...</p>
        ) : questions.length === 0 ? (
          <p className="text-gray-600">No questions found.</p>
        ) : (
          <div className="space-y-4">
            {questions.map((q) => (
              <div
                key={q._id}
                className="p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
              >
                <b className="text-gray-800">{q.question}</b>
                <div className="text-sm text-gray-700 mt-2 space-y-1">
                  <p>1. {q.option1}</p>
                  <p>2. {q.option2}</p>
                  <p>3. {q.option3}</p>
                  <p>4. {q.option4}</p>
                  <p className="mt-1">
                    <span className="font-medium">Correct:</span> {q.correctresponse}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span> {q.time}s
                  </p>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => editQuestion(q)}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg text-sm transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteQuestion(q._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md max-w-3xl mx-auto my-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          {editingId ? " Edit Question" : "+ Add Question"}
        </h2>

        <form onSubmit={submitQuestion} className="space-y-4">
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          ))}

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition"
            >
              {editingId ? "Update Question" : "Add Question"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-5 py-2.5 rounded-lg transition"
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
