import React from "react";

function KWMLGoal(props) {
  
  return (
    <div className="kwmlGoal daily">
      <h1>{props.goal}</h1>
      <p>{props.category}</p>
      <br />
      <button onClick={() => (props.deleteClick(props.id, props.goal, props.category))}>Delete</button>
    </div>
  );
}

export default KWMLGoal;
