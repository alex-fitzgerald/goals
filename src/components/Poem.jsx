import React, {useState } from 'react'


function Poem(props){
    const [renderLines, setRenderLines] = useState(false)
    const [renderButton, setRenderButton] = useState("Read more")
    const poemLines = props.poemInput.poemLines

    function handleLines(){
        if (renderLines === false) {
            return (poemLines.slice(0, 4).map((poemLine) => ( <pre>{poemLine}</pre> )));
        } else {
            return (poemLines.map((poemLine) => ( <pre>{poemLine}</pre> )));
        }
    }

    function handleClick(){
        if (renderLines === false) {
            setRenderLines(true)
            setRenderButton("Condense")
        } else {
            setRenderLines(false)
            setRenderButton("Read poem");
    }}

    return(
        <div className="daily poem">
            <div className="header">
                <h1>{props.poemInput.poemTitle}</h1>
            </div>
            <h2>{props.poemInput.poemAuthor}</h2>
            {handleLines()}
         <button onClick={handleClick}>{renderButton}</button>
        </div>
    )
}

export default Poem