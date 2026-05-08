import { useContext } from "react";
import { Context } from "../MyContext";
import PostPage from "../components/discussion/PostPage";

const Discussions = () => {
  const { darkmode } = useContext(Context);

  return (
    <div
      className={`min-h-screen transition-colors duration-700 pt-28 pb-10 px-4 ${
        darkmode ? "bg-[#0a0a0a] text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <PostPage />
    </div>
  );
};

export default Discussions;
