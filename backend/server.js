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
var dailyPoem = {poemTitle: "Loading...", poemAuthor: "", poemLines: ""}

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
const Reminder = models.reminderModel;
const Mindset = models.mindsetModel;

const { type } = require('os');

app.get("/api", (req, res) => {
    res.json({
        message: "Hello from server!",
        stoic: JSON.stringify(dailyStoicism),
        poem: JSON.stringify(dailyPoem)
    });
});

app.get("/goals", (req, res) => {
    var currentGoals = []

    KwmlGoal.find({}, function(err, foundGoals){
        if (foundGoals.length === 0) {
            console.log("Found no goals")
        } else {
            currentGoals = foundGoals
            console.log(currentGoals)
            res.json({
                message: "Goals sent!",
                kwmlgoals: JSON.stringify(currentGoals)
            });
        }})
});

app.get("/mindsets", (req, res) => {
    var currentMindsets = []

    Mindset.find({}, function(err, foundMindsets){
        if (foundMindsets.length === 0) {
            console.log("Found no mindsets")
        } else {
            currentMindsets = foundMindsets
            res.json({
                mindsets: JSON.stringify(currentMindsets)
            });
        }})
});

app.get("/reminders", (req, res) => {
    var currentReminders = []

    Reminder.find({}, function(err, foundReminders){
        if (foundReminders.length === 0) {
            console.log("Found no reminders")
        } else {
            currentReminders = foundReminders
            res.json({
                reminders: JSON.stringify(currentReminders)
            });
        }})
});

app.post('/postGoals', (req, res) => {
const { goal, category, type, scope } = req.body;
console.log(type)

if (type === "Goal") {
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
} else if (type === "Reminder") {
    const newReminder = new Reminder({
        reminder: goal, 
        category: category,
        type: type,
        scope: scope
    })
    newReminder.save()
        .then(() => res.json({
            message: "Created reminder successfully"
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating reminder"
        }))
} else if (type === "Mindset") {
    const newMindset = new Mindset({
        mindset: goal, 
        category: category,
        type: type,
        scope: scope
    })
    newMindset.save()
        .then(() => res.json({
            message: "Created mindset focus successfully"
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating mindset focus"
        }))
}
})

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
