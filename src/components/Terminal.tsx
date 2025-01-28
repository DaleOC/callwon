import React, { useState, useEffect } from 'react';
import { Circle } from 'lucide-react';

export const TerminalBox = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const lines = [
    { text: '> Initializing AI model...', delay: 0 },
    { text: '> Loading customer data...', delay: 1000 },
    { text: '> Analyzing patterns...', delay: 2000 },
    { text: '> Generating personalized responses...', delay: 3000 },
    { text: '> Optimizing for engagement...', delay: 4000 },
    { text: '> AI system ready.', delay: 5000 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLine(prev => (prev < lines.length - 1 ? prev + 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, [lines.length]);

  return (
    <div className="bg-[#1A1A1A] rounded-lg shadow-xl overflow-hidden">
      <div className="bg-[#2A2A2A] px-4 py-2 flex items-center space-x-2">
        <Circle className="w-3 h-3 text-red-500" fill="currentColor" />
        <Circle className="w-3 h-3 text-yellow-500" fill="currentColor" />
        <Circle className="w-3 h-3 text-green-500" fill="currentColor" />
        <span className="ml-2 text-white/60 text-sm">AI Processing Terminal</span>
      </div>
      
      <div className="p-6 font-mono min-h-[300px]">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`text-sm mb-2 ${
              index <= currentLine
                ? 'opacity-100 transform translate-y-0'
                : 'opacity-0 transform translate-y-2'
            } transition-all duration-300`}
            style={{ 
              transitionDelay: `${line.delay}ms`,
              color: index === currentLine ? '#D6DE23' : '#A0A0A0'
            }}
          >
            {line.text}
            {index === currentLine && (
              <span className="ml-1 animate-pulse">▋</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TerminalBox;