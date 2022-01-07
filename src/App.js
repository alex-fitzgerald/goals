import React, { useEffect, useState } from "react";
import Philosophy from "./Pages/Philosophy/Philosophy.component";
import Reminders from "./Pages/Reminders/Reminders.component";
import { fetchStoicismStart } from './redux/apis/apis.actions';
import { fetchItemsStart } from "./redux/items/items.actions";
import { useDispatch, useSelector } from 'react-redux';
import { CreateArea } from "./Pages/CreateArea/CreateArea.component";


function App() {
  const stoicism = useSelector(state => state.apis.stoicism);
  const items = useSelector(state => state.items.items);
  const dispatch = useDispatch();

  const [ username, setUsername ] = useState();
  
  const haveFetchedReminders = useSelector(state => state.items.haveFetchedReminders);
  
  useEffect(() => {
    dispatch(fetchStoicismStart());
  } , []);
  
    return (
    <div className="app">
      <Philosophy content={stoicism} />  
      { haveFetchedReminders ? <Reminders reminders={items} /> : null }  
      <CreateArea />
    </div>
  );
}

export default App; 