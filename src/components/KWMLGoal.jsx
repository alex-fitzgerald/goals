import React from "react";

function KWMLGoal(props) {
  
  return (
    <div className="kwmlGoal">
      <h1>{props.goal}</h1>
      <div className="footer">
        <div className="kwmlGoalDiv" onClick={() => (props.filterClick(props.category))}>
          <p className={"category " + props.category}>
            {props.category}
          </p>
        </div>
        {/* </div> */}
        {/* <div> */}
          <p className={"scope " + props.scope}>
            {props.scope}
          </p>
        {/* </div>
        <div> */}
         <button 
          onClick={() => (props.deleteClick(props.id, props.goal, props.category, props.scope))}
          >
          Completed
         </button>
         </div>
    </div>
  );
}

export default KWMLGoal;
