import { createPortal } from "react-dom";
import { useEffect, useContext, useCallback, useState } from "react";
import { Context } from "../../MyContext";
import EmojiPicker from "emoji-picker-react";

const EmojiModal = ({ onCancelClick, setinputPost, inputPost, open }) => {
  const { darkmode, backendURL, accessToken } = useContext(Context);
  const dark = darkmode;
  const onEmojiClick = (emojiObject) => {
    setinputPost(inputPost + emojiObject.emoji);
    onCancelClick();
  };

  return createPortal(
    <>
      {open && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
     
          <div className="fixed inset-0 bg-black/20" onClick={onCancelClick} />


          <div
            className={`relative p-4 rounded-lg shadow-xl border ${
              dark
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-slate-200"
            }`}
          >
            <div
              style={{
                width: "100%",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: dark ? "#0f172a" : "#f8fafc",
              }}
            >
              <EmojiPicker
                onEmojiClick={onEmojiClick}
                theme={dark ? "dark" : "light"}
                width="100%"
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={onCancelClick}
                style={{
                  padding: "10px 24px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: dark ? "#94a3b8" : "#64748b",
                  backgroundColor: dark ? "#334155" : "#f1f5f9",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  width: "100%",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = dark
                    ? "#475569"
                    : "#e2e8f0")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = dark
                    ? "#334155"
                    : "#f1f5f9")
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body,
  );
};

export default EmojiModal;
