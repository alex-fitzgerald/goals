import React from 'react'

function Stoic(props){
    return(
        <div className="daily">
            <h1>{props.stoicInput.quote}</h1>
            <h2>{props.stoicInput.author}</h2>
        </div>
    )
}

export default Stoic