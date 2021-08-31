import React,{ useState, useEffect } from "react";
import Stoic from "./components/Stoic.jsx";
import axios from "axios"
import Poem from "./components/Poem.jsx";
import Philosophy from "./components/Philosophy.jsx";
import KWMLGoal from "./components/KWMLGoal.jsx";
import CreateArea from "./components/CreateArea.jsx";
import Navigation from "./components/Navigation.jsx";

function App() {
  const [dailyPhilosophy, setDailyPhilosophy] = useState({quote: "Loading", author: ""});
  const [dailyGoalsSet, setDailyGoalsSet] = useState(false);
  const [goalsFiltered, setGoalsFiltered] = useState(false);
  const [goalsLoaded, setGoalsLoaded] = useState(false);
  const [randomStoic, setRandomStoic] = useState({quote: "Loading", author: ""});
  const [dailyGoals, setDailyGoals] = useState([]);
  const [longTermGoals, setLongTermGoals] = useState([]);
  const [dailyPoem, setDailyPoem] = useState({poemTitle: "Loading", poemAuthor: "", poemLines: [""]});
  const [kwmlGoals, setKwmlGoals] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [mindsets, setMindsets] = useState([]);
  const [allGoals, setAllGoals] = useState([]);

  const navigationList = ["Stoic", "Philosophy", "Poem", "Mindsets", "Reminders", "Daily", "LongTerm", "AllGoals", "Create"]
  const [navigationNumber, setNavigationNumber] = useState(0);
  const [navigation, setNavigation] = useState(navigationList[navigationNumber]);

  // function updateNavigation(navListPosition){
  //   setNavigation(navigationList[navListPosition])
  //   console.log(navigation)
  // }
  
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
    fetch("api", {headers : {"Content-Type": "applications/json","Accept": "application/json"}})
    .then((res) => res.json())
    .then(function(data){
      setDailyPoem(JSON.parse(data.poem))
      setRandomStoic(JSON.parse(data.stoic))
      setDailyPhilosophy(JSON.parse(data.philosophy))
      })}, []);
  
  useEffect(() => {
    fetch("goals", {headers : {"Content-Type": "applications/json","Accept": "application/json"}})
    .then((res) => res.json())
    .then(function(data){
      setKwmlGoals(JSON.parse(data.kwmlgoals))
      setAllGoals(JSON.parse(data.kwmlgoals))
      // setDailyGoals(JSON.parse(data.dailyGoals))
      // setLongTermGoals(JSON.parse(data.longTermGoals))
      setGoalsLoaded(true)
      // findDailyGoals()
      })}, []);
  
  function addGoal(kwmlGoal){  
    setKwmlGoals(prevKwmlGoals => {
      return [...prevKwmlGoals, kwmlGoal]
    });
    postGoal(kwmlGoal);
    // setGoalsLoaded(true)
  }

  function deleteKwmlGoal(id, goal, category, type, scope, key) {
    console.log(key)
    let newKwmlGoals = kwmlGoals;
    newKwmlGoals.splice(id, 1);
    setKwmlGoals([...newKwmlGoals]);
    deleteGoal(goal, category, type, scope);
    // setGoalsLoaded(true)
  }

  function completeGoal(id, goal, category, type, scope, key, goalId, array, setArray) {
    unpinGoal({
      goalId: goalId,
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
  
    function unpinGoal(goal){
      const url = "updateGoals" 
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
      .then(data => this.setState({ postId: data.id }));
    }
  
    function updateGoal(kwmlGoal){
      const url = "updateGoals"
      const { isPinned } = kwmlGoal
      console.log(isPinned + " is the inPinned status passed to App.js")
      if (!isPinned){
        unpinGoal(kwmlGoal)
      }  

      setKwmlGoals(prevKwmlGoals => {
        return [...prevKwmlGoals, kwmlGoal]
      });
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

      console.log(filteredPinnedDaily)
      console.log(filteredPinnedLongTerm)
      
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
        { navigation === "Stoic" ? <Stoic stoicInput = {randomStoic} /> : null }
        { navigation === "Philosophy" ? <Philosophy philosophyInput = {dailyPhilosophy} /> : null }
        { navigation === "Poem" ? <Poem poemInput = {dailyPoem} /> : null }
        { navigation === "Mindsets" ?       
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
          </div> : null 
        }
        { navigation === "Reminders" ?
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
          </div>: null 
        }
        { navigation === "Daily" ?
          <div className="component">
            <h1>Daily Goals</h1>
            <div className="componentContent">
              {dailyGoalsSet ? dailyGoals.map((dailyGoal, index) => ( 
                  <KWMLGoal 
                    key={dailyGoal.category}
                    id={index} 
                    goalId={dailyGoal._id}
                    goal={dailyGoal.goal}
                    category={dailyGoal.category} 
                    scope={dailyGoal.scope} 
                    type={dailyGoal.type}
                    array={dailyGoals}
                    setArray={setDailyGoals}
                    onChange={updateGoal}
                    deleteClick={completeGoal}
                    filterClick={filterGoals}
                    /> )) : null
                } 
              </div>
          </div>: null 
        }
        { navigation === "LongTerm" ?
        <div className="component">
          <h1>Long Term</h1>
          <div className="componentContent">
            {dailyGoalsSet ? longTermGoals.map((longTerm, index) => ( 
                <KWMLGoal 
                  key={longTerm.category}
                  id={index} 
                  goalId={longTerm._id}
                  goal={longTerm.goal}
                  category={longTerm.category} 
                  scope={longTerm.scope} 
                  type={longTerm.type}
                  array={longTermGoals}
                  setArray={setLongTermGoals}
                  onChange={updateGoal}
                  deleteClick={completeGoal}
                  filterClick={filterGoals}
                  /> )) : null
              } 
            </div>
        </div>: null 
        }
      </div>

      { navigation === "Create" ? <CreateArea onAdd={addGoal} /> : null }

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
      </div> : null
      }
    </div>
  );
}

export default App;