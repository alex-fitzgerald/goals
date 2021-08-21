import React, { useState } from "react";

function CreateArea(props) {
  const [kwmlGoal, setKwmlGoal] = useState({
    goal: "",
    category: "King",
    scope: "Daily"
    });

  function handleChange(event){
    const { name, value } = event.target;
  
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
        setKwmlGoal({goal:"", category:"King", scope:"Daily"})
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
          <select name="scope" placeholder="Scope" list="scopeCategory" id="scopeCategory"
            onChange={handleChange}
            rows="1" 
            value={kwmlGoal.scope}>
              <option value="Daily">Daily</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select> 
            <br />
            <button onClick={() => (props.onAdd(kwmlGoal))}>Add</button>
          </form>
          </div>
      </div>
    </div>
  );
  }

export default CreateArea;
