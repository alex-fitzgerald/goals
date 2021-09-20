import React, { useState } from "react";

function CreateArea(props) {
  const [kwmlGoal, setKwmlGoal] = useState({
    goal: "",
    category: "Conscientiousness",
    type: "Goal",
    scope: "Daily",
    isPinned:false
    });

    const [type, setType] = useState("Goal")
    // const [titleInputEngaged, setTitleInputEngaged] = useState(false)
    // const [categoryInputEngaged, setCategoryInputEngaged] = useState(false)
    // const [scopeInputEngaged, setScopeInputEngaged] = useState(false)
    // const [typeInputEngaged, setTypeInputEngaged] = useState(false)
    const [inputEngaged, setInputEngaged] = useState(false)

    function handleChange(event){
      const { name, value } = event.target;

      setInputEngaged(true)
      
      setKwmlGoal(prevNote => {
        return {
          ...prevNote,
          [name]: value
        }
      });

      // if (name === "goal") {
      //   setTitleInputEngaged(true)
      // } else if (name === "category") {
      //   setCategoryInputEngaged(true)
      // } else if (name === "type") {
      //   setTypeInputEngaged(true)
      // } else if (name === "scope") {
      //   setScopeInputEngaged(true)
      // } 
      
      if (name === "type") {
        setType(value)
      }
    }

    function formSubmit(event){
      if (kwmlGoal.goal === "") {
        alert("Please enter a goal")
        event.preventDefault();
      } else {
        setKwmlGoal({goal:"", category:"Conscientiousness", type: "Goal", scope:"Daily"})
        setType("Goal");
        setInputEngaged(false)
        // setTitleInputEngaged(false)
        // setCategoryInputEngaged(false)
        // setScopeInputEngaged(false)
        // setTypeInputEngaged(false)
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
              className={"" + (inputEngaged ? "input-engaged" : null)}
              // className="input-engaged"
              type="text"
              onChange={handleChange}
              name="goal" 
              placeholder="Title" 
              value={kwmlGoal.goal}
            />


          <select name="category" placeholder="Category" list="goalCategory" id="goalCategory"
            className={"" + (inputEngaged ? "input-engaged" : null)}
            onChange={handleChange}
            rows="1" 
            value={kwmlGoal.category}>
              <option value="Conscientiousness">Conscientiousness</option>
              <option value="Extraversion">Extraversion</option>
              <option value="Openness">Openness</option>
              <option value="Agreeableness">Agreeableness</option>
            </select> 
          <select name="type" placeholder="Type" list="goalType" id="goalType"
            className={"" + (inputEngaged ? "input-engaged" : null)}
            onChange={handleChange}
            rows="1" 
            value={kwmlGoal.type}>
              <option value="Goal">Goal</option>
              <option value="Reminder">Reminder</option>
              <option value="Mindset">Mindset</option>
            </select> 
          {type === "Goal" ? 
          <select 
            className={"" + (inputEngaged ? "input-engaged" : null)}
            name="scope"
            placeholder="Scope" 
            list="scopeCategory" 
            id="scopeCategory"  
            onChange={handleChange} 
            rows="1" 
            value={kwmlGoal.scope}>
            <option value="Daily">Daily activity goal</option>
            <option value="Long-term">Long term goal</option>
            {/* <option value="Very-long-term">Very long term goal</option> */}
          </select> : null
            }
            <button className={kwmlGoal.category + "Button"}onClick={() => (props.onAdd(kwmlGoal))}>Add</button>
          </form>
          </div>
      </div>
    </div>
  );
}

export default CreateArea;
