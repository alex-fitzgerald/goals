import React, { useEffect, useState } from "react";
import Philosophy from "./Pages/Philosophy/Philosophy.component";
import Reminders from "./Pages/Reminders/Reminders.component";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoalsStart } from "./Pages/DailyItems/state/actions";
import { CreateArea } from "./Pages/CreateArea/ui/CreateArea.component";

function App() {
  const dispatch = useDispatch();
  // const stoicism = useSelector(state => state.apis.stoicism);
  // const items = useSelector(state => state.items.items);

  // const haveFetchedReminders = useSelector(state => state.items.haveFetchedReminders);
  
    return (
    <div className="app">
      {/* <Philosophy content={stoicism} />   */}
      {/* { haveFetchedReminders ? <Reminders reminders={items} /> : null }   */}
      <CreateArea />
      <button onClick={() => dispatch(fetchGoalsStart())}>Click me to load goals</button>
    </div>
  );
}

export default App; 