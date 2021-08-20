import React, { useState } from "react";

function CreateArea(props) {
  const [kwmlGoal, setKwmlGoal] = useState({
    goal: "",
    category: "King"
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
        setKwmlGoal({goal:"", category:"King"})
        event.preventDefault();
      }
    }

  return ( 
    <div className="daily">
    <h1>Set a goal</h1>
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
          <button onClick={() => (props.onAdd(kwmlGoal))}>Add</button>
        </form>
        </div>
    </div>
  );
  }

export default CreateArea;
