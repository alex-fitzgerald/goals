import React from "react";

function KWMLGoal(props) {
  
  return (
    <div className="kwmlGoal">
      <h1>{props.goal}</h1>
      <p className={props.category}>{props.category}</p>
      <br />
      <button onClick={() => (props.deleteClick(props.id, props.goal, props.category))}>Delete</button>
    </div>
  );
}

export default KWMLGoal;
