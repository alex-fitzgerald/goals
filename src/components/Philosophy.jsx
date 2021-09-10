import React from "react";

function Philosophy(props){
    return(
      <div>
        <h1>
            Philosophy
        </h1>
        <div className="daily component">
            <h2>
                {props.philosophyInput.quote}
            </h2>
            <h3>
                {props.philosophyInput.author}
            </h3>
        </div>
    </div>
    )
}

export default Philosophy 