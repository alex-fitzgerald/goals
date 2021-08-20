import React,{ useState, useEffect, setState } from "react";
import Stoic from "./components/Stoic.jsx";
import axios from "axios"
import Poem from "./components/Poem.jsx";
import KWMLGoal from "./components/KWMLGoal.jsx";
// import DailyGoals from "./components/DailyGoals.jsx";
import CreateArea from "./components/CreateArea.jsx";


function App() {
  const [randomStoic, setRandomStoic] = useState({quote: "Loading", author: ""});
  const [dailyPoem, setDailyPoem] = useState({poemTitle: "Loading", poemAuthor: "", poemLines: [""]});
  const [kwmlGoals, setKwmlGoals] = useState([]);
  const [goalsFiltered, setGoalsFiltered] = useState(false);
  const [allGoals, setAllGoals] = useState([]);
  
  console.log(kwmlGoals)

  function addGoal(kwmlGoal){  
    setKwmlGoals(prevKwmlGoals => {
      return [...prevKwmlGoals, kwmlGoal]
    });
    postGoal(kwmlGoal);
    console.log(kwmlGoal)
  }

  function deleteKwmlGoal(id, goal, category) {
    setKwmlGoals(prevKwmlGoals => {
      return prevKwmlGoals.filter((kwmlGoals, index) => {
        return index !== id;
      });
    });
    deleteGoal(goal, category);
  }

  function postGoal(latestGoal){
		axios
			.post("/postGoals", {
				goal: latestGoal.goal,
				category: latestGoal.category,
			})
			.then(function () {
				console.log(latestGoal + "added to task list");
			})
			.catch(function () {
				alert("Could not create task. Please try again");
			});
	}

  function deleteGoal(goal, category){
    const url = "deleteGoals"
    console.log(goal, category)
    fetch(url , {
      headers: {'Content-Type': 'application/json' },
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({
        goal: goal,
        category: category
      })
    })
      .then(response => response.json())
      .then(data => this.setState({ postId: data.id }));
  }

  function filterGoals(selectedCategory) {
    if (!goalsFiltered) {
    let filteredGoals = kwmlGoals.filter(goal => goal.category === selectedCategory);
    setKwmlGoals(filteredGoals);
    setGoalsFiltered(true);
    console.log(kwmlGoals)
    } else {
    console.log(allGoals)
    setKwmlGoals(allGoals);
    setGoalsFiltered(false);
    }
  }

  useEffect(() => {
    fetch("api", {
      headers : {
        "Content-Type": "applications/json",
        "Accept": "application/json"
      }
    })
      .then((res) => res.json())
      .then(function(data){
        setDailyPoem(JSON.parse(data.poem))
        setRandomStoic(JSON.parse(data.stoic))
        setKwmlGoals(JSON.parse(data.kwmlgoals))
        setAllGoals(JSON.parse(data.kwmlgoals))
        console.log(kwmlGoals)
      })
  }, []);

  return (
    <div className="app">
      <Stoic 
        stoicInput = {randomStoic}
      />
      <Poem 
        poemInput = {dailyPoem}
      />
      <CreateArea 
          onAdd={addGoal}
      />
      {/* <DailyGoals 
          kwmlGoals={allGoals}
      /> */}
      {kwmlGoals.map((kwmlGoal, index) => ( 
        <KWMLGoal 
          key={index}
          id={index} 
          goal={kwmlGoal.goal}
          category={kwmlGoal.category} 
          deleteClick={deleteKwmlGoal}
          filterClick={filterGoals}
          /> ))}
    </div>
  );
}

export default App;