import { useEffect, useState } from "react";
const Timer = ({ settimeover, min, setmin }) => {
  const [sec, setsec] = useState(0)
  const [start, setstart] = useState(false)

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
      <button onClick={() => setstart(true)}>start</button>
      <button onClick={() => setmin(1)}>dora</button>
      <div>{min}</div>
      <div>{sec}</div>
    </>
  )
}

export default Timer