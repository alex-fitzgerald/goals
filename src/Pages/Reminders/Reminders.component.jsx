import React from "react";
import Card from '../../components/Card/Card.component'


const Reminders = ({reminders}) => {
    return (
    <div>
        {Object.values(reminders).map(reminder => {
            return <Card key={reminder.id} content={reminder} />
        })}
    </div>
    )
}

export default Reminders
