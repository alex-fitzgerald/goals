import React, { useState, useEffect } from "react";

function KWMLGoal(props) {
  const goalId = props.goalId
  const goal = props.goal
  const category = props.category
  const type = props.type
  const scope = props.scope

  const [currentGoal, setCurrentGoal] = useState({
    goalId: goalId,
    goal: goal,
    category: category,
    type: type,
    scope: scope
    });

  const [goalType, setGoalType] = useState("Daily") 

  const [goalHasBeenChanged, setGoalHasBeenChanged] = useState(false)

  function setType(){
    if (type === "Goal"){
      setGoalType("Goal")
    } else if (type === "Reminder"){
      setGoalType("Reminder")
    } else if (type === "Mindset"){
      setGoalType("Mindset")
    }
  }

  useEffect(() => {
    setType()
  })

  function handleChange(event){
    const { name, value } = event.target;

    setGoalHasBeenChanged(true)
    setCurrentGoal(prevNote => {
        return {
          ...prevNote,
          [name]: value
        }
      });
    }

  function revertGoal(event){
    setCurrentGoal({goal:goal, category:category, type:type, scope:scope})
    event.preventDefault();
    setGoalHasBeenChanged(false)
  }

  function formSubmit(event){
    console.log(event)
    if (currentGoal.goal === "") {
      alert("Please enter a goal")
      event.preventDefault();
    } else {
      setCurrentGoal({goalId: goalId, goal:currentGoal.goal, category:category, type:type, scope:scope})
      setGoalHasBeenChanged(false)
      event.preventDefault();
    }
  }


  return (
    <div className="kwmlGoal">
      <form onSubmit={formSubmit}>
            <textarea 
              onChange={handleChange}
              name="goal" 
              placeholder="Goal" 
              value={currentGoal.goal}>
            </textarea>
          {goalHasBeenChanged ? 
          <div>
            <button onClick={() => (props.onChange(currentGoal))}>
              Update
            </button> 
            <button onClick={revertGoal}>
             Cancel
            </button>
          </div> : 
          null }
        </form>

      <div className="footer">

        <div className="kwmlGoalDiv" onClick={() => (props.filterClick(category))}>
          <p className={"category " + category}>
            {category}
          </p>
        </div>

        {goalType === "Goal" ? 
        <p className={"scope"}>{scope + " goal"}</p> : 
        <p className={"scope"}>{type}</p>
        }

        <form onSubmit={formSubmit}>
          <button name="delete"
            onClick={() => (props.deleteClick(props.id, goal, category, type, scope))}>
            {goalType === "Goal" ? "Completed" : "Delete"}
          </button>
         </form> 
       </div>
    </div>
  
  );
}

export default KWMLGoal;
