import React,{ useState, useEffect, setState } from "react";
import Stoic from "./components/Stoic.jsx";
import axios from "axios"
import Poem from "./components/Poem.jsx";
import KWMLGoal from "./components/KWMLGoal.jsx";
import CreateArea from "./components/CreateArea.jsx";


function App() {
  const [randomStoic, setRandomStoic] = useState({quote: "Loading", author: ""});
  const [dailyPoem, setDailyPoem] = useState({poemTitle: "Loading", poemAuthor: "", poemLines: [""]});
  const [kwmlGoals, setKwmlGoals] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [mindsets, setMindsets] = useState([]);
  const [goalsFiltered, setGoalsFiltered] = useState(false);
  const [dailyGoals, setDailyGoals] = useState([{
    goal: "Loading", category: "", scope: [""]}, {
    goal: "Loading", category: "", scope: [""]}, {
    goal: "Loading", category: "", scope: [""]}, {
    goal: "Loading", category: "", scope: [""]}])
  const [allGoals, setAllGoals] = useState([]);
  const [goalsLoaded, setGoalsLoaded] = useState(false);
  const [dailyGoalsSet, setDailyGoalsSet] = useState(false)

  console.log(kwmlGoals)

  function addGoal(kwmlGoal){  
    setKwmlGoals(prevKwmlGoals => {
      return [...prevKwmlGoals, kwmlGoal]
    });
    postGoal(kwmlGoal);
  }
  
  function deleteKwmlGoal(id, goal, category, type, scope) {
    setKwmlGoals(prevKwmlGoals => {
      return prevKwmlGoals.filter((kwmlGoals, index) => {
        return index !== id;
      });
    });
    deleteGoal(goal, category, type, scope);
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

    let filteredGoals = kwmlGoals.filter(goal => goal.scope === "Daily");
    let filteredKingGoals = filteredGoals.filter(goal => goal.category === "King");
    let filteredWarriorGoals = filteredGoals.filter(goal => goal.category === "Warrior");
    let filteredMagicianGoals = filteredGoals.filter(goal => goal.category === "Magician");
    let filteredLoverGoals = filteredGoals.filter(goal => goal.category === "Lover");
    
    let kingDaily = filteredKingGoals[ getRandomNumber(filteredKingGoals.length) ];
    let warriorDaily = filteredWarriorGoals[ getRandomNumber(filteredWarriorGoals.length) ];
    let magicianDaily = filteredMagicianGoals[ getRandomNumber(filteredMagicianGoals.length) ];
    let loverDaily = filteredLoverGoals[ getRandomNumber(filteredLoverGoals.length) ];

    setDailyGoals([kingDaily, warriorDaily, magicianDaily, loverDaily]);
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
  
  useEffect(() => {
    fetch("api", {headers : {"Content-Type": "applications/json","Accept": "application/json"}})
    .then((res) => res.json())
    .then(function(data){
      setDailyPoem(JSON.parse(data.poem))
      setRandomStoic(JSON.parse(data.stoic))
      })}, []);

  useEffect(() => {
    fetch("goals", {headers : {"Content-Type": "applications/json","Accept": "application/json"}})
    .then((res) => res.json())
    .then(function(data){
      console.log(data)
      setKwmlGoals(JSON.parse(data.kwmlgoals))
      setGoalsLoaded(true)
      })}, []);

  useEffect(() => {
    fetch("reminders", { headers : { "Content-Type": "applications/json","Accept": "application/json"}})
    .then((res) => res.json())
    .then(function(data){
      setReminders(JSON.parse(data.reminders))
      })}, []);

    useEffect(() => {
      fetch("mindsets", {headers : {"Content-Type": "applications/json","Accept": "application/json"}})
      .then((res) => res.json())
      .then(function(data){
        setMindsets(JSON.parse(data.mindsets))
        })}, []);

    useEffect(() => {
      if (dailyGoals[0].goal === "Loading"){
      findDailyGoals()
      setDailyGoalsSet(true)
      }
    })
    
    return (
    <div className="app">
      <Stoic stoicInput = {randomStoic} />
      <Poem poemInput = {dailyPoem} />

      <div className="component">
        <h1>Today's Mindsets</h1>
        <div className="componentContent">
          {mindsets.map((mindset, index) => ( 
              <KWMLGoal 
                key={index}
                id={index} 
                goal={mindset.mindset}
                category={mindset.category} 
                type={null}
                scope={null} 
                deleteClick={deleteKwmlGoal}
                filterClick={filterGoals}
                /> )) 
            } 
          </div>
        <button className="dailyGoalsButton" onClick={findDailyGoals}>New mindset</button>
      </div>

      <div className="component">
        <h1>Remember</h1>
        <div className="componentContent">
          {reminders.map((reminder, index) => ( 
              <KWMLGoal 
                key={index}
                id={index} 
                goal={reminder.reminder}
                category={reminder.category} 
                type={null}
                scope={reminder.scope} 
                deleteClick={deleteKwmlGoal}
                filterClick={filterGoals}
                /> )) 
            } 
          </div>
        <button className="dailyGoalsButton" onClick={findDailyGoals}>New reminders</button>
      </div>

      <div className="component">
        <h1>Daily Goals</h1>
        <div className="componentContent">
          {dailyGoals.map((dailyGoal, index) => ( 
              <KWMLGoal 
                key={index}
                id={index} 
                goal={dailyGoal.goal}
                category={dailyGoal.category} 
                type={null}
                scope={null} 
                deleteClick={deleteKwmlGoal}
                filterClick={filterGoals}
                /> )) 
            } 
          </div>
        <button className="dailyGoalsButton" onClick={findDailyGoals}>New daily goals</button>
      </div>

      <CreateArea onAdd={addGoal} />

      <div className="component">
        <h1>All Goals</h1>
        <div className="componentContent">
          {kwmlGoals.map((kwmlGoal, index) => ( 
            <KWMLGoal 
              key={index}
              id={index} 
              goal={kwmlGoal.goal}
              category={kwmlGoal.category} 
              scope={kwmlGoal.scope} 
              type={kwmlGoal.type}
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