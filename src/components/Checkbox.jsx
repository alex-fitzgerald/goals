import React, { useState } from "react"

function Checkbox(props){
    const [checked, setChecked] = useState(props.state)

    function toggle(value){
        props.onChange(!value);
        return !value;
    }

    return(
        <div className="checkboxDiv">
            <input type="checkbox" onChange={() => setChecked(toggle)} checked={checked}/>
            <label>Pin</label>
        </div> 
    )
}

export default Checkbox