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

// eslint-disable-next-line no-unused-vars
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

const dummyGoals = [
    {
        goal: "Here's a placeholder goal",
        category: "Conscientiousness",
        type: "Goal",
        scope: "Daily",
        isPinned: true
    }, 
    {
        goal: "Here's another placeholder goal",
        category: "Extraversion",
        type: "Goal",
        scope: "Daily",
        isPinned: true
    }, 
    {
        goal: "Here's placeholder mindset",
        category: "Openness",
        type: "Mindset",
        scope: "Daily",
        isPinned: true
    }, 
    {
        goal: "Here's placeholder reminder",
        category: "Agreeableness",
        type: "Reminder",
        scope: "Daily",
        isPinned: true
    }
]

function filterLists(list, archetype){ 
    let filteredArray = list.filter(item => item.category === archetype); 
    return filteredArray 
}

function processDaily(user, filteredList){ 
    if (filteredList.length > 0) { 
        var randomGoal = filteredList[ getRandomNumber(filteredList.length) ];

        console.log(randomGoal._id)
     
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
    User.findOne( { name: user }, function(err, foundUser){
        if (!err) {
            var pinnedGoal = foundUser.items.id(goal._id);
            pinnedGoal.isPinned = true;
            foundUser.save(function(err){
                if (err){
                    console.log(err)
                } else {
                    console.log("Goal pinned")
                }
            })
            console.log(pinnedGoal + " successfully pinned");
        } else {
            console.log("error")
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
                const longTermGoals = foundUser.items.filter(item => item.type === "Goal" && item.scope === "Long-term");
                const pinnedDailyGoals = dailyGoals.filter(item => item.isPinned === true);
                const pinnedLongTermGoals = longTermGoals.filter(item => item.isPinned === true);
                // console.log(dailyGoals + ":D :D :D")
                // console.log(pinnedDailyGoals)
                if (pinnedDailyGoals.length === 0) {
                    newDailyGoals(user, dailyGoals)
                    console.log("Have sent to set new daily goals")
                } else {
                    console.log("There are current daily goals")
                }
                if (pinnedLongTermGoals.length === 0) {
                    newLongTermGoals(user, longTermGoals)
                    console.log("Have sent to set new long term goals")
                } else {
                    console.log("There are current long term goals")
                }
            }
        }
    })
}

function newDailyGoals(user, dailyGoals){
    if ( dailyGoals.length <= 4 ) {
        dailyGoals.forEach((dailyGoal) => addToPinned(user, dailyGoal))
    } else if ( dailyGoals.length > 4 ) {
        let filteredConscientiousnessGoals = filterLists(dailyGoals, "Conscientiousness");
        let filteredExtraversionGoals = filterLists(dailyGoals, "Extraversion");
        let filteredOpennessGoals = filterLists(dailyGoals, "Openness");
        let filteredAgreeablenessGoals = filterLists(dailyGoals, "Agreeableness");

        processDaily(user, filteredConscientiousnessGoals);
        processDaily(user, filteredExtraversionGoals); 
        processDaily(user, filteredOpennessGoals); 
        processDaily(user, filteredAgreeablenessGoals); 

        console.log("Have set new daily goals");
    }
}

function newLongTermGoals(user, longTermGoals){
    if ( longTermGoals.length <= 4 ) {
        longTermGoals.forEach((longTermGoal) => addToPinned(user, longTermGoal))
    } else if ( longTermGoals.length > 4 ) {
        let filteredConscientiousnessGoals = filterLists(longTermGoals, "Conscientiousness");
        let filteredExtraversionGoals = filterLists(longTermGoals, "Extraversion");
        let filteredOpennessGoals = filterLists(longTermGoals, "Openness");
        let filteredAgreeablenessGoals = filterLists(longTermGoals, "Agreeableness");

        processDaily(user, filteredConscientiousnessGoals);
        processDaily(user, filteredExtraversionGoals); 
        processDaily(user, filteredOpennessGoals); 
        processDaily(user, filteredAgreeablenessGoals); 

        console.log("Have set new long term goals");
    }
}

app.get("/api", (req, res) => {
    res.json({
        message: "Hello from server!",
        stoic: JSON.stringify(dailyStoicism),
        poem: JSON.stringify(dailyPoem),
        philosophy: JSON.stringify(dailyPhilosophy)
    });
});

app.get("/newUser/:user", (req, res) => {
    const user = req.params.user
    const newUser = new User({
        name:user
    })

    User.findOne({name: user}, function(err, foundUser){
        if (!err){
            if(foundUser){
                console.log("User is not currently on the database, no saved items.")
            } else {
                newUser.save();
            }
        } 
    })
});

app.get("/goals/:user", (req, res) => {
    const user = req.params.user

    findDailyGoals(user)

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

    User.findOne({name: user}, function(err, foundUser){
        if (!err) {
            if (!foundUser){

                const newUser = new User({
                    name:user
                })

                newUser.save();

                User.findOne({name:user}, function(err, foundUser){
                    console.log(foundUser)
                    dummyGoals.forEach(function(newGoal){
                        var newKwmlGoal = new KwmlGoal({
                            goal: newGoal.goal, 
                            category: newGoal.category,
                            type:newGoal.type,
                            scope: newGoal.scope,
                            isPinned: newGoal.isPinned,
                            name:user
                        });
                        foundUser.items.push(newKwmlGoal)
                        foundUser.save()
                        console.log("Created user " + name + " and added dummy goals")
                    })
                })
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
})
function updateGoalCategories(){
    // KwmlGoal.updateMany({"category": "King"}, {"category": "Conscientiouesness"}, function(err){
    //     if(!err){
    //         console.log("Successfully updated entries")
    //     } else {
    //         console.log("Error in update") 
    //         console.log(err) 
    //     }
    // }) 
    User.findOne({name: "fitzgerald.s.alexander@gmail.com", "items.category": "King"}, function(err, foundGoals){
        if (!err) {
            console.log(foundGoals)
        }
    })
}

updateGoalCategories()


app.post("/updateGoals/:user", (req, res) => {
    const name = req.params.user
    const { _id, goal, category, type, scope, isPinned } = req.body.goal
    console.log(req.body.goal)

    User.findOne( { name: name }, function(err, foundUser){
        if (!err) {
            var goalToUpdate = foundUser.items.id(_id);
            goalToUpdate._id = _id;
            goalToUpdate.goal = goal;
            goalToUpdate.category = category;
            goalToUpdate.type = type;
            goalToUpdate.scope = scope;
            goalToUpdate.isPinned = isPinned;
            foundUser.save(function(err){
                if (err){
                    console.log(err)
                } else {
                    console.log("Goal update")
                }
            })
        } else {
            console.log("error")
        }
    });
});

app.post("/deleteGoals/:user", (req, res) => {
    const name = req.params.user;
    const goalId = req.body.goalId;
    console.log(name)
    console.log(goalId)
    
    User.findOne({ name: name }, function(err, foundUser){
        if(err){
            console.log(err)
        } else {
            const uid = foundUser._id

            User.updateOne( { _id: uid } , { $pull : { items: { _id :goalId } } }, function(err, results){
                if(!err){
                  console.log("successfully deleted");
                } else {
                  console.log("error in deletion");
                }
            });
    }})
})
        

//         $pull: {
//           items: {_id: goalId}
//         }
//       },  function(err){
//         if (!err) {
//             console.log(goalId)
//             console.log("Task successfully deleted");
//         } else {
//             console.log("error")
//         }
//     });
// });


    
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
