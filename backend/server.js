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

const models = require('./Models');
const KwmlGoal = models.kwmlGoalModel;
const User = models.userModel;

const { type } = require('os');

var dailyStoicism = {quote: "Loading...", author: ""}
var dailyPhilosophy = {quote: "Loading...", author: ""}
var dailyPoem = {poemTitle: "Loading...", poemAuthor: "", poemLines: ""}
// eslint-disable-next-line no-unused-vars
var dailyGoals = []
// eslint-disable-next-line no-unused-vars
var longTermGoals = []

function getRandomNumber(arrayLength){
    return Math.floor(Math.random() * arrayLength);
}

function filterLists(list, archetype){ 
    let filteredArray = list.filter(item => item.category === archetype); 
    return filteredArray 
}

function processDaily(filteredList){ 
    if (filteredList.length > 0) { 
        var randomGoal = filteredList[ getRandomNumber(filteredList.length) ];
                
        KwmlGoal.findByIdAndUpdate(randomGoal._id, {isPinned: true}, function(err){
            if (!err) {
                console.log(randomGoal + " successfully pinned");
            } else {
                console.log("error")
                console.log(err)
            }
        });
        }
}

function addToPinned(goal){              
    KwmlGoal.findByIdAndUpdate(goal._id, {isPinned: true}, function(err){
        if (!err) {
            console.log(goal + " successfully pinned");
        } else {
            console.log("error")
            console.log(err)
        }
    });
}

const philosophyAPIurl = "https://philosophyapi.herokuapp.com/api/ideas/" + getRandomNumber(583) + "/"

https.get(philosophyAPIurl, (res) => {
    console.log(res.statusCode)
    res.on("data", function(data){
        const philosophyAPI = JSON.parse(data);
        // console.log(philosophyAPI)
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


function findDailyGoals(){
    KwmlGoal.find({type: "Goal", scope: "Daily", isPinned: true}, function(err, foundGoals){
        if (foundGoals.length === 0) {
            newDailyGoals()
            console.log("Have sent to set new daily goals")
        } else {
            console.log("There are current daily goals")
        }
    })
}

function findLongTermGoals(){
    KwmlGoal.find({type: "Goal", scope: "Long-term", isPinned: true}, function(err, foundGoals){
        if (foundGoals.length === 0) {
            newLongTermGoals()
            console.log("Have sent to set new long term goals")

        } else {
            console.log("There are current long term goals")
        }
    })
}

function newDailyGoals(){
    let goals = []
    KwmlGoal.find({}, function(err, foundGoals){
        if (foundGoals.length === 0) {
            console.log("Found no goals, reminders, or mindsets")
        } else {
            goals = foundGoals    
            let filteredGoals = goals.filter(goal => goal.type === "Goal");
            let filteredDailyGoals = filteredGoals.filter(goal => goal.scope === "Daily");
            console.log(filteredDailyGoals);
            
            if (filteredDailyGoals.length === 0) { 
                console.log("No daily goals");
            } else if ( filteredDailyGoals.length <= 4 ) {
                filteredDailyGoals.forEach((dailyGoal) => addToPinned(dailyGoal))
            } else if ( filteredDailyGoals.length > 4 ) {
                let filteredKingGoals = filterLists(filteredDailyGoals, "King");
                let filteredWarriorGoals = filterLists(filteredDailyGoals, "Warrior");
                let filteredMagicianGoals = filterLists(filteredDailyGoals, "Magician");
                let filteredLoverGoals = filterLists(filteredDailyGoals, "Lover");

                processDaily(filteredKingGoals);
                processDaily(filteredWarriorGoals); 
                processDaily(filteredMagicianGoals); 
                processDaily(filteredLoverGoals); 

                console.log("Have set new daily goals");
            }
        }
    })
}

function newLongTermGoals(){
    let goals = []
    KwmlGoal.find({}, function(err, foundGoals){
        if (foundGoals.length === 0) {
            console.log("Found no goals, reminders, or mindsets")
        } else {
            goals = foundGoals    
            let filteredGoals = goals.filter(goal => goal.type === "Goal");
            let filteredLongTermGoals = filteredGoals.filter(goal => goal.scope === "Long-term");
            console.log(filteredLongTermGoals.length)
            
            if (filteredLongTermGoals.length === 0) { 
                console.log("No daily goals");
            } else if ( filteredLongTermGoals.length <= 4 ) {
                filteredLongTermGoals.forEach((longTermGoal) => addToPinned(longTermGoal))
            } else if ( filteredLongTermGoals.length > 4 ) {
                let filteredKingGoals = filterLists(filteredLongTermGoals, "King");
                let filteredWarriorGoals = filterLists(filteredLongTermGoals, "Warrior");
                let filteredMagicianGoals = filterLists(filteredLongTermGoals, "Magician");
                let filteredLoverGoals = filterLists(filteredLongTermGoals, "Lover");

                processDaily(filteredKingGoals);
                processDaily(filteredWarriorGoals); 
                processDaily(filteredMagicianGoals); 
                processDaily(filteredLoverGoals); 

                console.log("Have set new long term goals");
            }
        }
    })
}

// app.post("/register", (req, res) => {
//     const { email, password } = req.body.user;
//     const newUser = new User({
//         email: email,
//         password: password
//     });
//     newUser.save()        
//     .then(() => {
//         console.log("User " + email + " successfully created.")
//         res.json({
//             message: "Created user successfully"
//         })
//     })  
//     .catch(err => {
//         console.log("Error creating user")
//         console.log(err)
//         res.status(400).json({
//             "error": err,
//             "message": "Error creating user"
//         })
//     })
// });

// app.post("/login", (req, res) => {
//     const { email, password } = req.body.user;
//     const newUser = new User({
//         email: email,
//         password: password
//     });
//     newUser.findOne({email: email}, function(err, foundUser){
//         if (err) {
//             console.log(err)
//             res.status(400).json({
//                 "error":err,
//                 "message": "No user found"
//             })
//         } else {
//             if (foundUser){
//                 if (foundUser.password === password) {
//                     res.json({
                        
//                     })
//                 }
//             }
//         }
//     })        
//     .then(() => {
//         console.log("User " + email + " successfully created.")
//         res.json({
//             message: "Created user successfully"
//         })
//     })  
//     .catch(err => {
//         console.log("Error creating user")
//         console.log(err)
//         res.status(400).json({
//             "error": err,
//             "message": "Error creating user"
//         })
//     })
// });

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
    findDailyGoals()
    findLongTermGoals()

    KwmlGoal.find({}, function(err, foundGoals){
        if (foundGoals.length === 0) {
            console.log("Found no goals, reminders, or mindsets")
        } else {
            currentGoals = foundGoals
            res.json({
                message: "Sent!",
                kwmlgoals: JSON.stringify(currentGoals)
            });
        }
    })
});


app.post('/postGoals', (req, res) => {
    const { goal, category, type, scope, isPinned } = req.body;
    // console.log(type)

    const newKwmlGoal = new KwmlGoal({
        goal: goal, 
        category: category,
        type:type,
        scope: scope,
        isPinned: isPinned
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
    const { goalId, goal, category, type, scope, isPinned } = req.body.goal
            
    KwmlGoal.findByIdAndUpdate(goalId, { goal: goal, category: category, type: type, scope:scope, isPinned: isPinned}, function(err){
        if (!err) {
            console.log("Task successfully updated");
            console.log(req.body.goal)
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
