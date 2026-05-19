import { useEffect, useState, useContext } from "react";
import { Context } from "../../MyContext";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";

const EditPostModal = ({ open, onClose, postData, setPosts }) => {
  const { darkmode, backendURL, accessToken,authFetch } = useContext(Context);

  let dark = darkmode;
  const [inputPost, setInputPost] = useState(postData.content);
  const API_URL = `/discussions`;

  const updatePost = async () => {
    if (inputPost.trim() === "") {
      toast.warn("Post cannot be empty");
      return;
    }

    const token = accessToken;

    try {
      const response = await authFetch(`${API_URL}/${postData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: inputPost }),
      });

      const data = await response.json();

      if (response.ok) {
        setPosts((prev) =>
          prev.map((p) => (p._id === postData._id ? data : p)),
        );

        toast.success("Post updated");
        onClose(); 
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      toast.error("Update failed: " + err.message);
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-md transform rounded-xl p-6 shadow-2xl transition-all border
        ${dark ? "bg-slate-800 border-slate-700 text-slate-100" : "bg-white border-slate-200 text-slate-900"}
      `}
      >
        <h2
          className={`text-lg font-bold mb-4 ${dark ? "text-slate-50" : "text-slate-800"}`}
        >
          Edit Post
        </h2>

        <textarea
          value={inputPost}
          onChange={(e) => setInputPost(e.target.value)}
          className={`w-full min-h-[120px] p-3 rounded-lg border outline-none text-sm font-sans resize-y mb-2 transition-colors
            ${
              dark
                ? "bg-slate-900 border-slate-700 text-slate-100 focus:border-blue-500"
                : "bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-400"
            }
          `}
          placeholder="Edit your post..."
        />

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className={`px-[18px] py-2.5 rounded-md text-sm font-semibold transition-colors border
              ${
                dark
                  ? "text-slate-400 bg-transparent border-slate-700 hover:bg-slate-700"
                  : "text-slate-500 bg-transparent border-slate-200 hover:bg-slate-100"
              }
            `}
          >
            Cancel
          </button>

          <button
            onClick={updatePost}
            className="px-[18px] py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-semibold shadow-md shadow-blue-600/20 transition-colors"
          >
            Update Post
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default EditPostModal;
