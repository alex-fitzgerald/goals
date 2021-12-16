import React, { useState, useEffect } from "react";
import { TextAreaContainer } from "./TextArea.styles";

export const TextArea = ({ cardGoal, handleGoalChange, goalHasChanged }) => {
    const [ goal, setGoal ] = useState();
    
    useEffect(() => {
        setGoal(cardGoal);
    }, [cardGoal]);

    const handleChange = (event) => {
        const { value } = event.target;
        handleGoalChange(value);
        goalHasChanged(true);
    }

    return (
    <div>
        <TextAreaContainer 
            onChange={handleChange}
            name="goal" 
            placeholder="Goal"
            rows="2" 
            value={goal}>
        </TextAreaContainer>
    </div>
    )
}