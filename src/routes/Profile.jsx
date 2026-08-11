import React, { useEffect, useState, useContext } from "react";
import { Context } from "../MyContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import QuizIcon from "@mui/icons-material/Quiz";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ForumIcon from "@mui/icons-material/Forum";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import BarChartIcon from "@mui/icons-material/BarChart";
import BoltIcon from "@mui/icons-material/Bolt";
import TimerIcon from "@mui/icons-material/Timer";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import InboxIcon from "@mui/icons-material/Inbox";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { backendURL, accessToken } = useContext(Context);
  let navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [expandedDiscussions, setExpandedDiscussions] = useState({});

  useEffect(() => {
    if (!accessToken) return;

    const loadProfile = async () => {
      try {
        setLoading(true);

        const headers = {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        };

        const [profileRes, statsRes, questionsRes, discussionsRes, resultsRes] =
          await Promise.all([
            fetch(`${backendURL}/profile`, { headers, credentials: "include" }),
            fetch(`${backendURL}/profile/stats`, {
              headers,
              credentials: "include",
            }),
            fetch(`${backendURL}/profile/questions`, {
              headers,
              credentials: "include",
            }),
            fetch(`${backendURL}/profile/discussions`, {
              headers,
              credentials: "include",
            }),
            fetch(`${backendURL}/profile/results`, {
              headers,
              credentials: "include",
            }),
          ]);

        if (!profileRes.ok) throw new Error("Failed to load profile");

        const profileData = await profileRes.json();
        const statsData = await statsRes.json();
        const questionsData = await questionsRes.json();
        const discussionsData = await discussionsRes.json();
        const resultsData = await resultsRes.json();

        setProfile(profileData);
        setStats(statsData);

        setQuestions(
          Array.isArray(questionsData)
            ? questionsData
            : questionsData.questions || [],
        );

        setDiscussions(
          Array.isArray(discussionsData)
            ? discussionsData
            : discussionsData.discussions || [],
        );

        setResults(
          Array.isArray(resultsData) ? resultsData : resultsData.results || [],
        );
      } catch (error) {
        console.error("Profile loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [accessToken, backendURL]);

  const toggleQuestion = (id) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleDiscussion = (id) => {
    setExpandedDiscussions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (seconds) => {
    if (!seconds) return "0 sec";
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    if (min === 0) return `${sec}s`;
    return `${min}m ${sec}s`;
  };

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 80) return "text-emerald-400";
    if (accuracy >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  if (!accessToken) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="text-red-400 text-center bg-red-400/10 px-6 py-4 rounded-xl border border-red-400/20">
          Please login to view your profile.
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-700 border-t-emerald-400 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-slate-400 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  // console.log(profile,"data")

  const profilePic =
    profile?.profile?.profilePic ||
    "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(
        profile?.profile?.displayName || profile?.username || "User",
      );

  const displayName =
    profile?.profile?.displayName || profile?.user?.username || "User";
  const averageAccuracy = stats?.performance?.averageAccuracy || 0;
  const averageScore = stats?.performance?.averageScore || 0;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
          {/* Cover */}
          <div className="h-32 sm:h-48 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-700 relative">
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="px-4 sm:px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 -mt-16 sm:-mt-20 relative z-10">
              <div className="relative inline-block">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-slate-900 shadow-2xl bg-slate-800"
                />
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full shadow-sm"></div>
              </div>

              <div className="flex-1 pt-2 sm:pb-3">
                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
                  {displayName}
                </h1>
                <p className="text-slate-400 mt-1 font-medium text-sm sm:text-base">
                  @{profile?.user?.username}
                </p>

                {profile?.profile?.bio && (
                  <p className="text-slate-300 mt-3 max-w-2xl text-sm sm:text-base leading-relaxed">
                    {profile.profile.bio}
                  </p>
                )}
              </div>

              <div className="sm:pb-4 flex-shrink-0">
                <button
                  onClick={() => navigate("/profileupdate")}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold shadow-inner"
                >
                  Update Profile
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6 sm:mt-8 text-sm text-slate-400 border-t border-white/5 pt-6">
              {profile?.profile?.location && (
                <span className="flex items-center gap-1.5">
                  <LocationOnIcon
                    fontSize="small"
                    className="text-emerald-400"
                  />
                  {profile.profile.location}
                </span>
              )}
              {profile?.profile?.website && (
                <a
                  href={profile.profile.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 hover:underline transition-colors"
                >
                  <LinkIcon fontSize="small" className="text-sky-400" /> Website
                </a>
              )}
              {profile?.createdAt && (
                <span className="flex items-center gap-1.5">
                  <CalendarTodayIcon
                    fontSize="small"
                    className="text-slate-400"
                  />{" "}
                  Joined {formatDate(profile.createdAt)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-6">
          <StatCard
            title="Tests Taken"
            value={stats?.testsTaken || 0}
            icon={<QuizIcon className="text-emerald-400" />}
          />
          <StatCard
            title="Questions Created"
            value={stats?.questionsCreated || 0}
            icon={<HelpOutlineIcon className="text-cyan-400" />}
          />
          <StatCard
            title="Discussions"
            value={stats?.discussions || 0}
            icon={<ForumIcon className="text-purple-400" />}
          />
          <StatCard
            title="Avg Score"
            value={Number(averageScore).toFixed(1)}
            icon={<EmojiEventsIcon className="text-amber-400" />}
          />
          <StatCard
            title="Avg Accuracy"
            value={`${Number(averageAccuracy).toFixed(1)}%`}
            icon={<TrackChangesIcon className="text-rose-400" />}
          />
        </div>

        <div className="mt-8 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-2 bg-white/5 border border-white/10 rounded-2xl p-1.5">
            {[
              ["overview", "Overview"],
              ["results", "Quiz Results"],
              ["questions", "My Questions"],
              ["discussions", "Discussions"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === id
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20 scale-100"
                    : "text-slate-400 hover:text-white hover:bg-white/10 scale-95 hover:scale-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            {/* Performance */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-7 shadow-lg">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BarChartIcon className="text-emerald-400" /> Performance
              </h2>
              <div className="space-y-6">
                <ProgressRow
                  label="Average Accuracy"
                  value={averageAccuracy}
                  suffix="%"
                />
                <ProgressRow
                  label="Average Score"
                  value={averageScore}
                  suffix=""
                />
                <ProgressRow
                  label="Questions Answered"
                  value={stats?.performance?.totalQuestions || 0}
                  max={Math.max(stats?.performance?.totalQuestions || 0, 100)}
                  suffix=""
                />
                <ProgressRow
                  label="Correct Answers"
                  value={stats?.performance?.correctAnswers || 0}
                  max={Math.max(stats?.performance?.totalQuestions || 0, 100)}
                  suffix=""
                />
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-7 shadow-lg flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <BoltIcon className="text-amber-400" /> Recent Results
                </h2>
                <button
                  onClick={() => setActiveTab("results")}
                  className="text-sm font-medium text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
                >
                  View all
                </button>
              </div>

              {results.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <EmptyState text="No quiz results yet." />
                </div>
              ) : (
                <div className="space-y-3">
                  {results.slice(0, 5).map((result) => (
                    <ResultRow
                      key={result._id}
                      result={result}
                      formatTime={formatTime}
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "results" && (
          <div className="mt-6 animation-fade-in">
            <SectionHeader
              title="Quiz History"
              link="result"
              count={results.length}
            />
            {results.length === 0 ? (
              <EmptyState text="You haven't taken any tests yet." />
            ) : (
              <div className="space-y-4">
                {results.map((result) => (
                  <div
                    key={result._id}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 hover:border-emerald-500/40 hover:bg-white/10 transition-all duration-300 shadow-md group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-bold group-hover:text-emerald-400 transition-colors">
                            {result.subject}
                          </h3>
                          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400">
                            {formatDate(result.createdAt)}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-sm text-slate-400">
                          <span className="flex items-center gap-1.5">
                            Questions:{" "}
                            <b className="text-white">
                              {result.totalQuestions}
                            </b>
                          </span>
                          <span className="flex items-center gap-1.5">
                            Correct:{" "}
                            <b className="text-emerald-400">
                              {result.correctAnswers}
                            </b>
                          </span>
                          <span className="flex items-center gap-1.5">
                            Time:{" "}
                            <b className="text-white">
                              {formatTime(result.timeTaken)}
                            </b>
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-4 sm:gap-6 p-4 sm:p-0 bg-black/20 sm:bg-transparent rounded-xl sm:rounded-none">
                        <div className="text-center flex-1 sm:flex-none">
                          <div
                            className={`text-2xl sm:text-3xl font-extrabold ${getScoreColor(result.score)}`}
                          >
                            {result.score}
                          </div>
                          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">
                            Score
                          </div>
                        </div>
                        <div className="w-px bg-white/10 hidden sm:block"></div>
                        <div className="text-center flex-1 sm:flex-none">
                          <div
                            className={`text-2xl sm:text-3xl font-extrabold ${getAccuracyColor(result.accuracy)}`}
                          >
                            {Number(result.accuracy || 0).toFixed(1)}%
                          </div>
                          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">
                            Accuracy
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "questions" && (
          <div className="mt-6 animation-fade-in">
            <SectionHeader
              title="Questions"
              link="managequestions"
              count={questions.length}
            />
            {questions.length === 0 ? (
              <EmptyState text="You haven't created any questions yet." />
            ) : (
              <div className="space-y-4">
                {questions.map((q, index) => {
                  const expanded = expandedQuestions[q._id];
                  return (
                    <div
                      key={q._id}
                      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-md"
                    >
                      <button
                        onClick={() => toggleQuestion(q._id)}
                        className="w-full text-left p-4 sm:p-5 hover:bg-white/5 transition-colors focus:outline-none"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm font-bold mt-1">
                            {index + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap gap-2 mb-2">
                              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                                {q.subject}
                              </span>
                              {q.createdAt && (
                                <span className="text-xs text-slate-500 flex items-center">
                                  {formatDate(q.createdAt)}
                                </span>
                              )}
                            </div>
                            <p className="font-semibold text-slate-100 text-sm sm:text-base leading-relaxed break-words">
                              {q.question}
                            </p>
                          </div>
                          <span className="text-slate-400 flex-shrink-0 ml-2 mt-2">
                            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </span>
                        </div>
                      </button>

                      {expanded && (
                        <div className="px-4 sm:px-5 pb-5 ml-11 sm:ml-14 border-t border-white/5 pt-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                              ["A", q.option1],
                              ["B", q.option2],
                              ["C", q.option3],
                              ["D", q.option4],
                            ].map(([letter, option]) => (
                              <div
                                key={letter}
                                className={`p-3 sm:p-4 rounded-xl border flex items-center ${
                                  option === q.correctresponse
                                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[inset_0_0_15px_rgba(16,185,129,0.1)]"
                                    : "bg-slate-900/50 border-white/5 text-slate-300"
                                }`}
                              >
                                <span className="font-bold mr-3 bg-white/5 w-7 h-7 flex items-center justify-center rounded-md text-sm shrink-0">
                                  {letter}
                                </span>
                                <span className="text-sm sm:text-base flex-1 break-words">
                                  {option}
                                </span>
                                {option === q.correctresponse && (
                                  <span className="text-xs ml-2 flex items-center gap-1 shrink-0 font-medium bg-emerald-500/20 px-2 py-1 rounded-full">
                                    <CheckCircleIcon
                                      fontSize="small"
                                      className="text-emerald-400"
                                    />
                                    Correct
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="mt-5 text-sm text-slate-400 flex items-center gap-2 bg-black/20 p-3 rounded-xl w-max border border-white/5">
                            <TimerIcon
                              fontSize="small"
                              className="text-slate-400"
                            />{" "}
                            Time allowed:{" "}
                            <span className="text-white font-semibold">
                              {q.time}s
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === "discussions" && (
          <div className="mt-6 animation-fade-in">
            <SectionHeader
              title="Your Discussions"
              link="discussions"
              count={discussions.length}
            />
            {discussions.length === 0 ? (
              <EmptyState text="You haven't started any discussions yet." />
            ) : (
              <div className="space-y-4">
                {discussions.map((discussion) => {
                  const expanded = expandedDiscussions[discussion._id];
                  return (
                    <div
                      key={discussion._id}
                      className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-md"
                    >
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
                              {discussion.subjectName}
                            </span>
                            <span className="text-xs text-slate-500">
                              {formatDate(discussion.createdAt)}
                            </span>
                          </div>
                          <p className="text-slate-200 leading-relaxed text-sm sm:text-base break-words">
                            {discussion.content}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 sm:gap-6 mt-5 pt-4 border-t border-white/10 text-sm text-slate-400">
                        <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg">
                          <ThumbUpOutlinedIcon fontSize="small" />
                          <span className="font-semibold text-slate-300">
                            {discussion.likes?.length || 0}
                          </span>
                        </span>
                        <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg">
                          <ThumbDownOutlinedIcon fontSize="small" />
                          <span className="font-semibold text-slate-300">
                            {discussion.dislikes?.length || 0}
                          </span>
                        </span>
                        <button
                          onClick={() => toggleDiscussion(discussion._id)}
                          className="flex items-center gap-1.5 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 px-3 py-1.5 rounded-lg transition-colors focus:outline-none"
                        >
                          <ChatBubbleOutlineIcon
                            fontSize="small"
                            className="text-sky-400"
                          />
                          <span className="font-semibold">
                            {discussion.comments?.length || 0}
                          </span>{" "}
                          Comments
                        </button>
                      </div>

                      {expanded && discussion.comments?.length > 0 && (
                        <div className="mt-5 space-y-3 bg-black/20 p-3 sm:p-4 rounded-xl border border-white/5">
                          {discussion.comments.map((comment, index) => (
                            <div
                              key={comment._id || index}
                              className="bg-slate-900/80 rounded-xl p-3 sm:p-4 border border-white/5"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-sm text-slate-200 flex items-center gap-2">
                                  <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-300">
                                    <PersonIcon style={{ fontSize: "12px" }} />
                                  </div>
                                  {comment.username || "User"}
                                </span>
                                <span className="text-xs text-slate-500">
                                  {formatDate(comment.createdAt)}
                                </span>
                              </div>
                              <p className="text-sm text-slate-400 leading-relaxed pl-7">
                                {comment.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300 shadow-md group">
      <div className="flex items-center justify-between mb-2">
        <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <div>
        <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {value}
        </div>
        <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium truncate">
          {title}
        </div>
      </div>
    </div>
  );
}

function ProgressRow({ label, value, max = 100, suffix = "" }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div>
      <div className="flex justify-between mb-2 text-sm">
        <span className="text-slate-400 font-medium">{label}</span>
        <span className="font-bold text-white">
          {Number(value).toFixed(
            typeof value === "number" && value % 1 !== 0 ? 1 : 0,
          )}
          {suffix}
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-slate-900 overflow-hidden border border-white/5 shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-1000 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
        </div>
      </div>
    </div>
  );
}

function ResultRow({ result, formatTime, formatDate }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-slate-900/60 hover:bg-slate-800/80 rounded-xl p-3 sm:p-4 border border-white/5 transition-colors cursor-default">
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-slate-200 truncate text-sm sm:text-base">
          {result.subject}
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1.5">
          <span>{formatDate(result.createdAt)}</span>
          <span className="w-1 h-1 rounded-full bg-slate-700"></span>
          <span className="flex items-center gap-1">
            <TimerIcon
              style={{ fontSize: "14px" }}
              className="text-slate-500"
            />
            {formatTime(result.timeTaken)}
          </span>
        </div>
      </div>
      <div className="text-right flex-shrink-0 bg-black/20 p-2 rounded-lg border border-white/5">
        <p className="font-bold text-emerald-400 text-sm sm:text-base">
          {result.score} pts
        </p>
        <p className="text-xs font-medium text-slate-400 mt-0.5">
          {Number(result.accuracy || 0).toFixed(1)}% Acc
        </p>
      </div>
    </div>
  );
}

function SectionHeader({ title, count, link }) {
  let navigate = useNavigate();
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
      {/* <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
        {title}
      </h2> */}
      <button
        onClick={() => {
          navigate(link.startsWith("/") ? link : `/${link}`);
          console.log(link);
        }}
        className="font-bold hover:font-semibold hover:text-blue-700"
      >
        Go to {title}
      </button>
      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold">
        {count}
      </span>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-10 sm:p-14 text-center max-w-md mx-auto w-full">
      <div className="mb-4">
        <InboxIcon
          style={{ fontSize: "3.5rem" }}
          className="text-slate-500/80"
        />
      </div>
      <p className="text-slate-400 text-sm sm:text-base font-medium">{text}</p>
    </div>
  );
}
