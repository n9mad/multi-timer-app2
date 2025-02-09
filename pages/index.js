import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";

export default function Home() {
  const [timers, setTimers] = useState([]);
  const refs = useRef({}); // Store refs for draggable timers

  const addTimer = () => {
    const newTimerId = timers.length + 1;
    refs.current[newTimerId] = React.createRef(); // Create a new ref for the timer
    setTimers([
      ...timers,
      {
        id: newTimerId,
        name: `Timer ${newTimerId}`,
        duration: 10,
        timeLeft: 10,
        running: false,
      },
    ]);
  };

  const startTimer = (id) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, running: true } : timer
      )
    );
  };

  const resetTimer = (id) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id
          ? { ...timer, timeLeft: timer.duration, running: false }
          : timer
      )
    );
  };

  const updateDuration = (id, value) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id
          ? { ...timer, duration: value, timeLeft: value }
          : timer
      )
    );
  };

  const renameTimer = (id, newName) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, name: newName } : timer
      )
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) =>
          timer.running && timer.timeLeft > 0
            ? { ...timer, timeLeft: timer.timeLeft - 1 }
            : timer
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Multi Timer App</h1>
      <button onClick={addTimer} style={{ margin: "10px", padding: "10px" }}>
        Add Timer
      </button>
      <div>
        {timers.map((timer) => (
          <Draggable key={timer.id} nodeRef={refs.current[timer.id]}>
            <div
              ref={refs.current[timer.id]} // Attach the correct ref
              style={{
                margin: "20px auto",
                border: "1px solid black",
                padding: "10px",
                width: "300px",
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f9f9f9",
              }}
            >
              <input
                type="text"
                value={timer.name}
                onChange={(e) => renameTimer(timer.id, e.target.value)}
                style={{
                  marginBottom: "10px",
                  padding: "5px",
                  textAlign: "center",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="number"
                value={timer.duration}
                onChange={(e) => updateDuration(timer.id, Number(e.target.value))}
                style={{ margin: "5px", padding: "5px", width: "60px" }}
              />
              <p style={{ fontSize: "20px" }}>{timer.timeLeft} seconds</p>
              <button
                onClick={() => startTimer(timer.id)}
                style={{
                  margin: "5px",
                  padding: "15px",
                  fontSize: "16px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Start
              </button>
              <button
                onClick={() => resetTimer(timer.id)}
                style={{
                  margin: "5px",
                  padding: "10px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Reset
              </button>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}
