'use client'
import React, { useState, useEffect, createRef } from 'react';
import MathInput from './components/mathquill';

const Home = () => {

  const [inputs, setInputs] = useState([0]);

  const inputRefs = inputs.map(() => createRef < HTMLDivElement > ());

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      const newId = inputs.length > 0 ? Math.max(...inputs) + 1 : 0;
      // Insert the new input at position 1
      const updatedInputs = [...inputs];
      updatedInputs.splice(1, 0, newId);
      setInputs(updatedInputs);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <h1>Next.js with MathQuill</h1>
      <div className="w-[500px]">
        {inputs.map((id, index) => (
          <div
            key={id}
            ref={inputRefs[index]}
          >
            <MathInput onKeyDown={(e) => handleKeyDown(e)} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default Home;