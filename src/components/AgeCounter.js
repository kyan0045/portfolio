import React, { useState, useEffect } from "react";

// Outside the component to prevent it from being recreated on every render.
const birthDate = new Date("2008-01-10");

const AgeCounter = () => {
  const [age, setAge] = useState(0);

  useEffect(() => {
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }

    const end = calculatedAge;
    if (end <= 0) {
      setAge(end);
      return;
    }

    let timer;
    let currentCount = 0;

    // Easing function: starts slow, accelerates (ease-in)
    const easeInQuad = (t) => t * t;

    const animate = () => {
      currentCount++;
      setAge(currentCount);

      if (currentCount < end) {
        const progress = currentCount / end;
        const easedProgress = easeInQuad(progress);

        const maxDelay = 250; // Slowest speed (at the start)
        const minDelay = 40; // Fastest speed (at the end)
        const currentDelay = maxDelay - (maxDelay - minDelay) * easedProgress;

        timer = setTimeout(animate, currentDelay);
      }
    };

    // Start the animation
    animate();

    return () => clearTimeout(timer);
  }, []);

  return <span className="font-bold text-black">{age}</span>;
};

export default AgeCounter;
