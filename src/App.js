import React, { useEffect, useState } from "react";
import Philosophy from "./Pages/Philosophy/Philosophy.component";
import Reminders from "./Pages/Reminders/Reminders.component";
import { useDispatch, useSelector } from 'react-redux';
import { CreateArea } from "./Pages/CreateArea/ui/CreateArea.component";


function App() {
  // const stoicism = useSelector(state => state.apis.stoicism);
  // const items = useSelector(state => state.items.items);

  // const haveFetchedReminders = useSelector(state => state.items.haveFetchedReminders);
  
    return (
    <div className="app">
      {/* <Philosophy content={stoicism} />   */}
      {/* { haveFetchedReminders ? <Reminders reminders={items} /> : null }   */}
      <CreateArea />
    </div>
  );
}

export default App; 