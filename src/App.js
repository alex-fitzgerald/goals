import React,{ useState, useEffect, setState } from "react";
import Stoic from "./components/Stoic.jsx";
import axios from "axios"
import Poem from "./components/Poem.jsx";
import Philosophy from "./components/Philosophy.jsx";
import KWMLGoal from "./components/KWMLGoal.jsx";
import CreateArea from "./components/CreateArea.jsx";

function App() {
  const [randomStoic, setRandomStoic] = useState({quote: "Loading", author: ""});
  const [dailyPhilosophy, setDailyPhilosophy] = useState({quote: "Loading", author: ""});
  const [dailyPoem, setDailyPoem] = useState({poemTitle: "Loading", poemAuthor: "", poemLines: [""]});
  const [kwmlGoals, setKwmlGoals] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [mindsets, setMindsets] = useState([]);
  const [goalsFiltered, setGoalsFiltered] = useState(false);
  const [dailyGoals, setDailyGoals] = useState([]);
  const [allGoals, setAllGoals] = useState([]);
  const [goalsLoaded, setGoalsLoaded] = useState(false);
  const [dailyGoalsSet, setDailyGoalsSet] = useState(false)
  
  useEffect(() => {
    fetch("api", {headers : {"Content-Type": "applications/json","Accept": "application/json"}})
    .then((res) => res.json())
    .then(function(data){
      setDailyPoem(JSON.parse(data.poem))
      setRandomStoic(JSON.parse(data.stoic))
      setDailyPhilosophy(JSON.parse(data.philosophy))
      console.log(data.philosophy)
      })}, []);
  
  useEffect(() => {
    fetch("goals", {headers : {"Content-Type": "applications/json","Accept": "application/json"}})
    .then((res) => res.json())
    .then(function(data){
      console.log(data)
      setKwmlGoals(JSON.parse(data.kwmlgoals))
      setAllGoals(JSON.parse(data.kwmlgoals))
      setGoalsLoaded(true)
      findDailyGoals()
      })}, []);
  
  function addGoal(kwmlGoal){  
    setKwmlGoals(prevKwmlGoals => {
      return [...prevKwmlGoals, kwmlGoal]
    });
    postGoal(kwmlGoal);
    setGoalsLoaded(true)
  }
  
  function deleteKwmlGoal(id, goal, category, type, scope) {
    setKwmlGoals(prevKwmlGoals => {
      return prevKwmlGoals.filter((kwmlGoals, index) => {
        return index !== id;
      });
    });
    deleteGoal(goal, category, type, scope);
    setGoalsLoaded(true)
  }
  
  function postGoal(latestGoal){
    axios
    .post("/postGoals", {
      goal: latestGoal.goal,
      category: latestGoal.category,
      type: latestGoal.type,
      scope: latestGoal.scope
    })
    .then(function () {
      console.log(latestGoal + "added to goals.");
    })
    .catch(function () {
				alert("Could not create goal. Please try again");
			});
    }
  
    function updateGoal(kwmlGoal){
    const url = "updateGoals"
    console.log("goal sent from app for update")
    setDailyGoalsSet(true)
    setGoalsLoaded(true)
    console.log(kwmlGoal)
    fetch(url , {
      headers: {'Content-Type': 'application/json' },
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({
        goal: kwmlGoal,
      })
    })
    .then(response => response.json())
    .then(data => this.setState({ postId: data.id }));
  }

    function deleteGoal(goal, category, type, scope){
    const url = "deleteGoals"
    console.log(goal, category, type, scope)
    fetch(url , {
      headers: {'Content-Type': 'application/json' },
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({
        goal: goal,
        category: category,
        type: type,
        scope: scope
      })
    })
    .then(response => response.json())
    .then(data => this.setState({ postId: data.id }));
  }
  
  function findDailyGoals(){
    if (goalsLoaded === true) {

      function getRandomNumber(arrayLength){
        return Math.floor(Math.random() * arrayLength);
      }
      
      function filterLists(list, archetype){
        let filteredArray = list.filter(item => item.category === archetype);
        return filteredArray
      }
      
      function processDaily(filteredList, arrayList){
        if (filteredList.length > 0) {
          arrayList.push(filteredList[ getRandomNumber(filteredList.length) ])
          console.log(arrayList)
        } else {
          console.log(filteredList + " is empty")
        }
      }

      let filteredGoals = kwmlGoals.filter(goal => goal.type === "Goal");
      let filteredDailyGoals = filteredGoals.filter(goal => goal.scope === "Daily");
      let filteredMindsets = kwmlGoals.filter(goal => goal.type === "Mindset");
      let filteredReminders = kwmlGoals.filter(goal => goal.type === "Reminder");
      
      if (filteredDailyGoals.length === 0) {
        console.log("No daily goals")
      } else if (filteredDailyGoals.length < 4) {
        setDailyGoals(filteredDailyGoals)
      } else if (filteredDailyGoals.length > 4) {
        
        let filteredKingGoals = filterLists(filteredDailyGoals, "King")
        let filteredWarriorGoals = filterLists(filteredDailyGoals, "Warrior")
        let filteredMagicianGoals = filterLists(filteredDailyGoals, "Magician")
        let filteredLoverGoals = filterLists(filteredDailyGoals, "Lover")

        let dailyGoals = []

        processDaily(filteredKingGoals, dailyGoals)
        processDaily(filteredWarriorGoals, dailyGoals)
        processDaily(filteredMagicianGoals, dailyGoals)
        processDaily(filteredLoverGoals, dailyGoals)

        setDailyGoals(dailyGoals);
        console.log(dailyGoals)
        console.log("Those were the daily goals")
      }
      
      console.log(filteredMindsets.length)

      if (filteredMindsets.length === 0) {
        console.log("No daily mindsets")
        
      } else if (filteredMindsets.length < 4 && filteredMindsets.length > 0) {
        setMindsets(filteredMindsets)

      } else if (filteredMindsets.length > 4){
        
        let filteredKingMindsets = filterLists(filteredMindsets, "King")
        let filteredWarriorMindsets = filterLists(filteredMindsets, "Warrior")
        let filteredMagicianMindsets = filterLists(filteredMindsets, "Magician")
        let filteredLoverMindsets = filterLists(filteredMindsets, "Lover")
        
        let dailyMindsets = []

        processDaily(filteredKingMindsets, dailyMindsets)
        processDaily(filteredWarriorMindsets, dailyMindsets)
        processDaily(filteredMagicianMindsets, dailyMindsets)
        processDaily(filteredLoverMindsets, dailyMindsets)

        setMindsets(dailyMindsets);
      }

      console.log(filteredReminders)
      console.log("Those were the filtered reminders")

      if (filteredReminders.length === 0) {
        console.log("No daily reminders")
      } else if (filteredReminders.length < 4) {
        setReminders(filteredReminders)
      } else if (filteredReminders.length > 4){

        let filteredKingReminders = filterLists(filteredReminders, "King")
        let filteredMagicianReminders = filterLists(filteredReminders, "Magician")
        let filteredLoverReminders = filterLists(filteredReminders, "Lover")
        let filteredWarriorReminders = filterLists(filteredReminders, "Warrior")

        let dailyReminders = []

        processDaily(filteredKingReminders, dailyReminders)
        processDaily(filteredWarriorReminders, dailyReminders)
        processDaily(filteredMagicianReminders, dailyReminders)
        processDaily(filteredLoverReminders, dailyReminders)

        setReminders(dailyReminders); 
      }
      
      if (dailyGoals.length !== 0) {
        setDailyGoalsSet(true)
      } 
      setGoalsLoaded(false)
      } 
  }
  
  function filterGoals(selectedCategory) {
    if (!goalsFiltered) {
      let filteredGoals = kwmlGoals.filter(goal => goal.category === selectedCategory);
    setKwmlGoals(filteredGoals);
    setGoalsFiltered(true);
  } else {
    setKwmlGoals(allGoals);
    setGoalsFiltered(false);
  }}

  function updateGoalsLoaded(){
    setGoalsLoaded(true)
  }
  
  useEffect(() => {
    findDailyGoals()
    setDailyGoalsSet(true)
  })
    
    return (
    <div className="app">
      <div className="flexparent">
        <Stoic stoicInput = {randomStoic} />
        <Philosophy philosophyInput = {dailyPhilosophy} />
        <Poem poemInput = {dailyPoem} />

        <div className="component">
          <h1>Mindsets</h1>
          <div className="componentContent">
            {dailyGoalsSet ? mindsets.map((mindset, index) => ( 
                <KWMLGoal 
                  key={index}
                  id={index} 
                  goalId={mindset._id}
                  goal={mindset.goal}
                  category={mindset.category} 
                  scope={mindset.scope} 
                  type={mindset.type}
                  onChange={updateGoal}
                  deleteClick={deleteKwmlGoal}
                  filterClick={filterGoals}
                  /> )) : null
              } 
            </div>
          <button className="dailyGoalsButton" onClick={findDailyGoals}>New mindset</button>
        </div>

        <div className="component">
          <h1>Remember</h1>
          <div className="componentContent">
            {dailyGoalsSet ? reminders.map((reminder, index) => ( 
                <KWMLGoal 
                key={index}
                id={index} 
                goalId={reminder._id}
                goal={reminder.goal}
                category={reminder.category} 
                scope={reminder.scope} 
                type={reminder.type}
                onChange={updateGoal}
                deleteClick={deleteKwmlGoal}
                filterClick={filterGoals}
                  /> )) : null
              } 
            </div>
          <button className="dailyGoalsButton" onClick={findDailyGoals}>New reminders</button>
        </div>

        <div className="component">
          <h1>Daily Goals</h1>
          <div className="componentContent">
            {dailyGoalsSet ? dailyGoals.map((dailyGoal, index) => ( 
                <KWMLGoal 
                  key={index}
                  id={index} 
                  goalId={dailyGoal._id}
                  goal={dailyGoal.goal}
                  category={dailyGoal.category} 
                  scope={dailyGoal.scope} 
                  type={dailyGoal.type}
                  onChange={updateGoal}
                  deleteClick={deleteKwmlGoal}
                  filterClick={filterGoals}
                  /> )) : null
              } 
            </div>
          <button className="dailyGoalsButton" onClick={findDailyGoals}>New daily goals</button>
        </div>
      </div>

      <CreateArea onAdd={addGoal} />

      <div className="component">
        <h1>All Goals</h1>
        <div className="componentContent">
          {kwmlGoals.map((kwmlGoal, index) => 
          ( 
            <KWMLGoal 
              key={index}
              id={index} 
              goalId={kwmlGoal._id}
              goal={kwmlGoal.goal}
              category={kwmlGoal.category} 
              scope={kwmlGoal.scope} 
              type={kwmlGoal.type}
              onChange={updateGoal}
              deleteClick={deleteKwmlGoal}
              filterClick={filterGoals}
              /> ))
            }
        </div>
      </div>
    </div>
  );
}

export default App;