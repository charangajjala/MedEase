import { useEffect, useState } from 'react';

const useAnimatedNumber = (target, duration = 500) => {
  const [displayedNumber, setDisplayedNumber] = useState(target);

  useEffect(() => {
    const stepTime = Math.abs(Math.floor(duration / (target - displayedNumber)));
    const timer = setInterval(() => {
      setDisplayedNumber(prevNumber => {
        if (target > prevNumber) {
          return prevNumber + 1;
        } else if (target < prevNumber) {
          return prevNumber - 1;
        } else {
          clearInterval(timer);
          return prevNumber;
        }
      });
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return displayedNumber;
};

export default useAnimatedNumber;