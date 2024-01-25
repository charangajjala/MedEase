import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const RedirectToast = ({ duration }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress > 0) return prevProgress - 100 / (duration / 1000);
        return prevProgress;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [duration]);

  return (
    <div>
      <p>Successful login! Redirecting...</p>
      <div style={{ background: 'lightgrey', height: '5px', borderRadius: '5px', margin: '5px' }}>
        <div
          style={{
            background: 'green',
            width: `${progress}%`,
            height: '5px',
            borderRadius: '5px',
            transition: 'width 1s ease-in-out',
          }}
        ></div>
      </div>
    </div>
  );
};

RedirectToast.propTypes = {
  duration: PropTypes.number,
};

export default RedirectToast;