import React, { useState, useEffect } from 'react';

const useWindowFocusDetector = () => {
  const [isWindowFocused, setIsWindowFocused] = useState(document.hasFocus());

  useEffect(() => {
    const handleWindowFocus = () => {
      setIsWindowFocused(true);
    };

    const handleWindowBlur = () => {
      setIsWindowFocused(false);
    };

    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, []); 

  return (isWindowFocused );
};

export default useWindowFocusDetector;
