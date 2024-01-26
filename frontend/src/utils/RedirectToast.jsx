import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './RedirectToast.scss'; // Import the SCSS file

const RedirectToast = ({ duration, message }) => {
  const [progress, setProgress] = useState(100);
  const radius = 12; 
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress - 100 / (duration / 1000);
        return newProgress > 0 ? newProgress : 0;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [duration]);

  return (
    <div className="redirect-toast">
      <div className="icon-text">
        <svg
          className="circular-progress-indicator"
          width="50"
          height="50"
          viewBox="0 0 50 50"
        >
          <circle
            className="progress-ring__background"
            stroke="#e6e6e6"
            cx="25"
            cy="25"
            r={radius}
            strokeWidth="4"
            fill="none"
          />
          <circle
            className="progress-ring"
            stroke="#4caf50"
            cx="25"
            cy="25"
            r={radius}
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={(100 - progress) / 100 * circumference}
            strokeLinecap="round"
            transform="rotate(-90 25 25)"
          />
        </svg>
        <span className="toast-text">{message}</span>
      </div>
    </div>
  );
};

RedirectToast.propTypes = {
  duration: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
};

export default RedirectToast;
