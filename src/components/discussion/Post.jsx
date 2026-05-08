import { useEffect, useState, useContext } from "react";
import { Context } from "../../MyContext";
import EditPostModal from "./EditPostModal";
import { toast } from "react-toastify";

const dropdownButtonStyle = {
  width: "100%",
  padding: "10px 16px",
  textAlign: "left",
  background: "none",
  border: "none",
  fontSize: "14px",
  cursor: "pointer",
  color: "inherit",
  transition: "background 0.2s",
};

const actionButtonStyle = (isActive) => ({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
  color: isActive ? "#2563eb" : "#64748b",
  padding: "4px 8px",
  borderRadius: "4px",
  transition: "background 0.2s",
});

const Post = ({ item, setPosts }) => {
  const [showMore, setShowMore] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [comment, setComment] = useState("");
  const [commentBox, setCommentBox] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [animateBtn, setAnimateBtn] = useState(null);
  const { darkmode, backendURL, accessToken } = useContext(Context);

//   console.log(item, "here");
  const liked = item.userLiked;
  const disliked = item.userDisliked;

  // Helper for fetch options
  const getOptions = (method, body = null) => {
    const token = accessToken;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
    if (body) options.body = JSON.stringify(body);
    return options;
  };

  const API_URL = `${backendURL}/discussions`;

  const toggleLike = async () => {
    setAnimateBtn("like");
    try {
      const response = await fetch(
        `${API_URL}/${item._id}/like`,
        getOptions("POST", {}),
      );
      const data = await response.json();

      setPosts((prev) =>
        prev.map((p) =>
          p._id === item._id
            ? {
                ...p,
                likes: data.likes,
                dislikes: data.dislikes,
                userLiked: data.userLiked,
                userDisliked: data.userDisliked,
              }
            : p,
        ),
      );
    } catch (err) {
      console.error("Like failed", err);
    }
    setTimeout(() => setAnimateBtn(null), 300);
  };

  const toggleDislike = async () => {
    setAnimateBtn("dislike");
    try {
      const response = await fetch(
        `${API_URL}/${item._id}/dislike`,
        getOptions("POST", {}),
      );
      const data = await response.json();

      setPosts((prev) =>
        prev.map((p) =>
          p._id === item._id
            ? {
                ...p,
                likes: data.likes,
                dislikes: data.dislikes,
                userLiked: data.userLiked,
                userDisliked: data.userDisliked,
              }
            : p,
        ),
      );
    } catch (err) {
      console.error("Dislike failed", err);
    }
    setTimeout(() => setAnimateBtn(null), 300);
  };

  const addComment = async () => {
    if (!comment.trim()) return;

    try {
      const response = await fetch(
        `${API_URL}/${item._id}/comment`,
        getOptions("POST", { text: comment }),
      );
      const data = await response.json();

      if (response.ok) {
        setPosts((prev) =>
          prev.map((p) => (p._id === item._id ? data.post : p)),
        );
        setComment("");
      } else {
        alert(data.message || "Comment failed");
      }
    } catch (err) {
      alert("Comment failed: " + err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(
          `${API_URL}/${item._id}`,
          getOptions("DELETE"),
        );
        if (response.ok) {
          setPosts((prev) => prev.filter((p) => p._id !== item._id));
          toast.success("Post deleted successfully"); 
        } else {
          const data = await response.json();
          alert("Failed: " + data.message);
        }
      } catch (err) {
        alert("Failed to delete post: " + err.message);
      }
    }
  };

  const toggleCommentBox = () => setCommentBox(!commentBox);

  const getTimeElapsed = (createdTime) => {
    const createdDate = new Date(createdTime).getTime();
    const currentTime = new Date().getTime();
    const seconds = (currentTime - createdDate) / 1000;
    if (seconds < 0) return "Just now";
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return days > 0
      ? `${days}d`
      : hours > 0
        ? `${hours}h`
        : `${Math.max(0, minutes)}m`;
  };

  return (
    <div
      className="post-animation"
      style={{
        backgroundColor: darkmode ? "#1e293b" : "#ffffff",
        borderRadius: "12px",
        border: darkmode ? "1px solid #334155" : "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        maxWidth: "576px",
        margin: "16px auto",
        width: "100%",
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{ fontWeight: "700", color: "#2563eb", fontSize: "14px" }}
          >
            {item.username}
          </span>
          <span
            style={{
              color: darkmode ? "#94a3b8" : "#64748b",
              fontSize: "12px",
            }}
          >
            • {getTimeElapsed(item.createdAt)} ago
          </span>
        </div>
        <div style={{ position: "relative" }}>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
              color: darkmode ? "#94a3b8" : "#64748b",
              padding: "0 8px",
            }}
            onClick={() => setShowEdit(!showEdit)}
          >
            ⋮
          </button>

          {/* editing btn  */}
          {showEdit && (
            <div
              style={{
                position: "absolute",
                zIndex: 10,
                right: 0,
                top: "25px",
                backgroundColor: darkmode ? "#0f172a" : "#ffffff",
                borderRadius: "8px",
                border: `1px solid ${darkmode ? "#334155" : "#e2e8f0"}`,
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                minWidth: "140px",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setShowEditModal(true)}
                style={dropdownButtonStyle}
              >
                Edit Post
              </button>
              <button
                onClick={handleDelete}
                style={{ ...dropdownButtonStyle, color: "#ef4444" }}
              >
                Delete Post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* text post content frm here - */}
      <div style={{ px: "16px", padding: "0 16px 12px 16px" }}>
        <p
          style={{
            color: darkmode ? "#f1f5f9" : "#1e293b",
            fontSize: "15px",
            lineHeight: "1.6",
            whiteSpace: "pre-wrap",
            margin: 0,
          }}
        >
          {showMore ? item.content : `${item.content.substring(0, 250)}`}
          {item.content.length > 250 && (
            <button
              style={{
                color: "#2563eb",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                marginLeft: "4px",
              }}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show less" : "...Show more"}
            </button>
          )}
        </p>
      </div>

      {item.imageSrc && item.imageSrc.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
            padding: "0 16px 16px 16px",
          }}
        >
          {item.imageSrc.slice(0, 3).map((src, index) => (
            <img
              key={index}
              style={{
                flex: "1 1 100px",
                height: "180px",
                objectFit: "cover",
                borderRadius: "8px",
                cursor: "pointer",
                border: `1px solid ${dark ? "#334155" : "#f1f5f9"}`,
              }}
              src={src}
              alt={`post-${index}`}
            />
          ))}
          {item.imageSrc.length > 3 && (
            <div
              style={{
                flex: "1 1 100px",
                height: "180px",
                backgroundColor: "rgba(0,0,0,0.7)",
                color: "white",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              +{item.imageSrc.length - 3}
            </div>
          )}
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderTop: `1px solid ${darkmode ? "#334155" : "#f1f5f9"}`,
          backgroundColor: darkmode ? "#1e293b" : "#fafafa",
        }}
      >
        <button style={actionButtonStyle(liked)} onClick={toggleLike}>
          <img
            className={animateBtn === "like" ? "button-clicked" : ""}
            width="18"
            height="18"
            src={
              liked
                ? "https://img.icons8.com/ios-filled/50/2563eb/facebook-like.png"
                : "https://img.icons8.com/ios/50/64748b/facebook-like.png"
            }
            alt="like"
          />
          <span>Like ({item.likes?.length || item.likes})</span>
        </button>

        <button style={actionButtonStyle(disliked)} onClick={toggleDislike}>
          <img
            className={animateBtn === "dislike" ? "button-clicked" : ""}
            width="18"
            height="18"
            src={
              disliked
                ? "https://img.icons8.com/ios-filled/50/2563eb/thumbs-down.png"
                : "https://img.icons8.com/ios/50/64748b/thumbs-down.png"
            }
            alt="dislike"
          />
          <span>Dislike ({item.dislikes?.length || item.dislikes})</span>
        </button>

        <button style={actionButtonStyle(false)} onClick={toggleCommentBox}>
          <img
            width="18"
            height="18"
            src="https://img.icons8.com/ios/50/64748b/comments.png"
            alt="comments"
          />
          <span>Comments ({item.comments?.length || 0})</span>
        </button>
      </div>

      {/* Comment Boxx */}
      {commentBox && (
        <div
          className="side-entry"
          style={{
            padding: "16px",
            backgroundColor: darkmode ? "#0f172a" : "#f8fafc",
            borderTop: `1px solid ${darkmode ? "#334155" : "#e2e8f0"}`,
          }}
        >
          <div
            style={{
              maxHeight: "200px",
              overflowY: "auto",
              marginBottom: "12px",
            }}
          >
            {item.comments?.map((c, index) => (
              <div
                key={index}
                className="side-entry"
                style={{
                  marginBottom: "8px",
                  fontSize: "13px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontWeight: "700",
                    color: "#2563eb",
                    marginRight: "6px",
                    marginBottom: "6px",
                  }}
                >
                  {c.username}
                </span>
                <span style={{ color: darkmode ? "#cbd5e1" : "#475569" }}>
                  {c.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <textarea
              style={{
                flex: 1,
                padding: "8px 12px",
                borderRadius: "20px",
                border: `1px solid ${darkmode ? "#334155" : "#e2e8f0"}`,
                fontSize: "13px",
                outline: "none",
                resize: "none",
                backgroundColor: darkmode ? "#1e293b" : "#fff",
                color: darkmode ? "#fff" : "#000",
              }}
              rows="1"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
            />
            <button
              onClick={addComment}
              style={{
                backgroundColor: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "20px",
                padding: "0 16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Post
            </button>
          </div>
        </div>
      )}

      {/* edit modal here */}
      {showEditModal && (
        <EditPostModal
          open={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setShowEdit(false);
          }}
          postData={item}
          setPosts={setPosts}
        />
      )}
    </div>
  );
};

export default Post;
