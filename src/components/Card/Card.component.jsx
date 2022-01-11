import React, { useEffect, useState } from "react";
import { CardContainer } from "./Card.styles";
import { TextArea } from "../TextArea/TextArea.component";
import { EditFooterOptions } from "../EditFooterOptions/EditFooterOptions.component";
import { CardFooter } from "../CardFooter/CardFooter.component";
import { useDispatch } from "react-redux";

const Card = ( { content: { id, goal, category, scope, isPinned }} ) => {
  const [ cardState, setCardState ] = useState({});
  const [ hasChanged, setHasChanged ] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setCardState({
      id: id,
      goal: goal,
      category: category,
      scope: scope,
      isPinned: isPinned
    })
  }, []);


  const updateGoalText = (goalInput) => {
    setCardState((prevGoal) => {
      return {
        ...prevGoal,
        goal: goalInput
      }
    })
  }

  const revertGoal = (event) => {
    event.preventDefault();
    setCardState((prevGoal) => {
      return {
        ...prevGoal,
        goal: goal
      }
    })
    setHasChanged(false);
  }

  function deleteGoal(event){
    event.preventDefault();
  }

  function formSubmit(event){
    if (cardState.goal === "") {
      event.preventDefault();
    } else {
      event.preventDefault();
    }
  }

  function toggle(value){
    var pinnedGoal = {
    }
  }
  

  return (
    <CardContainer className={cardState.category}>
      {/* {() => renderPin ? <Checkbox state={cardState.isPinned} onChange={toggle} /> : null } */}
      <form onSubmit={formSubmit}>
        <TextArea 
          name={goal} 
          cardGoal={cardState.goal}
          goalHasChanged={setHasChanged}
          handleGoalChange={updateGoalText}
          >
        </TextArea>
      { !hasChanged ? 
        <CardFooter category={cardState.category} scope={cardState.scope} clickAction={() => dispatch(id)}/> : 
        <EditFooterOptions status={hasChanged} updateGoal={formSubmit} revertGoal={revertGoal} />
      }
      </form> 
    </CardContainer>
  );
}

export default Card
