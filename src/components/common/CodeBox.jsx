import { useState } from 'react';
import '../../assets/styles/code-box.css';

export default function CodeBox({ id, lang, codeImg, outputImg }) {
    
    const [ showOutput, setShowOutput ] = useState('');

    function handleSelectedBtn(buttonId) {
        setShowOutput(so => (
            (so === '') ? buttonId : ''
        ))
    }
    
    return (
        <article>
            <div className="example example-code">
                <div className="code-header">
                    <div>{lang} code</div>
                    <button onClick={() => handleSelectedBtn(id)} className="run-btn">Run code</button>
                </div>

                <div className="code-content">
                    <img src={codeImg} alt="" />
                </div>
            </div>

            <div className={`example hide-output ${(showOutput===id) ? 'active-output' : ''}`}>
                <div className="output-header">
                    <div>Output</div>
                </div>

                <div className="output-content">
                    <img src={outputImg} alt="" />
                </div>
            </div>
        </article>
    )
}