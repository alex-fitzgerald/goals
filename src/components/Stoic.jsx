import React from 'react'

function Stoic(props){
    return(
        <div>
            <h1>Stoic idea</h1>
            <div className="daily component">
                <h2>{props.stoicInput.quote}</h2>
                <h3>{props.stoicInput.author}</h3>
            </div>
        </div>
    )
}


export default Stoic