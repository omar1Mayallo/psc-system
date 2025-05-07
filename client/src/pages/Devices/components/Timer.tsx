import {Chip} from "@mui/material";
import {useState, useEffect} from "react";

export default function CounterTimer({startTime}: {startTime: number}) {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    // Start the timer
    const timerStartTime = Date.now() - startTime;
    setElapsedTime(timerStartTime / 1000);

    // Update the timer every second
    const timerInterval = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(timerInterval);
    };
  }, [startTime]);

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = Math.floor(elapsedTime % 60);

  return (
    <Chip
      label={`${hours} hour : ${minutes} min : ${seconds} sec`}
      size="medium"
      color="primary"
    />
  );
}
