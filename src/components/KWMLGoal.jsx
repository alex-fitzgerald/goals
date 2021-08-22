import React from "react";

function KWMLGoal(props) {
  const goal = props.goal
  const category = props.category
  const type = props.type
  const scope = props.scope

  return (
    <div className="kwmlGoal">
      <h1>{goal}</h1>
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
          <button 
            onClick={() => (props.deleteClick(props.id, goal, category, type, scope))}
            >
            Completed
          </button> : 
          null}
         </div>
    </div>
  );
}

export default KWMLGoal;
