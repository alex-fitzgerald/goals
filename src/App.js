import React, { useState, useEffect } from "react";
import Stoic from "./components/Stoic.jsx";
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react'
import Poem from "./components/Poem.jsx";
import Philosophy from "./components/Philosophy.jsx";
import DailyItems from "./components/DailyItems.jsx"
import KWMLGoal from "./components/KWMLGoal.jsx";
import CreateArea from "./components/CreateArea.jsx";
import Navigation from "./components/Navigation.jsx";
import LoginButton from "./components/LoginButton.jsx"
import LogoutButton from "./components/LogoutButton.jsx"
import Profile from "./components/Profile.jsx"

function App() {
  const [ dailyPhilosophy, setDailyPhilosophy ] = useState({quote: "Loading", author: ""});
  const [ dailyGoalsSet, setDailyGoalsSet ] = useState(false);
  const [ goalsFiltered, setGoalsFiltered ] = useState(false);
  const [ goalsLoaded, setGoalsLoaded ] = useState(false);
  const [ randomStoic, setDailyStoic ] = useState({quote: "Loading", author: ""});
  const [ dailyGoals, setDailyGoals ] = useState([]);
  const [ longTermGoals, setLongTermGoals ] = useState([]);
  const [ dailyPoem, setDailyPoem ] = useState({poemTitle: "Loading", poemAuthor: "", poemLines: [""]});
  const [ kwmlGoals, setKwmlGoals ] = useState([]);
  const [ reminders, setReminders ] = useState([]);
  const [ mindsets, setMindsets ] = useState([]);
  const [ allGoals, setAllGoals ] = useState([]);
  const { user, isAuthenticated } = useAuth0(); 

  const navigationList = ["Stoic", "Philosophy", "Poem", "Mindsets", "Reminders", "Daily", "LongTerm", "AllGoals", "Create", "Login"]
  const [navigationNumber, setNavigationNumber] = useState(0);
  const [navigation, setNavigation] = useState(navigationList[navigationNumber]);

  function handleButton(button){
    setNavigationNumber(button)
    setNavigation(navigationList[button])
  }

  function handleNavBarFunc(button){
    if (button === "right" && navigationNumber < navigationList.length - 1) {
      setNavigation(navigationList[navigationNumber + 1])
      setNavigationNumber(navigationNumber + 1)
    }
    if (button === "left" && navigationNumber > 0) {
      setNavigation(navigationList[navigationNumber - 1])
      setNavigationNumber(navigationNumber - 1)
    }
  }

  useEffect(() => {  
    if (isAuthenticated) {
      const url = 'newUser/' + user.email;
      fetch(url, {headers : {"Content-Type": "applications/json","Accept": "application/json"}})
      .then((res) => res.json())
      } else {
        // console.log("No user is logged in, cannot fetch lists.")
      }
    }, [isAuthenticated]);
  
  function addGoal(kwmlGoal){  
    setKwmlGoals(prevKwmlGoals => {
      return [...prevKwmlGoals, kwmlGoal]
    });
    postGoal(kwmlGoal);
  } 

  useEffect(() => {  
    if (isAuthenticated) {
      const url = 'goals/' + user.email;
      fetch(url, {headers : {"Content-Type": "applications/json","Accept": "application/json"}})
      .then((res) => res.json())
      .then(function(data){
        setKwmlGoals(JSON.parse(data.kwmlgoals))
        setAllGoals(JSON.parse(data.kwmlgoals))
        setGoalsLoaded(true)
        })
      } else {
        console.log("No user is logged in, cannot fetch lists.")
      }
    }, [isAuthenticated]);
  
  function addGoal(kwmlGoal){  
    setKwmlGoals(prevKwmlGoals => {
      return [...prevKwmlGoals, kwmlGoal]
    });
    postGoal(kwmlGoal);
  } 
  
  useEffect(() => {  
      const url = '/api'
      fetch(url, {headers : {"Content-Type": "applications/json","Accept": "application/json"}})
      .then((res) => res.json())
      .then(function(data){
        // console.log(data)
        setDailyPoem(JSON.parse(data.poem))
        setDailyStoic(JSON.parse(data.stoic))
        setDailyPhilosophy(JSON.parse(data.philosophy))
        })
    }, []);
  
  function addGoal(kwmlGoal){  
    setKwmlGoals(prevKwmlGoals => {
      return [...prevKwmlGoals, kwmlGoal]
    });
    postGoal(kwmlGoal);
  } 

  function deleteKwmlGoal(id, goalId, array, setArray) {
    let newKwmlGoals = kwmlGoals;
    console.log(id)
    newKwmlGoals.splice(id, 1);
    setKwmlGoals([...newKwmlGoals]);
    deleteGoal(goalId);
    // setGoalsLoaded(true)
  }

  function completeGoal(id, goal, category, type, scope, key, goalId, array, setArray) {
    unpinGoal({
      _id: goalId,
      goal:goal,
      category:category,
      type:type,
      scope:scope,
      isPinned: false
    })

    console.log(key);
    let prunedGoals = array;
    prunedGoals.splice(id, 1);
    setArray([...prunedGoals]);
  }
  
  function postGoal(latestGoal){
    const url = 'postGoals/' + user.email;
    axios
    .post(url, {
      goal: latestGoal.goal,
      category: latestGoal.category,
      type: latestGoal.type,
      scope: latestGoal.scope,
      name: user.email
    })
    .then(function () {
      console.log(latestGoal.goal + " a " + latestGoal.category + " " + latestGoal.type + " added to the database.");
    })
    .catch(function () {
				alert("Could not create goal. Please try again");
			});
    }
  
    function unpinGoal(goal){
      const url = "updateGoals/" + user.email
      console.log(goal)
      fetch(url , {
        headers: {'Content-Type': 'application/json' },
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
          goal: goal
        })
      })
      .then(response => response.json())
      // .then(data => this.setState({ postId: data.id }));
    }
  
    function updateGoal(kwmlGoal){
      const url = "updateGoals/" + user.email 
      const { isPinned } = kwmlGoal

      if (!isPinned){
        unpinGoal(kwmlGoal)
      }  
      console.log(kwmlGoal.key)
      console.log(kwmlGoal._id)
      console.log(kwmlGoal)
      //map out old list. Find array item matching number, send back updated version. 

      let updatedList = kwmlGoals.map(goal => {
        console.log(goal._id)
        console.log(kwmlGoal._id)
        if (goal._id === kwmlGoal._id) {
          return kwmlGoal; //gets everything that was already in item, and updates "done"
        } else {
          return goal
        }
      })

      setKwmlGoals(updatedList)

      setDailyGoalsSet(true)
      setGoalsLoaded(true)

      fetch(url , {
        headers: {'Content-Type': 'application/json' },
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
          goal: kwmlGoal
        })
      })
      .then(response => response.json())
      // .then(data => this.setState({ postId: data.id }));
    }

    function deleteGoal(goalId){
    const url = "deleteGoals/" + user.email
    console.log(goalId)
    fetch(url , {
      headers: {'Content-Type': 'application/json' },
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({
        goalId:goalId
      })
    })
    .then(response => response.json())
    // .then(data => this.setState({ postId: data.id }));
  }
  
  function findDailyGoals(){
    if (goalsLoaded === true) {

      function getRandomNumber(arrayLength){ return Math.floor(Math.random() * arrayLength); }
      function filterLists(list, archetype){ let filteredArray = list.filter(item => item.category === archetype); return filteredArray }
      
      function processDaily(filteredList, arrayList){ 
        if (filteredList.length > 0) { 
          arrayList.push(filteredList[ getRandomNumber(filteredList.length) ]); 
        } else {
          console.log(filteredList + " is empty")
        }
      }

      let filteredPinned = kwmlGoals.filter(goal => goal.isPinned === true);
      let filteredPinnedDaily = filteredPinned.filter(goal => goal.scope === "Daily");
      let filteredPinnedLongTerm = filteredPinned.filter(goal => goal.scope === "Long-term");
      let filteredMindsets = kwmlGoals.filter(goal => goal.type === "Mindset");
      let filteredReminders = kwmlGoals.filter(goal => goal.type === "Reminder");

      if (filteredMindsets.length === 0) {
        console.log("No daily mindsets")
      } else if (filteredMindsets.length < 4 && filteredMindsets.length > 0) {
        setMindsets(filteredMindsets)
      } else if (filteredMindsets.length > 4){
    
        let filteredKingMindsets = filterLists(filteredMindsets, "King"); 
        let filteredWarriorMindsets = filterLists(filteredMindsets, "Warrior");
        let filteredMagicianMindsets = filterLists(filteredMindsets, "Magician");
        let filteredLoverMindsets = filterLists(filteredMindsets, "Lover");
        let dailyMindsets = []

        processDaily(filteredKingMindsets, dailyMindsets); processDaily(filteredWarriorMindsets, dailyMindsets); processDaily(filteredMagicianMindsets, dailyMindsets); processDaily(filteredLoverMindsets, dailyMindsets);
        setMindsets(dailyMindsets);
      }

      if (filteredReminders.length === 0) {
        console.log("No daily reminders")
      } else if (filteredReminders.length < 4) {
        setReminders(filteredReminders)
      } else if (filteredReminders.length > 4){

        let filteredKingReminders = filterLists(filteredReminders, "King"); 
        let filteredWarriorReminders = filterLists(filteredReminders, "Warrior"); 
        let filteredMagicianReminders = filterLists(filteredReminders, "Magician"); 
        let filteredLoverReminders = filterLists(filteredReminders, "Lover"); 
        let dailyReminders = []

        processDaily(filteredKingReminders, dailyReminders); processDaily(filteredWarriorReminders, dailyReminders); processDaily(filteredMagicianReminders, dailyReminders); processDaily(filteredLoverReminders, dailyReminders); 
        setReminders(dailyReminders); 
      }

      if (filteredPinnedDaily.length === 0) {
        console.log("No pinned daily goals received")
      } else {
        setDailyGoals(filteredPinnedDaily)
      }

      if (filteredPinnedLongTerm.length === 0) {
        console.log("No pinned long term goals received")
      } else {
        setLongTermGoals(filteredPinnedLongTerm)
      }

      // console.log(filteredPinnedDaily)
      // console.log(filteredPinnedLongTerm)
      
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
  
  useEffect(() => {
    findDailyGoals()
    setDailyGoalsSet(true)
  })

    
    return (
    <div className="app">
      <Navigation 
        handleClick={handleButton}
        handleNavBar={handleNavBarFunc}
        currentPage={navigation}
      />
        <div className="flexparent">
          {/* { navigation === "Login" ? <Login onRegister={registerUser} /> : null} */}
          { navigation === "Stoic" ?       <Stoic       stoicInput = {randomStoic} /> : null }
          { navigation === "Philosophy" ?  <Philosophy  philosophyInput = {dailyPhilosophy} /> : null }
          { navigation === "Poem" ?        <Poem        poemInput = {dailyPoem} /> : null }
          {isAuthenticated && <div>
            { navigation === "Mindsets" ?    <DailyItems  dailyGoals={dailyGoalsSet} itemSet={mindsets} componentName="Mindsets" updateGoal={updateGoal} deleteKwmlGoal={completeGoal} filterGoals={filterGoals} /> : null }
            { navigation === "Reminders" ?   <DailyItems  dailyGoals={dailyGoalsSet} itemSet={reminders} componentName="Reminders" updateGoal={updateGoal} deleteKwmlGoal={completeGoal} filterGoals={filterGoals} /> : null }
            { navigation === "Daily" ?       <DailyItems  dailyGoals={dailyGoalsSet} itemSet={dailyGoals} componentName="Daily Goals" updateGoal={updateGoal} deleteKwmlGoal={completeGoal} filterGoals={filterGoals} array={dailyGoals} setArray={setDailyGoals}/> : null }             
            { navigation === "LongTerm" ?       <DailyItems  dailyGoals={dailyGoalsSet} itemSet={longTermGoals} componentName="Long Term" updateGoal={updateGoal} deleteKwmlGoal={deleteKwmlGoal} filterGoals={filterGoals} array={longTermGoals} setArray={setLongTermGoals}/> : null }             
          </div> }
        </div>

        { navigation === "Create" ? <CreateArea onAdd={addGoal} /> : null }
        {isAuthenticated && <div>
          { navigation === "AllGoals" ?
          <div className="component">
            <h1>All Goals</h1>
            <div className="componentContent">
              {kwmlGoals.map((kwmlGoal, index) => 
              ( 
                <KWMLGoal 
                  key={kwmlGoal._id}
                  id={index} 
                  goalId={kwmlGoal._id}
                  goal={kwmlGoal.goal}
                  category={kwmlGoal.category} 
                  scope={kwmlGoal.scope} 
                  type={kwmlGoal.type}
                  canBePinned={true}
                  isPinned={kwmlGoal.isPinned}
                  onPin={updateGoal}
                  onChange={updateGoal}
                  deleteClick={deleteKwmlGoal}
                  filterClick={filterGoals}
                  /> ))
                }
            </div>
          </div> : null }
          </div>}
      <div className="authParent">
        <Profile />
        {!isAuthenticated ? <LoginButton /> : <LogoutButton /> }
      </div>
    </div>
  );
}

export default App;