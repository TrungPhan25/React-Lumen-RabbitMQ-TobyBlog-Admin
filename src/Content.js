import { useState } from "react";

function Content() {
  const [count, setCount] = useState(60);
    
  const handleStart = () => {
    setInterval(() => {
      setCount(preCount => preCount - 1);
    }, 1000);
  }

  const handleStop = () => {
    // clearInterval();
  }

    return (
        <div>
          <h1>{count}</h1>
          <button onClick={handleStart}>Start</button>
          <button onClick={handleStop}>Stop</button>        
        </div>
    );
}

export default Content;