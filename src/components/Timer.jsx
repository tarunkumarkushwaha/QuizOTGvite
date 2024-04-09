import { useContext, useEffect, useState } from "react";
import { Context } from '../MyContext';

const Timer = ({ settimeover, min, setmin }) => {
  const [sec, setsec] = useState(0)
  const { start, setstart } = useContext(Context);

  const timer = () => {
    if (start) {
      if (sec > 0) {
        setsec(sec - 1);
      }
      if (sec === 0) {
        setmin(min - 1);
        setsec(59);
      }
    }
  }
  useEffect(() => {
    const interval = setInterval(() => timer(), 1000);
    if (min === 0 && sec === 0) {
      settimeover(true)
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [sec, min, start]);

  return (
    <>
      <div className="w-36 justify-center flex flex-row absolute top-20 font-extrabold text-2xl italic right-10 bg-green-200 shadow-xl rounded-xl items-center">
        <p className="p-2 ">{min}</p>
        <p className="p-2 ">:</p>
        <p className="p-2 ">{sec > 0 ? sec : "0" + sec}</p>
      </div>
    </>
  )
}

export default Timer