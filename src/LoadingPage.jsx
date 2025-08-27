import { useState, useEffect } from "react";
import "./LoadingPage.css";
import candleImage from "./assets/candle.png";

const LoadingPage = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          return 100;
        }
        return prev + 1;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  const handleEnterRealm = () => {
    setFadeOut(true);
    // Wait for the full CSS transition (1.2s) plus a small buffer
    setTimeout(() => {
      onLoadingComplete();
    }, 1300);
  };

  return (
    <div className={`loading-page ${fadeOut ? "fade-out" : ""}`}>
      <div className="loading-content">
        <div className="candle-container">
          <img src={candleImage} alt="Candle" className="candle-image" />
        </div>

        <h1 className="loading-text">Welcome to my realm</h1>

        <div className="loading-bar-container">
          <div className="loading-bar">
            <div
              className={`loading-progress ${isComplete ? "complete" : ""}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className={`loading-percentage ${isComplete ? "complete" : ""}`}>
            {Math.round(progress)}%
          </div>
          {isComplete && (
            <button className="enter-realm-btn" onClick={handleEnterRealm}>
              Enter the Realm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
