import React, { useState, useEffect } from "react";

function KWMLGoal(props) {
  const goalId = props.goalId
  const goal = props.goal
  const category = props.category
  const type = props.type
  const scope = props.scope
  const isPinned = props.isPinned
  const canBePinned = props.canBePinned

  const [currentGoal, setCurrentGoal] = useState({
    goalId: goalId,
    goal: goal,
    category: category,
    type: type,
    scope: scope, 
    isPinned: isPinned
    });

  const [renderPin, setRenderPin] = useState("no pin")
  const [goalType, setGoalType] = useState("Goal") 
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

  function definePinAction(){
    if (type === "Goal" && canBePinned === true) {
        setRenderPin("RenderPin")
    } 
  }

  useEffect(() => {
    setType()
    definePinAction()
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

  function handlePin(event){
    console.log(event.target.checked)

    setCurrentGoal({goalId: goalId, goal:currentGoal.goal, category:category, type:type, scope:scope, isPinned:event.target.checked})
    var pinnedGoal = {goalId: goalId, goal:currentGoal.goal, category:category, type:type, scope:scope, isPinned:event.target.checked}
    console.log(currentGoal)
    props.onChange(pinnedGoal)
  }

  return (
    <div className="kwmlGoal">
    {renderPin === "RenderPin" ? <div className="checkboxDiv"><input type="checkbox" onChange={handlePin} checked={isPinned}/><label>Pin</label></div> : null}
      <form onSubmit={formSubmit}>
            <textarea 
              onChange={handleChange}
              name="goal" 
              placeholder="Goal"
              rows="2" 
              value={currentGoal.goal}>
            </textarea>
        </form>

      <div className="footer">

        { !goalHasBeenChanged ? 

        <div>   
          <div className="kwmlGoalDiv" onClick={() => (props.filterClick(category))}>
            <p className={"category " + category}>
              {category}
            </p>
          </div>
          {goalType === "Goal" ? <p className={"scope"}>{scope + " goal"}</p> : <p className={"scope"}>{type}</p> }

          <form onSubmit={formSubmit}>
            <button name="delete"
              onClick={() => (props.deleteClick(props.id, goal, category, type, scope, props.key, props.goalId, props.array, props.setArray))}>
              {goalType === "Goal" ? "Completed" : "Delete"}
            </button>
          </form> 
         </div>
        :
        <div className="alterFooter">
          <button onClick={() => { props.onChange(currentGoal); setGoalHasBeenChanged(false); }}>
            Update
          </button> 
          <button onClick={revertGoal}>
            Cancel
          </button>
        </div> 
        }

       </div>
    </div>
  
  );
}

export default KWMLGoal;
