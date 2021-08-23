import React, { useState} from "react";

function KWMLGoal(props) {
  const goal = props.goal
  const category = props.category
  const type = props.type
  const scope = props.scope
  const goalId = props.goalId

  const [kwmlGoal, setKwmlGoal] = useState({
    goalId: goalId,
    goal: goal,
    category: category,
    type: type,
    scope: scope
    });

  const [goalHasBeenChanged, setGoalHasBeenChanged] = useState(false)

  function handleChange(event){
    const { name, value } = event.target;

    setGoalHasBeenChanged(true)
    
    setKwmlGoal(prevNote => {
        return {
          ...prevNote,
          [name]: value
        }
      });
    }

    function revertGoal(){
      setKwmlGoal({goal:goal, category:category, type:type, scope:scope})
    }

    function formSubmit(event){
      console.log(event)
      if (kwmlGoal.goal === "") {
        alert("Please enter a goal")
        event.preventDefault();
      } else {
        setKwmlGoal({goalId: goalId, goal:kwmlGoal.goal, category:category, type:type, scope:scope})
        setGoalHasBeenChanged(false)
        event.preventDefault();
      }
    }

  return (
    <div className="kwmlGoal">
      <form onSubmit={formSubmit}>
            <input 
              onChange={handleChange}
              name="goal" 
              placeholder="Goal" 
              value={kwmlGoal.goal}
            />
          {goalHasBeenChanged ? 
          <div>
            <button onClick={() => (props.onChange(kwmlGoal))}>Update</button> 
            <button onClick={revertGoal}>Cancel</button>
            </div> : 
            null }
        </form>
      <div className="footer">

        <div className="kwmlGoalDiv" onClick={() => (props.filterClick(category))}>
          <p className={"category " + category}>
            {category}
          </p>
        </div>

          <p className={"scope"}>
            {scope}
          </p>
          <p className={"scope"}>
            {type}
          </p>
          

         {type === "Goal" ? 
         <form onSubmit={formSubmit}>
            <button name="delete"
              onClick={() => (props.deleteClick(props.id, goal, category, type, scope))}
              >
              Completed
            </button>
          </form> : 
          null}
         </div>
    </div>
  );
}

export default KWMLGoal;
