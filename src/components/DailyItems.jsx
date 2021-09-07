import React from 'react';
import KWMLGoal from './KWMLGoal.jsx';

function DailyItems(props){
    // const dailyGoalsSet = props.dailyGoalsSet
    const renderedName = props.componentName
    const itemSet = props.itemSet
    const updateGoal = props.updateGoal
    const deleteKwmlGoal = props.deleteKwmlGoal
    const filterGoals = props.filterGoals
    const array = props.array
    const setArray = props.setArray

    return(
         <div className="component">
            <h1>{renderedName}</h1>
            <div className="componentContent">
            {itemSet.map((item, index) => ( 
                <KWMLGoal 
                    key={index}
                    id={index} 
                    goalId={item._id}
                    goal={item.goal}
                    category={item.category} 
                    scope={item.scope} 
                    type={item.type}
                    onChange={updateGoal}
                    deleteClick={deleteKwmlGoal}
                    filterClick={filterGoals}
                    array={array}
                    setArray={setArray}
                    /> ))
                } 
            </div>
        </div>
    )
}
export default DailyItems