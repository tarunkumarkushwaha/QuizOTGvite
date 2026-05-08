import { useEffect, useContext, useCallback, useState } from "react";
import { Context } from "../../MyContext";
import EmojiModal from "./EmojiModal";
import { toast } from "react-toastify";

export default function AddPost({ setPosts }) {
  const [showEmojiModal, setshowEmojiModal] = useState(false);
  const [inputPost, setinputPost] = useState("");
  const [file, setFile] = useState([]); // for image previews

  const { darkmode, backendURL, accessToken, testSub } = useContext(Context);
  const dark = darkmode;

  const addNewPost = async () => {
    if (inputPost.trim() === "") {
      toast.warn("Post content cannot be empty");
      return;
    }

    const API_URL = `${backendURL}/discussions`;
    const token = accessToken;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ content: inputPost, subject: testSub }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update local state (assuming new posts go to the top)
        setPosts((prev) => [data, ...prev]);

        // Clear local component state
        setFile([]);
        setinputPost("");
        setshowEmojiModal(false);
        toast.success("Post created!");
      } else {
        alert("Failed to save post: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  function handleChange(e) {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setFile((oldItems) => [...oldItems, fileUrl]);
    }
  }

  // console.log(post)

  return (
    <>
      <div
        style={{
          backgroundColor: dark ? "#1e293b" : "#ffffff",
          borderRadius: "12px",
          textAlign: "left",
          overflow: "hidden",
          width: "100%",
          maxWidth: "576px",
          margin: "16px auto",
          border: dark ? "1px solid #334155" : "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", padding: "16px" }}
        >
          <div
            style={{
              padding: "12px",
              display: "flex",
              width: "100%",
              gap: "10px",
              backgroundColor: dark ? "#0f172a" : "#f8fafc",
              borderRadius: "8px",
              border: dark ? "1px solid #334155" : "1px solid #f1f5f9",
            }}
          >
            <textarea
              value={inputPost}
              onChange={(e) => setinputPost(e.target.value)}
              style={{
                flex: 1,
                maxHeight: "384px",
                minHeight: "120px",
                resize: "none",
                border: "none",
                outline: "none",
                fontSize: "14px",
                backgroundColor: "transparent",
                color: dark ? "#f8fafc" : "#1e293b",
                fontFamily: "inherit",
                lineHeight: "1.5",
              }}
              placeholder="What's on your mind? Share an update..."
            />
          </div>

          {file.length > 0 && (
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: "12px",
                overflowX: "auto",
                padding: "12px 0",
              }}
            >
              {file.map((item, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    minWidth: "112px",
                    width: "112px",
                  }}
                >
                  <button
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      backgroundColor: "#ffffff",
                      border: "none",
                      borderRadius: "50%",
                      width: "24px",
                      height: "24px",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      zIndex: 1,
                    }}
                    onClick={() => setFile(file.filter((_, i) => i !== index))}
                    aria-label="Remove image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                  <img
                    src={item}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          <div style={{ width: "100%", marginTop: "12px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <label
                  htmlFor="inputs"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    borderRadius: "6px",
                    backgroundColor: dark ? "#334155" : "#f1f5f9",
                    transition: "background-color 0.2s",
                  }}
                >
                  <input
                    id="inputs"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6B7280"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </label>

                <button
                  style={{
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    borderRadius: "6px",
                    backgroundColor: dark ? "#334155" : "#f1f5f9",
                  }}
                  onClick={() => setshowEmojiModal(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6B7280"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                </button>

                <EmojiModal
                  open={showEmojiModal}
                  inputPost={inputPost}
                  setinputPost={setinputPost}
                  onCancelClick={() => setshowEmojiModal(false)}
                />
              </div>

              <button
                onClick={addNewPost}
                style={{
                  backgroundColor: "#2563eb",
                  color: "#ffffff",
                  padding: "10px 24px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#1d4ed8")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
