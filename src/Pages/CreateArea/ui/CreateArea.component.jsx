import React, { useState } from "react";
import { CustomButton } from "../../../components/CustomButton/CustomButton.component";
import { additem } from "../../../firebase/firebase.utils";
import { useDispatch } from "react-redux";

export const CreateArea = (props) => {
  const [goal, setGoal] = useState({
    goal: "",
    category: "King",
    type: "Goal",
    scope: "Daily",
    isPinned:false
    });

    const user = "fitzgerald.s.alexander@gmail.com";

    const dispatch = useDispatch();

    const [inputEngaged, setInputEngaged] = useState(false);

    function handleChange(event){
      const { name, value } = event.target;
      setGoal(prevGoal => {
        return {
          ...prevGoal,
          [name]: value
        }
      });
    }

    function formSubmit(event){
      if (goal.goal === "") {
        event.preventDefault();
        alert('Please enter a goal');
      } else {
        additem(goal)
        event.preventDefault();
        setGoal({goal:"", category:"King", type: "Goal", scope:"Daily", isPinned:false});
        setInputEngaged(false);
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
              type="text"
              onChange={handleChange}
              name="goal" 
              placeholder="Title" 
              value={goal.goal}
            />

          <select name="category" placeholder="Category" list="goalCategory" id="goalCategory"
            className={"" + (inputEngaged ? "input-engaged" : null)}
            onChange={handleChange}
            rows="1" 
            value={goal.category}>
              <option value="King">King</option>
              <option value="Warrior">Warrior</option>
              <option value="Magician">Magician</option>
              <option value="Lover">Lover</option>
            </select> 

          <select name="type" placeholder="Type" list="goalType" id="goalType"
            className={"" + (inputEngaged ? "input-engaged" : null)}
            onChange={handleChange}
            rows="1" 
            value={goal.type}>
              <option value="Goal">Goal</option>
              <option value="Reminder">Reminder</option>
              <option value="Mindset">Mindset</option>
            </select> 

          {goal.type === "Goal" ? 
          <select 
            className={"" + (inputEngaged ? "input-engaged" : null)}
            name="scope"
            placeholder="Scope" 
            list="scopeCategory" 
            id="scopeCategory"  
            onChange={handleChange} 
            rows="1" 
            value={goal.scope}>
            <option value="Daily">Daily activity goal</option>
            <option value="Long-term">Long term goal</option>
          </select> : null
            }
          {/* <CustomButton clickAction={() => dispatch(addItemStart(goal, user))} buttonName={"Add"} /> */}
          </form>
          </div>
      </div>
    </div>
  );
}

export default CreateArea;
