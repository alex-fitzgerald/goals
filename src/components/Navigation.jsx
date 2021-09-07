import React, { useState } from "react"

function Navigation(props){
    const navigationList = ["Stoic", "Philosophy", "Poem", "Mindsets", "Reminders", "Daily", "LongTerm", "AllGoals", "Create"]
    const [navigationNumber, setNavigationNumber] = useState(9);
    const [navigation, setNavigation] = useState(navigationList[navigationNumber]);
  
    function handleClick(number){
        setNavigationNumber(number)
        setNavigation(navigationList[number])   
        props.handleClick(number)
    }

    function handleNavBar(button){
        if (button === "right" && navigationNumber < navigationList.length - 1) {
        setNavigation(navigationList[navigationNumber + 1])
        setNavigationNumber(navigationNumber + 1)
        props.handleNavBar(button)
        }
        if (button === "left" && navigationNumber > 0) {
        setNavigation(navigationList[navigationNumber - 1])
        setNavigationNumber(navigationNumber - 1)
        props.handleNavBar(button)
        }
    }


    return (
        <div>
            <div className="navigation">
                <button name="Stoic"        className={navigation === "Stoic" ? "activePage" : ""}         onClick={() => (handleClick(0))}>Stoicism</button> 
                <button name="Philosophy"   className={navigation === "Philosophy" ? "activePage" : ""}    onClick={() => (handleClick(1))}>Philosophy</button> 
                <button name="Poem"         className={navigation === "Poem" ? "activePage" : ""}          onClick={() => (handleClick(2))}>Poem</button> 
                <button name="Mindsets"     className={navigation === "Mindsets" ? "activePage" : ""}      onClick={() => (handleClick(3))}>Mindsets</button> 
                <button name="Reminders"    className={navigation === "Reminders" ? "activePage" : ""}     onClick={() => (handleClick(4))}>Reminders</button> 
                <button name="Daily"        className={navigation === "Daily" ? "activePage" : ""}         onClick={() => (handleClick(5))}>Daily Goals</button> 
                <button name="LongTerm"     className={navigation === "LongTerm" ? "activePage" : ""}      onClick={() => (handleClick(6))}>Long Term</button> 
                <button name="AllGoals"     className={navigation === "AllGoals" ? "activePage" : ""}      onClick={() => (handleClick(7))}>All Goals</button> 
                <button name="Create"       className={navigation === "Create" ? "activePage" : ""}        onClick={() => (handleClick(8))}>Add</button> 
            </div>
            <div class="sideBar">
                <button className="left"    onClick={() => handleNavBar("left")}> </button>
                <button className="right"   onClick={() => handleNavBar("right")}> </button>
            </div>
        </div>
    )
}

export default Navigation

