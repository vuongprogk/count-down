import { Fireworks, FireworksHandlers } from '@fireworks-js/react'
import React, { useEffect, useRef, useState } from 'react';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isNewYear, setIsNewYear] = useState<boolean>(false);
  const [isEnabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nextYear = new Date(now.getFullYear() + 1, 0, 1);
      const diff = nextYear.getTime() - now.getTime();

      if (diff <= 0) {
        setIsNewYear(true);
        setTimeLeft('Happy New Year!');
        clearInterval(intervalId);
        setEnabled(true);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    };

    const intervalId = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div id="countdown-card" className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl mb-4">Countdown to New Year</h1>
        <div id="countdown" className="text-6xl font-bold">{timeLeft}</div>
      </div>
      <button
        id="test-fireworks"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setEnabled(false)}
      >
        Clear
      </button >
      {isEnabled &&
        <Fireworks
          options={{
            autoresize: true,
            opacity: 0.5,
            acceleration: 1.05,
            friction: 0.97,
            gravity: 1.5,
            particles: 110,
            traceLength: 3,
            traceSpeed: 10,
            explosion: 5,
            intensity: 50,
            flickering: 50,
            lineStyle: 'round',
            hue: {
              min: 0,
              max: 360
            },
            delay: {
              min: 30,
              max: 60
            },
            rocketsPoint: {
              min: 25,
              max: 75
            },
            lineWidth: {
              explosion: {
                min: 1,
                max: 4
              },
              trace: {
                min: 0.1,
                max: 1
              }
            },
            brightness: {
              min: 50,
              max: 80
            },
            decay: {
              min: 0.005,
              max: 0.018
            },
            mouse: {
              click: false,
              move: false,
              max: 1
            },
            sound: {
              enabled: true,
              files: [
                'explosion0.mp3',
                'explosion1.mp3',
                'explosion2.mp3'
              ],
              volume: {
                min: 4,
                max: 10
              }
            }
          }}
          className='fixed top-0 left-0 w-full h-full pointer-events-none'
        />
      }
      {/* <canvas id="fireworks" className="fixed top-0 left-0 w-full h-full pointer-events-none"></canvas> */}
    </>
  );
};

export default Countdown;
