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

function processDaily(user, filteredList){ 
    if (filteredList.length > 0) { 
        var randomGoal = filteredList[ getRandomNumber(filteredList.length) ];

        console.log(randomGoal._id)
        const filter = { "name":"user", "items._id":randomGoal._id }
        const update = { $set: { "items.$.isPinned": true } }
     


        // User.aggregate(
        //     { $match: { name:user } },
        //     { $unwind: '$items' },
        //     { $match: {'items._id' : randomGoal._id }})
            

        User.findOne( { name: user }, function(err, foundUser){
            if (!err) {
                var foundRandomGoal = foundUser.items.id(randomGoal._id);
                foundRandomGoal.isPinned = true;
                foundUser.save(function(err){
                    if (err){
                        console.log(err)
                    } else {
                        console.log("Goal pinned")
                    }
                })
                console.log(foundRandomGoal + " successfully pinned");
            } else {
                console.log("error")
            }
        });
    }
}

function addToPinned(user, goal){              
    User.find(goal._id, {isPinned: true}, function(err){
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


function findDailyGoals(user){
    console.log("Have started findDailyGoals")
    User.findOne({name: user}, function(err, foundUser){
        if (!err){
            if(!foundUser){
                console.log("User is not currently on the database, no saved items.")
            } else {
                console.log("Gonna try find")
                const dailyGoals = foundUser.items.filter(item => item.type === "Goal" && item.scope === "Daily");
                const pinnedDailyGoals = dailyGoals.filter(item => item.isPinned === true);
                // console.log(dailyGoals + ":D :D :D")
                // console.log(pinnedDailyGoals)
                if (pinnedDailyGoals.length === 0) {
                    newDailyGoals(user, dailyGoals)
                    console.log("Have sent to set new daily goals")
                } else {
                    console.log("There are current daily goals")
                }
            }
        }
    })
}

// function findLongTermGoals(user){
//     console.log("Have started findLongTermGoals")

//     User.findOne({name: user}, function(err, foundUser){
//         if (!err){
//             if(!foundUser){
//                 console.log("User is not currently on the database, no saved items.")
//             } else {
//                 foundUser.items.find({type: "Goal", scope: "Long-term", isPinned: true}, function(err, foundGoals){
//                     if (foundGoals.length === 0) {
//                         newLongTermGoals(user)
//                         console.log("Have sent to set new long term goals")
//                     } else {
//                         console.log("There are current long term  goals")
//                     }
//                 })
//             }
//         }
//     })
// }


// function newDailyGoals(user){
//     console.log("Have started newDailyGoals")

//     let goals = [];

//     User.findOne({name: user}, function(err, foundUser){
//         if (!err){
//             if(!foundUser){
//                 console.log("User is not currently on the database, no saved items.")
//             } else {
//                 goals = foundUser.items;
//                 User.find({name:user, 'items.type':"Goal"}, function(err, foundGoals){
//                     if (foundGoals.length === 0) {
//                         console.log("Found no goals, reminders, or mindsets")
//                         console.log(foundGoals)
//                     } else {
//                         goals = foundGoals    
//                         console.log(foundGoals)
//                         console.log("Found goals")
//                         let filteredGoals = goals.filter(goal => goal.type === "Goal");
//                         let filteredDailyGoals = filteredGoals.filter(goal => goal.scope === "Daily");
//                         console.log(filteredDailyGoals);
                        
//                         if (filteredDailyGoals.length === 0) { 
//                             console.log("No daily goals");
//                         } else if ( filteredDailyGoals.length <= 4 ) {
//                             filteredDailyGoals.forEach((dailyGoal) => addToPinned(dailyGoal))
//                         } else if ( filteredDailyGoals.length > 4 ) {
//                             let filteredKingGoals = filterLists(filteredDailyGoals, "King");
//                             let filteredWarriorGoals = filterLists(filteredDailyGoals, "Warrior");
//                             let filteredMagicianGoals = filterLists(filteredDailyGoals, "Magician");
//                             let filteredLoverGoals = filterLists(filteredDailyGoals, "Lover");

//                             processDaily(filteredKingGoals);
//                             processDaily(filteredWarriorGoals); 
//                             processDaily(filteredMagicianGoals); 
//                             processDaily(filteredLoverGoals); 

//                             console.log("Have set new daily goals");
//                         }
//                     }
//                 })
//             }
//         }
//     }) 
// }

function newDailyGoals(user, dailyGoals){
    console.log("Have started newDailyGoals")

    if ( dailyGoals.length <= 4 ) {
        dailyGoals.forEach((dailyGoal) => addToPinned(dailyGoal))
    } else if ( dailyGoals.length > 4 ) {
        let filteredKingGoals = filterLists(dailyGoals, "King");
        let filteredWarriorGoals = filterLists(dailyGoals, "Warrior");
        let filteredMagicianGoals = filterLists(dailyGoals, "Magician");
        let filteredLoverGoals = filterLists(dailyGoals, "Lover");

        processDaily(user, filteredKingGoals);
        processDaily(user, filteredWarriorGoals); 
        processDaily(user, filteredMagicianGoals); 
        processDaily(user, filteredLoverGoals); 

        console.log("Have set new daily goals");
    }
}

function newLongTermGoals(user){
    console.log("Have started newLongTermGoals")

    let goals = [];

    User.findOne({name: user}, function(err, foundUser){
        if (!err){
            if(!foundUser){
                console.log("User is not currently on the database, no saved items.")
            } else {
                goals = foundUser.items;
                console.log(goals)
                
                foundUser.items.find({}, function(err, foundGoals){
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
        }
    }) 
}

app.get("/api", (req, res) => {
    res.json({
        message: "Hello from server!",
        stoic: JSON.stringify(dailyStoicism),
        poem: JSON.stringify(dailyPoem),
        philosophy: JSON.stringify(dailyPhilosophy)
    });
});

app.get("/goals/:user", (req, res) => {
    const user = req.params.user

    findDailyGoals(user)
    // findLongTermGoals(user)

    User.findOne({name: user}, function(err, foundUser){
        if (!err){
            if(!foundUser){
                console.log("User is not currently on the database, no saved items.")
            } else {
                let currentGoals = foundUser.items
                // console.log(currentGoals)
                res.json({
                    kwmlgoals: JSON.stringify(currentGoals)
                })
            }
        } 
    })
});

app.post('/postGoals/:user', (req, res) => {
    const user = req.params.user;
    const { goal, category, type, scope, isPinned, name } = req.body;
    // console.log(type)

    const newKwmlGoal = new KwmlGoal({
        goal: goal, 
        category: category,
        type:type,
        scope: scope,
        isPinned: isPinned,
        name:name
    })

    const newUser = new User({
        name:user
    })

    User.findOne({name: user}, function(err, foundUser){
        if (!err) {
            if (!foundUser){
                newUser.save();
                console.log("Saved " + user + " as new user.");
            } else {
                foundUser.items.push(newKwmlGoal);
                foundUser.save();
                console.log("Found user " + user + ", saved item " + newKwmlGoal + ".");
                console.log(foundUser.items)
            } 
        } else {
            console.log(err)
        }
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
