import { useState, useEffect, useContext } from "react";
import { Context } from "../MyContext";

const Timer = ({ settimeover}) => {
  const { start, timeLeft, setTimeLeft } = useContext(Context);

  useEffect(() => {
    if (!start) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          settimeover(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [start, settimeover]);

  const minute = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;

  return (
    <div
      className={`absolute top-20 right-10 px-5 py-3 rounded-xl font-bold
        ${timeLeft <= 10 ? "bg-red-400 animate-pulse" : "bg-green-300"}`}
    >
      {String(minute).padStart(2, "0")}:
      {String(sec).padStart(2, "0")}
    </div>
  );
};

export default Timer;
