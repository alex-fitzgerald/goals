import React from "react"

function Navigation(props){
    return (
        <div className="navigation">
            <button name="Stoic" onClick={() => (props.handleClick("Stoic"))}>Stoicism</button> 
            <button name="Philosophy" onClick={() => (props.handleClick("Philosophy"))}>Philosophy</button> 
            <button name="Poem" onClick={() => (props.handleClick("Poem"))}>Poem</button> 
            <button name="Mindsets" onClick={() => (props.handleClick("Mindsets"))}>Mindsets</button> 
            <button name="Reminders" onClick={() => (props.handleClick("Reminders"))}>Reminders</button> 
            <button name="Daily" onClick={() => (props.handleClick("Daily"))}>Daily Goals</button> 
            <button name="LongTerm" onClick={() => (props.handleClick("LongTerm"))}>Long Term Goals</button> 
            <button name="AllGoals" onClick={() => (props.handleClick("AllGoals"))}>All Goals</button> 
            <button name="Create" onClick={() => (props.handleClick("Create"))}>Add</button> 
        </div>
    )
}

export default Navigation

