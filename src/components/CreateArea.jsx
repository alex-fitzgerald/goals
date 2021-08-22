import React, { useState } from "react";

function CreateArea(props) {
  const [kwmlGoal, setKwmlGoal] = useState({
    goal: "",
    category: "King",
    type: "Goal",
    scope: "Daily"
    });
  const [type, setType] = useState("Goal")
  

  function handleChange(event){
    const { name, value } = event.target;
    
    if (name === "type") {
      setType(value)
    }

    setKwmlGoal(prevNote => {
        return {
          ...prevNote,
          [name]: value
        }
      });
    }

    function formSubmit(event){
      if (kwmlGoal.goal === "") {
        alert("Please enter a goal")
        event.preventDefault();
      } else {
        setKwmlGoal({goal:"", category:"King", type: "Goal", scope:"Daily"})
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
              onChange={handleChange}
              name="goal" 
              placeholder="Goal" 
              value={kwmlGoal.goal}
            />
          <br />
          <select name="category" placeholder="Category" list="goalCategory" id="goalCategory"
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
            onChange={handleChange}
            rows="1" 
            value={kwmlGoal.type}>
              <option value="Goal">Goal</option>
              <option value="Reminder">Reminder</option>
              <option value="Mindset">Mindset</option>
            </select> 
            <br />
          {type === "Goal" ? <select name="scope" placeholder="Scope" list="scopeCategory" id="scopeCategory"  onChange={handleChange} rows="1" value={kwmlGoal.scope}>
                          <option value="Daily">Daily</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
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
