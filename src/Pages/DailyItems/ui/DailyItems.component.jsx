import React, { useEffect } from 'react';
import Card from '../../components/Card/Card.component';

function DailyItems(props){
    const { renderedName, itemSet, updateGoal, deleteGoal, filterGoals, array, setArray } = props.componentName

    useEffect(() => {
        
    }, []);

    return(
         <div className="component">
            <h1>{renderedName}</h1>
            <div className="componentContent">
            {itemSet.map((item, index) => ( 
                <Card 
                    key={index}
                    id={index} 
                    goalId={item._id}
                    goal={item.goal}
                    category={item.category} 
                    scope={item.scope} 
                    type={item.type}
                    isPinned={item.isPinned}
                    onChange={updateGoal}
                    deleteClick={deleteGoal}
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