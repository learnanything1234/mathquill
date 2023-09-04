'use client'

import dynamic from 'next/dynamic';

const EditableMathField = dynamic(() => import("react-mathquill"), { ssr: false })



function MathInput({ onKeyDown }) {


    const onMathQuillDidMount = (mathField) => {

        mathField.latex(Math.floor(Math.random() * 100))
        // Adding custom keypress event to the MathQuill object
        mathField.el().addEventListener('keydown', (e) => {
            onKeyDown(e, mathField.latex());
        });
    };

    return (
        <>
            <EditableMathField
                latex=""
                mathquillDidMount={onMathQuillDidMount}
            />
        </>
    )
}

export default MathInput