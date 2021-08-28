import React, { useState } from "react";

function CreateArea(props) {
  const [kwmlGoal, setKwmlGoal] = useState({
    goal: "",
    category: "King",
    type: "Goal",
    scope: "Daily",
    testing: null
    });

    const [type, setType] = useState("Goal")
    const [titleInputEngaged, setTitleInputEngaged] = useState(false)
    const [categoryInputEngaged, setCategoryInputEngaged] = useState(false)
    const [scopeInputEngaged, setScopeInputEngaged] = useState(false)
    const [typeInputEngaged, setTypeInputEngaged] = useState(false)

    function handleChange(event){
      const { name, value } = event.target;
      
      setKwmlGoal(prevNote => {
        return {
          ...prevNote,
          [name]: value
        }
      });

      if (name === "goal") {
        setTitleInputEngaged(true)
      } else if (name === "category") {
        setCategoryInputEngaged(true)
      } else if (name === "type") {
        setTypeInputEngaged(true)
      } else if (name === "scope") {
        setScopeInputEngaged(true)
      } 
      
      if (name === "type") {
        setType(value)
      }
    }

    function formSubmit(event){
      if (kwmlGoal.goal === "") {
        alert("Please enter a goal")
        event.preventDefault();
      } else {
        setKwmlGoal({goal:"", category:"King", type: "Goal", scope:"Daily"})
        setTitleInputEngaged(false)
        setCategoryInputEngaged(false)
        setScopeInputEngaged(false)
        setTypeInputEngaged(false)
        event.preventDefault();
      }
    }

  return ( 
    <div className="createGoal">
      <h1>Set a goal</h1>
      <div className="daily">
        <div class="daily-wrapper">
          <form onSubmit={formSubmit}>
            <input 
              className={"" + (titleInputEngaged ? "input-engaged" : null)}
              // className="input-engaged"
              onChange={handleChange}
              name="goal" 
              placeholder="Goal, Mindset, or Reminder title" 
              value={kwmlGoal.goal}
            />

          <br />

          <select name="category" placeholder="Category" list="goalCategory" id="goalCategory"
            className={"" + (categoryInputEngaged ? "input-engaged" : null)}
            onChange={handleChange}
            rows="1" 
            value={kwmlGoal.category}>
              <option value="King">King</option>
              <option value="Warrior">Warrior</option>
              <option value="Magician">Magician</option>
              <option value="Lover">Lover</option>
            </select> 
            <br />
          <select name="type" placeholder="Type" list="goalType" id="goalType"
            className={"" + (typeInputEngaged ? "input-engaged" : null)}
            onChange={handleChange}
            rows="1" 
            value={kwmlGoal.type}>
              <option value="Goal">Goal</option>
              <option value="Reminder">Reminder</option>
              <option value="Mindset">Mindset</option>
            </select> 
            <br />
          {type === "Goal" ? 
          <select 
            className={"" + (scopeInputEngaged ? "input-engaged" : null)}
            name="scope"
            placeholder="Scope" 
            list="scopeCategory" 
            id="scopeCategory"  
            onChange={handleChange} 
            rows="1" 
            value={kwmlGoal.scope}>
            <option value="Daily">Daily activity goal</option>
            <option value="Long-term">Long term goal</option>
            <option value="Very-long-term">Very long term goal</option>
          </select> : null
            }
            <br />
            <button onClick={() => (props.onAdd(kwmlGoal))}>Add</button>
          </form>
          </div>
      </div>
    </div>
  );
  }

export default CreateArea;
