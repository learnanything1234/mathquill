'use client'
import React, { useState, useEffect, createRef } from 'react';
import MathInput from './components/mathquill';

const Home = () => {

  const [inputs, setInputs] = useState([0, 2, 4, 6, 8, 10]);
  const [mathFields, setMathFields] = useState([]);

  const handleAddMathField = (mathField) => {
    setMathFields(prevFields => [...prevFields, mathField]);
  };

  const [focusIndex, setFocusIndex] = useState < number | null > (null);
  const [floatingDivPosition, setFloatingDivPosition] = useState < { top: number, left: number } | null > (null);
  const inputRefs = inputs.map(() => createRef < HTMLDivElement > ());

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === 'Enter') {
      console.log(inputs)
      let updatedInputs = [...inputs]
      updatedInputs.push(Math.max(...inputs) + 1)


      setInputs([0, 1, 2, 4, 6, 8, 10]);
      setFocusIndex(index + 1);

    } else if (e.key === 'ArrowUp' && index > 0) {
      e.preventDefault();
      setFocusIndex(index - 1);
    } else if (e.key === 'ArrowDown' && index < inputs.length - 1) {
      e.preventDefault();
      setFocusIndex(index + 1);
    }
  };

  const handleFocus = (index: number) => {
    setFocusIndex(index);
    if (inputRefs[index]?.current) {
      const rect = inputRefs[index].current.getBoundingClientRect();
      setFloatingDivPosition({ top: rect.bottom, left: rect.left });
    }

  };

  const handleBlur = () => {
    //setFocusIndex(null);
    //setFloatingDivPosition(null);
  };

  useEffect(() => {
    console.log(inputs)
  }, [inputs]);

  /*
    useEffect(() => {
      console.log(mathFields.forEach(mf => console.log(mf.latex())))
      if (focusIndex !== null && inputRefs[focusIndex]?.current) {
        const textarea = inputRefs[focusIndex].current?.querySelector('textarea');
        if (textarea) {
          textarea.focus();
        }
      }
      //setFocusIndex(null);  // Reset focus index
    }, [inputs, focusIndex]);
    */

  const addSymbol = (symbol: string) => {
    const textarea = inputRefs[focusIndex].current?.querySelector('textarea');
    if (textarea) {
      textarea.focus();
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
            className={index === 0 ? 'first' : index === inputs.length - 1 ? 'last' : ''}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
          >
            <MathInput setMathField={handleAddMathField} onKeyDown={(e) => handleKeyDown(e, index)} />
          </div>
        ))}
      </div>
      {/* Button to log the LaTeX from all mathFields */}
      <button onClick={() => mathFields.forEach(mf => console.log(mf.latex()))}>
        Log All Latex
      </button>
      {floatingDivPosition && (
        <div
          style={{
            position: 'fixed',
            top: window.innerWidth >= 768 ? `${floatingDivPosition.top}px` : undefined,
            left: window.innerWidth >= 768 ? `${floatingDivPosition.left}px` : undefined,
            zIndex: 1000,
          }}
          className="w-full bg-red-500 fixed bottom-0 h-8 md:m-5 md:w-[400px]"
        >
          <button onClick={() => addSymbol('\\sqrt')}>√</button>
          <button onClick={() => addSymbol('^2')}>²</button>
          <button onClick={() => addSymbol('\\frac')}>Fraction</button>
          <button onClick={() => addSymbol('\\div')}>÷</button>
        </div>
      )}
    </div>
  );
};

export default Home;