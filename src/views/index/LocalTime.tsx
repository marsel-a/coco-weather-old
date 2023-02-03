import { useEffect, useState } from 'react';

const LocalTime = () => {
  // States
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(intervalId);
  });

  return (
    <div className="flex gap-2 text-sm mt-4 justify-center">
      <div>
        {currentDate.toLocaleString('en-us', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      </div>
      <div>|</div>
      <div>
        Local time: {currentDate.toLocaleString('en-us', { hour: 'numeric', minute: 'numeric', second: 'numeric' })}
      </div>
    </div>
  );
};

export default LocalTime;

