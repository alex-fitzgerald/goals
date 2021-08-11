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

  // function postGoal(latestGoal){
  //   const url = "postGoals"
  //   fetch(url , {
  //     headers: {'Content-Type': 'application/json' },
  //     method: "POST",
  //     mode: 'cors',
  //     body: JSON.stringify(latestGoal)
  //   })
  //     .then(response => response.json())
  //     .then(data => this.setState({ postId: data.id }));
  // }

  function postGoal(latestGoal){
		axios
			.post("/postGoals", {
				goal: latestGoal.goal,
				category: latestGoal.category,
			})
			.then(function () {
				alert("Account created successfully");
				window.location.reload();
			})
			.catch(function () {
				alert("Could not creat account. Please try again");
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
        console.log(kwmlGoals)
      })
  }, []);

	// useEffect(() => {
	// 	axios
	// 		.get("/getGoals")
	// 		.then((kwmlgoals) => setKwmlGoals(kwmlgoals))
	// 		.catch((err) => console.log(err));
	// }, []);

  // React.useEffect(() => {
  //   fetch("goals", {
  //     headers : {
  //       "Content-Type": "applications/json",
  //       "Accept": "application/json"
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then(function(data){
  //       setKwmlGoals(JSON.parse(data.kwmlGoals))
  //     })
  // }, []);

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
      {kwmlGoals.map((kwmlGoal, index) => ( 
        <KWMLGoal 
          key={index}
          id={index} 
          goal={kwmlGoal.goal}
          category={kwmlGoal.category} 
          deleteClick={deleteKwmlGoal}
          /> ))}
    </div>
  );
}

export default App;