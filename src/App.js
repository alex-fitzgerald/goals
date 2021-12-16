import React, { useEffect } from "react";
import Philosophy from "./Pages/Philosophy/Philosophy.component";
import Reminders from "./Pages/Reminders/Reminders.component";
import { fetchStoicismStart } from './redux/apis/apis.actions';
import { fetchItemsStart } from "./redux/items/items.actions";
import { useDispatch, useSelector } from 'react-redux';
import { CreateArea } from "./Pages/CreateArea/CreateArea.component";


function App() {
  const dispatch = useDispatch();
  const stoicism = useSelector(state => state.apis.stoicism);
  const items = useSelector(state => state.items.items);

  const user = "fitzgerald.s.alexander@gmail.com";

  const haveFetchedReminders = useSelector(state => state.items.haveFetchedReminders);
  
  useEffect(() => {
    dispatch(fetchStoicismStart());
    dispatch(fetchItemsStart(user));
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