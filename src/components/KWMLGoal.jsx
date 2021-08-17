import React from "react";

function KWMLGoal(props) {
  
  return (
    <div className="kwmlGoal">
      <h1>{props.goal}</h1>
      <div className="footer">
        <div onClick={() => (props.filterClick(props.category))}>
          <p className={"category " + props.category}>
            {props.category}
          </p>
        </div>
        <div>
         <button 
          onClick={() => (props.deleteClick(props.id, props.goal, props.category))}
          >
         Delete
         </button>
        </div>
      </div>
    </div>
  );
}

export default KWMLGoal;
