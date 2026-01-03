import { useState } from "react";
import ImageViewModal from "./ImageViewModal";
import ShowNewsEditModal from "./ShowNewsEditModal";
import { toast } from "react-toastify";

const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const NewsObject = ({ item, onDelete, refreshPosts }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(item.comments || []);

  const token = localStorage.getItem("accessToken");

  // ✅ Like / Dislike post
  const handleLike = async () => {
    try {
      setLoadingLike(true);
      const res = await fetch(`${backendURL}/discussions/${item._id}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to like post");
      toast.success("Liked!");
      refreshPosts();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingLike(false);
    }
  };

  // ✅ Dislike
  const handleDislike = async () => {
    try {
      setLoadingLike(true);
      const res = await fetch(`${backendURL}/discussions/${item._id}/dislike`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to dislike post");
      toast.success("Disliked!");
      refreshPosts();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingLike(false);
    }
  };

  // ✅ Add Comment
  const handleAddComment = async () => {
    if (!comment.trim()) return toast.warning("Comment cannot be empty");
    try {
      setLoadingComment(true);
      const res = await fetch(`${backendURL}/discussions/${item._id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: comment }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add comment");
      setComments([...comments, data]);
      setComment("");
      toast.success("Comment added!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingComment(false);
    }
  };

  // ✅ Delete Post
  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      const res = await fetch(`${backendURL}/discussions/${item._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");
      toast.success("Post deleted");
      onDelete(item._id);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="bg-white shadow p-3 rounded-lg mb-4">
      {/* Author Info */}
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-gray-800">{item.username}</p>
          <small className="text-gray-500">
            {new Date(item.createdAt).toLocaleString()}
          </small>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowEditModal(true)}
            className="text-blue-500 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Post Content */}
      <p className="mt-3 text-gray-700">{item.content}</p>

      {/* Image (if any) */}
      {item.image && (
        <div className="mt-3">
          <img
            src={item.image}
            alt="Post"
            className="rounded-lg cursor-pointer"
            onClick={() => setShowImageModal(true)}
          />
        </div>
      )}

      {/* Like / Dislike Buttons */}
      <div className="flex gap-4 mt-3 text-sm">
        <button
          disabled={loadingLike}
          onClick={handleLike}
          className="text-green-600 font-medium hover:underline"
        >
          👍 Like ({item.likes?.length || 0})
        </button>
        <button
          disabled={loadingLike}
          onClick={handleDislike}
          className="text-red-600 font-medium hover:underline"
        >
          👎 Dislike ({item.dislikes?.length || 0})
        </button>
      </div>

      {/* Comments */}
      <div className="mt-4 border-t pt-2">
        <p className="font-semibold text-gray-700 mb-1">Comments</p>
        {comments.length === 0 && (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        )}
        {comments.map((c, i) => (
          <div key={i} className="text-gray-700 text-sm border-b py-1">
            <strong>{c.username || "User"}:</strong> {c.text}
          </div>
        ))}

        {/* Add Comment Box */}
        <div className="flex mt-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 border rounded-l px-2 py-1 text-sm outline-none"
            placeholder="Add a comment..."
          />
          <button
            onClick={handleAddComment}
            disabled={loadingComment}
            className="bg-green-500 text-white px-3 py-1 rounded-r text-sm"
          >
            {loadingComment ? "..." : "Post"}
          </button>
        </div>
      </div>

      {/* Modals */}
      {showImageModal && (
        <ImageViewModal
          imageUrl={item.image}
          onClose={() => setShowImageModal(false)}
        />
      )}

      {showEditModal && (
        <ShowNewsEditModal
          item={item}
          onClose={() => setShowEditModal(false)}
          refreshPosts={refreshPosts}
        />
      )}
    </div>
  );
};

export default NewsObject;