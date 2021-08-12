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
            <div>
                 <h1>Today's poem</h1>
                 <h2>{props.poemInput.poemTitle}</h2>
                 <button onClick={handleClick}>{renderButton}</button>
            </div>
            <h3>{props.poemInput.poemAuthor}</h3>
            {handleLines()}
        </div>
    )
}

export default Poem