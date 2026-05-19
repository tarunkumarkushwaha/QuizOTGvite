import AddPost from "./AddPost";
import Post from "./Post";
import { useEffect, useContext, useCallback, useState } from "react";
import { Context } from "../../MyContext";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";

const PostPage = () => {
  const [postitems, setpostitems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);
  const { darkmode, backendURL, accessToken, testSub, settestSub } =
    useContext(Context);
  const [localFilter, setLocalFilter] = useState(testSub || "all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchPosts = useCallback(async () => {
    if (!accessToken) return;
    try {
      setLoading(true);
      seterror(false); // Reset error on new attempt
      const res = await fetch(`${backendURL}/discussions`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");
      setpostitems(data);
    } catch (err) {
      seterror(true);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [backendURL, accessToken]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await fetchPosts();
    setIsRefreshing(false);
    toast.info("Feed updated");
  };

  const filteredPosts = postitems.filter((item) =>
    localFilter === "all" ? true : item.subjectName === localFilter,
  );
  return (
    <>
      <div
        className="side-entry"
        style={{
          background: darkmode
            ? "linear-gradient(to bottom, #0f172a, #1e293b)"
            : "linear-gradient(to bottom, #f0fdf4, #dcfce7)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "background 0.3s ease",
        }}
      >
        <button
          onClick={handleManualRefresh}
          disabled={loading || isRefreshing}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all
      ${
        darkmode
          ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
          : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
      }
      ${loading || isRefreshing ? "opacity-50 cursor-not-allowed" : ""}
    `}
        >
          <svg
            className={`w-4 h-4 ${loading || isRefreshing ? "animate-spin" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          {isRefreshing ? "Checking..." : "Refresh"}
        </button>
        <div
          style={{
            width: "100%",
            maxWidth: "576px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Subject Selector */}
          <div className="flex flex-col gap-2 w-full">
            <label
              className={`text-sm font-semibold ${darkmode ? "text-slate-200" : "text-slate-900"}`}
            >
              Filter by Subject
            </label>
            <select
              value={localFilter}
              onChange={(e) => setLocalFilter(e.target.value)}
              className={`w-full rounded-xl px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
                ${darkmode ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-white border-slate-300 text-slate-900"}`}
            >
              <option value="all">All Posts</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="javascript">JavaScript</option>
              <option value="React">React</option>
              <option value="wordpress">WordPress</option>
              <option value="Python">Python</option>
              <option value="Science">Science</option>
              <option value="Funny">Funny</option>
              <option value="Reasoning">Reasoning</option>
            </select>
          </div>

          <AddPost setPosts={setpostitems} />

          {loading && (
            <div className="flex justify-center py-10">
              <LoadingSpinner />
            </div>
          )}

          {error && !loading && (
            <p className="text-center text-red-500 font-medium py-4">
              Error loading posts. Please check your connection.
            </p>
          )}

          {/* Render filtered posts */}
          {!loading && filteredPosts.length > 0
            ? filteredPosts.map((item) => (
                <Post setPosts={setpostitems} item={item} key={item._id} />
              ))
            : !loading && (
                <p
                  className={`text-center py-10 ${darkmode ? "text-slate-400" : "text-slate-500"}`}
                >
                  No posts found for this category.
                </p>
              )}
        </div>
      </div>
    </>
  );
};

export default PostPage;
