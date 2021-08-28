import React, { useState } from "react"

function Navigation(props){

    return (
        <div>
            <div className="navigation">
                <button name="Stoic" onClick={() => (props.handleClick(0))}>Stoicism</button> 
                <button name="Philosophy" onClick={() => (props.handleClick(1))}>Philosophy</button> 
                <button name="Poem" onClick={() => (props.handleClick(2))}>Poem</button> 
                <button name="Mindsets" onClick={() => (props.handleClick(3))}>Mindsets</button> 
                <button name="Reminders" onClick={() => (props.handleClick(4))}>Reminders</button> 
                <button name="Daily" onClick={() => (props.handleClick(5))}>Daily Goals</button> 
                <button name="LongTerm" onClick={() => (props.handleClick(6))}>Long Term</button> 
                <button name="AllGoals" onClick={() => (props.handleClick(7))}>All Goals</button> 
                <button name="Create" onClick={() => (props.handleClick(8))}>Add</button> 
            </div>
            <div class="sideBar">
                <button className="left" onClick={() => props.handleNavBar("left")}>.</button>
                <button className="right" onClick={() => props.handleNavBar("right")}>.</button>
            </div>
        </div>
    )
}

export default Navigation

