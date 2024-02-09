import React from "react";

const useDebounce = (callback, delay) => {
  const timeoutRef = React.useRef(null);

  React.useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  const debounceTimeout = (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debounceTimeout;
};

export default useDebounce;
