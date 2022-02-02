import React, { useEffect, useState } from "react";
import Philosophy from "./Pages/Philosophy/Philosophy.component";
import Reminders from "./Pages/Reminders/Reminders.component";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoalsStart } from "./Pages/DailyItems/state/actions";
import { CreateArea } from "./Pages/CreateArea/ui/CreateArea.component";

function App() {
  const dispatch = useDispatch();
  const state = useSelector(state => state)

  useEffect(() => {
    // dispatch(fetchGoalsStart());
  },[]);
  
    return (
    <div className="app">
      <CreateArea />
    </div>
  );
}

export default App; 