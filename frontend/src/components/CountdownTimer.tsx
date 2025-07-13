
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2035-01-01T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
        const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ years, days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-white/90 to-purple-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-purple-200/30 max-w-md mx-auto lg:mx-0 animate-float">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-purple-600" />
        <span className="text-sm font-medium text-gray-700">Messages unlock in</span>
      </div>
      
      <div className="grid grid-cols-5 gap-2 text-center">
        <div className="bg-gradient-to-br from-purple-500 to-cyan-500 text-white rounded-lg p-2 shadow-lg transform hover:scale-105 transition-transform">
          <div className="text-xl font-bold">{timeLeft.years}</div>
          <div className="text-xs opacity-90">Years</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-cyan-500 text-white rounded-lg p-2 shadow-lg transform hover:scale-105 transition-transform">
          <div className="text-xl font-bold">{timeLeft.days}</div>
          <div className="text-xs opacity-90">Days</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-cyan-500 text-white rounded-lg p-2 shadow-lg transform hover:scale-105 transition-transform">
          <div className="text-xl font-bold">{timeLeft.hours}</div>
          <div className="text-xs opacity-90">Hours</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-cyan-500 text-white rounded-lg p-2 shadow-lg transform hover:scale-105 transition-transform">
          <div className="text-xl font-bold">{timeLeft.minutes}</div>
          <div className="text-xs opacity-90">Mins</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-cyan-500 text-white rounded-lg p-2 shadow-lg transform hover:scale-105 transition-transform">
          <div className="text-xl font-bold">{timeLeft.seconds}</div>
          <div className="text-xs opacity-90">Secs</div>
        </div>
      </div>
      
      <p className="text-center text-sm text-gray-600 mt-4">
        Until your message returns to you in 2035
      </p>
    </div>
  );
};
