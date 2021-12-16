import React from "react";
import {PhilosophyContainer} from './Philosophy.styles'

function Philosophy({content:{content, author}}){
    console.log(author)
    console.log(content)
    return(
      <PhilosophyContainer>
        <h1>
            Philosophy
        </h1>
        <div className="daily component">
            <h2>
                {content}
            </h2>
            <h3>
                {author}
            </h3>
        </div>
    </PhilosophyContainer>
    )
}

export default Philosophy 