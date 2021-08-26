const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();
require('dotenv').config()
require('./database');
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

// localhost direct
// end localhost direct

var dailyStoicism = {quote: "Loading...", author: ""}
var dailyPhilosophy = {quote: "Loading...", author: ""}
var dailyPoem = {poemTitle: "Loading...", poemAuthor: "", poemLines: ""}

function getRandomNumber(arrayLength){
    return Math.floor(Math.random() * arrayLength);
  }

const philosophyAPIurl = "https://philosophyapi.herokuapp.com/api/ideas/" + getRandomNumber(583) + "/"

https.get(philosophyAPIurl, (res) => {
    console.log(res.statusCode)
    res.on("data", function(data){
        const philosophyAPI = JSON.parse(data);
        console.log(philosophyAPI)
        dailyPhilosophy.quote = philosophyAPI.quote;
        dailyPhilosophy.author = philosophyAPI.author;
    })
})

https.get("https://stoicquotesapi.com/v1/api/quotes/random", (res) => {
    console.log(res.statusCode)
    res.on("data", function(data){
        const stoicAPI = JSON.parse(data);
        dailyStoicism.quote = stoicAPI.body;
        dailyStoicism.author = stoicAPI.author;
    })
})

https.get("https://poetrydb.org/random", (res) => {
    console.log(res.statusCode)
    let result = '';
    
    res.on("data", function(data){
        result += data;
    });
    res.on('end', () => {
        const poem = JSON.parse(result);
        // eslint-disable-next-line no-unused-expressions
        dailyPoem.poemTitle = poem[0].title,
        dailyPoem.poemAuthor = poem[0].author,
        dailyPoem.poemLines = poem[0].lines
    })
})

const models = require('./Goal');

const KwmlGoal = models.kwmlGoalModel;

const { type } = require('os');

app.get("/api", (req, res) => {
    res.json({
        message: "Hello from server!",
        stoic: JSON.stringify(dailyStoicism),
        poem: JSON.stringify(dailyPoem),
        philosophy: JSON.stringify(dailyPhilosophy)
    });
});

app.get("/goals", (req, res) => {
    var currentGoals = []

    KwmlGoal.find({}, function(err, foundGoals){
        if (foundGoals.length === 0) {
            console.log("Found no goals, reminders, or mindsets")
        } else {
            currentGoals = foundGoals
            console.log(currentGoals)
            res.json({
                message: "Sent!",
                kwmlgoals: JSON.stringify(currentGoals)
            });
        }})
});


app.post('/postGoals', (req, res) => {
    const { goal, category, type, scope } = req.body;
    // console.log(type)

    const newKwmlGoal = new KwmlGoal({
        goal: goal, 
        category: category,
        type:type,
        scope: scope
    })
    
    newKwmlGoal.save()
        .then(() => res.json({
            message: "Created goal successfully"
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating goal"
        }))
})



// function updateGoalCategories(){
//     KwmlGoal.updateMany({"scope": "Monthly"}, {"scope": "Long-term"}, function(err){
//         if(!err){
//             console.log("Successfully updated entries")
//         } else {
//             console.log("Error in update") 
//             console.log(err) 
//         }
//     }) 
// }

// updateGoalCategories()


app.post("/updateGoals", (req, res) => {
    console.log(req)
    const { goalId, goal, category, type, scope } = req.body.goal
    
    console.log(goal)
    console.log(goalId)
        
    KwmlGoal.findByIdAndUpdate(goalId, 
        { goal: goal, category: category, type: type, scope:scope}, 
        function(err){
    if (!err) {
        console.log("Task successfully updated");
        console.log(err)
    } else {
        console.log("error")
    }
    });
});

app.post("/deleteGoals", (req, res) => {
    const goal = req.body.goal;
    const category = req.body.category
    const type = req.body.type
    const scope = req.body.scope
    
    console.log(goal, category, type, scope)
    KwmlGoal.remove({ goal: goal, category: category, type: type, scope:scope}, function(err){
    if (!err) {
        console.log("Task successfully deleted");
    } else {
        console.log("error")
    }
    });
});

    
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
