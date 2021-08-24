import React,{ useState } from "react";

function Philosophy(props){
    return(
        <div className="daily component">
            <h1>
                Philosophy
            </h1>
            <h2>
                {props.philosophyInput.quote}
            </h2>
            <h3>
                {props.philosophyInput.author}
            </h3>
        </div>
    )
}

export default Philosophy 