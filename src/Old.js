import React, { useState, useEffect } from "react";
import Stoic from "./Pages/Stoic/Stoic.component";
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react'
import Poem from "./Pages/Poem/Poem.component";
import Philosophy from "./Pages/Philosophy/Philosophy.component";
import DailyItems from "./Pages/DailyItems/DailyItems.component"
import Card from "./components/Card/Card.component";
import CreateArea from "./Pages/CreateArea/CreateArea.component";
import Navigation from "./components/Navigation";
import LoginButton from "./components/LoginButton/LoginButton.component";
import LogoutButton from "./components/LogoutButton/LogoutButton.component";
import Footer from "./components/Footer/Footer.component";

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
  
  const navigationList = ["Introduction", "Mindsets", "Reminders", "Daily", "LongTerm", "AllGoals", "Create", "Login"]
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
        const url = 'goals/guest';
        fetch(url, {headers : {"Content-Type": "applications/json","Accept": "application/json"}})
        .then((res) => res.json())
        .then(function(data){
          setKwmlGoals(JSON.parse(data.kwmlgoals))
          setAllGoals(JSON.parse(data.kwmlgoals))
          setGoalsLoaded(true)
          })
      }
    }, [isAuthenticated]);

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

  function deleteKwmlGoal(id, goalId, array, setArray) {
    let newKwmlGoals = kwmlGoals;
    console.log(id)
    newKwmlGoals.splice(id, 1);
    setKwmlGoals([...newKwmlGoals]);
    deleteGoal(goalId);
    // setGoalsLoaded(true)
  }

  function completeGoal(id, currentGoal, array, setArray) {
    console.log("completeGoal engaged")
    
    unpinGoal(currentGoal)

    let prunedGoals = array;
    prunedGoals.splice(id, 1);
    setArray([...prunedGoals]);
  }
  
  function unpinGoal(goal){
    if (isAuthenticated) {
    const url = "updateGoals/" + user.email
//     console.log(goal)
    fetch(url , {
      headers: {'Content-Type': 'application/json' },
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({
        goal: goal,
        pinnedStatus:false,
        user:user.email
      })
    })
    .then(response => response.json())
    // .then(data => this.setState({ postId: data.id }));
  } else {
    const url = "updateGoals/guest" 
//     console.log(goal)
    fetch(url , {
      headers: {'Content-Type': 'application/json' },
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({
        goal: goal,
        pinnedStatus:true,
        user:"guest"
      })
    })
    .then(response => response.json())
    // .then(data => this.setState({ postId: data.id }));
  }
  }

  function pinGoal(goal){
    if (isAuthenticated) {
    const url = "updateGoals/" + user.email
//     console.log(goal)
    fetch(url , {
      headers: {'Content-Type': 'application/json' },
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({
        goal: goal,
        pinnedStatus:true,
        user:user.email
      })
    })
    .then(response => response.json())
    // .then(data => this.setState({ postId: data.id }));
  } else {
    const url = "updateGoals/guest" 
//     console.log(goal)
    fetch(url , {
      headers: {'Content-Type': 'application/json' },
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({
        goal: goal,
        pinnedStatus:true,
        user:"guest"
      })
    })
    .then(response => response.json())
    // .then(data => this.setState({ postId: data.id }));
  }
  }

  function postGoal(latestGoal){
    if (isAuthenticated) {
      const url = 'postGoals/' + user.email;
      axios
      .post(url, {
        goal: latestGoal.goal,
        category: latestGoal.category,
        type: latestGoal.type,
        scope: latestGoal.scope,
        isPinned: latestGoal.isPinned,
        name: user.email
      })
      .then(function () {
    //     console.log(latestGoal.goal + " a " + latestGoal.category + " " + latestGoal.type + " added to the database.");
      })
      .catch(function () {
          alert("Could not create goal. Please try again");
        });
      } else {
        const url = 'postGoals/guest';
        axios
        .post(url, {
          goal: latestGoal.goal,
          category: latestGoal.category,
          type: latestGoal.type,
          isPinned: latestGoal.isPinned,
          scope: latestGoal.scope,
          name: "guest"
        })
        .then(function () {
      //     console.log(latestGoal.goal + " a " + latestGoal.category + " " + latestGoal.type + " added to the database.");
        })
        .catch(function () {
            alert("Could not create goal. Please try again");
          });
      }
    }
  
    function updateGoal(kwmlGoal){
      const url = "updateGoals/" + (isAuthenticated ? user.email : "guest"); 
      const { isPinned } = kwmlGoal
      console.log(isPinned)

      //map out old list. Find array item matching number, send back updated version. 

      let updatedList = kwmlGoals.map(goal => {
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
          goal: kwmlGoal,
          pinnedStatus: kwmlGoal.isPinned
        })
      })
      .then(response => response.json())
      // .then(data => this.setState({ postId: data.id }));
    }

    function deleteGoal(goalId){
      if (isAuthenticated) {
        const url = "deleteGoals/" + user.email
    //     console.log(goalId)
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
    } else {
      const url = "deleteGoals/guest"
  //     console.log(goalId)
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
    }
  
  
  function findDailyGoals(){
    if (goalsLoaded === true) {
  //     console.log(kwmlGoals)

      function getRandomNumber(arrayLength){ return Math.floor(Math.random() * arrayLength); }
      function filterLists(list, archetype){ let filteredArray = list.filter(item => item.category === archetype); return filteredArray }
      
      function processDaily(filteredList, arrayList){ 
        if (filteredList.length > 0) { 
          arrayList.push(filteredList[ getRandomNumber(filteredList.length) ]); 
        } else {
      //     console.log(filteredList + " is empty")
        }
      }

      let filteredPinned = kwmlGoals.filter(goal => goal.isPinned === true);
      let filteredPinnedDaily = filteredPinned.filter(goal => goal.scope === "Daily");
      let filteredPinnedLongTerm = filteredPinned.filter(goal => goal.scope === "Long-term");
      let filteredMindsets = kwmlGoals.filter(goal => goal.type === "Mindset");
      let filteredReminders = kwmlGoals.filter(goal => goal.type === "Reminder");

      if (filteredMindsets.length === 0) {
      } else if (filteredMindsets.length < 5 && filteredMindsets.length > 0) {
        setMindsets(filteredMindsets)
      } else if (filteredMindsets.length > 4){
    
        let filteredConscientiousnessMindsets = filterLists(filteredMindsets, "Conscientiousness"); 
        let filteredExtraversionMindsets = filterLists(filteredMindsets, "Extraversion");
        let filteredOpennessMindsets = filterLists(filteredMindsets, "Openness");
        let filteredAgreeablenessMindsets = filterLists(filteredMindsets, "Agreeableness");
        let dailyMindsets = []

        processDaily(filteredConscientiousnessMindsets, dailyMindsets); processDaily(filteredExtraversionMindsets, dailyMindsets); processDaily(filteredOpennessMindsets, dailyMindsets); processDaily(filteredAgreeablenessMindsets, dailyMindsets);
        setMindsets(dailyMindsets);
      }

      if (filteredReminders.length === 0) {
      } else if (filteredReminders.length < 5) {
        setReminders(filteredReminders)
      } else if (filteredReminders.length > 4){

        let filteredConscientiousnessReminders = filterLists(filteredReminders, "Conscientiousness"); 
        let filteredExtraversionReminders = filterLists(filteredReminders, "Extraversion"); 
        let filteredOpennessReminders = filterLists(filteredReminders, "Openness"); 
        let filteredAgreeablenessReminders = filterLists(filteredReminders, "Agreeableness"); 
        let dailyReminders = [];

        processDaily(filteredConscientiousnessReminders, dailyReminders); processDaily(filteredExtraversionReminders, dailyReminders); processDaily(filteredOpennessReminders, dailyReminders); processDaily(filteredAgreeablenessReminders, dailyReminders); 
        setReminders(dailyReminders); 
      }

      if (filteredPinnedDaily.length === 0) {
      } else {
        setDailyGoals(filteredPinnedDaily)
      }

      if (filteredPinnedLongTerm.length === 0) {
      } else {
        setLongTermGoals(filteredPinnedLongTerm)
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
          { navigation === "Introduction" ?     
          <div>  
            <Philosophy philosophyInput = {dailyPhilosophy} /> 
            <Poem poemInput = {dailyPoem} /> 
            </div> : null }
          
            { navigation === "Mindsets" ? 
            <DailyItems  
              dailyGoals={dailyGoalsSet} 
              itemSet={mindsets} 
              componentName="Mindsets" 
              updateGoal={updateGoal} deleteKwmlGoal={completeGoal}   filterGoals={filterGoals}                        
              section={"Mindsets"} /> : null }  
          
            { navigation === "Reminders" ? 
            <DailyItems  
              dailyGoals={dailyGoalsSet} 
              itemSet={reminders} 
              componentName="Reminders" 
              updateGoal={updateGoal} 
              deleteKwmlGoal={completeGoal} 
              filterGoals={filterGoals}                        
              section={"Reminders"} /> : null }  

            { navigation === "Daily" ? 
            <DailyItems  
              dailyGoals={dailyGoalsSet} 
              itemSet={dailyGoals} 
              componentName="Daily Goals" 
              updateGoal={updateGoal} 
              deleteKwmlGoal={completeGoal} 
              filterGoals={filterGoals} 
              array={dailyGoals} 
              setArray={setDailyGoals}                        
              section={"Daily goals"} /> : null }    
                
            { navigation === "LongTerm" ? 
            <DailyItems  
              dailyGoals={dailyGoalsSet} 
              itemSet={longTermGoals} 
              componentName="Long Term" 
              updateGoal={updateGoal}
              deleteKwmlGoal={completeGoal} 
              filterGoals={filterGoals} 
              array={longTermGoals} 
              setArray={setLongTermGoals}                        
              section={"Long term goals"} /> : null }  
        </div>

        { navigation === "Create" ? <CreateArea onAdd={addGoal} /> : null }
          { navigation === "AllGoals" ?
          <div className="component">
            <h1>All Goals</h1>
            <div className="componentContent">
              {kwmlGoals.map((kwmlGoal, index) => 
              ( 
                <Card 
                  key={kwmlGoal._id}
                  id={index} 
                  goalId={kwmlGoal._id}
                  goal={kwmlGoal.goal}
                  category={kwmlGoal.category} 
                  scope={kwmlGoal.scope} 
                  type={kwmlGoal.type}
                  canBePinned={true}
                  isPinned={kwmlGoal.isPinned}
                  onPin={pinGoal}
                  onChange={updateGoal}
                  deleteClick={deleteKwmlGoal}
                  filterClick={filterGoals}
                  section={"All goals"}
                  /> ))
                }
            </div>
          </div> : null }
      <div className="authParent">
        <Footer />
        {!isAuthenticated ? <LoginButton /> : <LogoutButton /> }
      </div>
    </div>
  );
}

export default App;