import { useState, useEffect, useContext } from "react";
import { CircularProgress } from "@mui/material";
import AddNewsModal from "../components/AddNewsModal";
import NewsObject from "../components/NewsObject";
import { Context } from "../MyContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Discussions = () => {
  const [postitems, setpostitems] = useState([]);
  const [post, setpost] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const { dark } = useContext(Context);
    const { backendURL, accessToken, setTestQuestion, setstart } = useContext(Context);

  const style = {
    ui: dark ? "bg-slate-700" : "bg-gradient-to-b from-green-50 to-green-200",
  };

  // ✅ Fetch all discussions on load
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`${backendURL}/discussions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch discussions");
        setpostitems(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // ✅ Create new post
  const handleCreatePost = async () => {
    if (!post.trim()) return toast.warning("Post cannot be empty");

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${backendURL}/discussions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: post }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error creating post");

      setpostitems([data, ...postitems]);
      setpost("");
      toast.success("Post created successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ✅ Delete post
  const handleDeletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${backendURL}/discussions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error deleting post");

      setpostitems(postitems.filter((item) => item._id !== id));
      toast.success("Post deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className={`${style.ui} mt-20 min-h-screen flex justify-center items-start p-10`}>
      <div className="flex flex-col w-full max-w-xl">
        {/* Create post box */}
        <div className="shadow p-3 rounded-lg border bg-white border-gray-300 flex flex-col mb-5">
          <textarea
            rows={4}
            value={post}
            onChange={(e) => setpost(e.target.value)}
            className="bg-[#F9FAFB] w-full border rounded py-2 px-3 text-sm focus:ring-1 focus:ring-green-400 outline-none resize-none"
            placeholder="Share your thoughts..."
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleCreatePost}
              className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
            >
              Post
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center mt-10">
            <CircularProgress />
          </div>
        )}

        {/* Posts */}
        {!loading &&
          postitems.map((item) => (
            <NewsObject
              key={item._id}
              item={item}
              onDelete={() => handleDeletePost(item._id)}
            />
          ))}

        {!loading && postitems.length === 0 && (
          <p className="text-center text-gray-600 mt-6">No discussions yet.</p>
        )}
      </div>
    </div>
  );
};

export default Discussions;