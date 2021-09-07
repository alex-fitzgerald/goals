import React from 'react'

function Stoic(props){
    return(
        <div className="daily component">
            <h1>Stoic idea</h1>
            <h2>{props.stoicInput.quote}</h2>
            <h3>{props.stoicInput.author}</h3>
        </div>
    )
}


export default Stoic