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

const KwmlGoal = require('./Goal');

app.get('/getGoals', (req, res) => {
    KwmlGoal.find()
        .then(kwmlgoals => res.json(kwmlgoals))
        .catch(err => console.log(err))
})

  app.get("/api", (req, res) => {
    var currentGoals = []


    KwmlGoal.find({}, function(err, foundGoals){
        if (foundGoals.length === 0) {
            console.log("Found no items")
            res.json({
                message: "Hello from server!",
                stoic: JSON.stringify(dailyStoicism),
                poem: JSON.stringify(dailyPoem)
            });
        } else {
        currentGoals = foundGoals
        res.json({
            message: "Hello from server!",
            stoic: JSON.stringify(dailyStoicism),
            poem: JSON.stringify(dailyPoem),
            kwmlgoals: JSON.stringify(currentGoals)
        });
    }})
  });

  app.post('/postGoals', (req, res) => {
      const { goal, category } = req.body;
    const newKwmlGoal = new KwmlGoal({
        goal: goal, 
        category: category
    })
    newKwmlGoal.save()
        .then(() => res.json({
            message: "Created account successfully"
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating account"
        }))
    })

    app.post("/deleteGoals", (req, res) => {
        const goalToDelete = req.body.goal;
        const goalCategoryToDelete = req.body.category
        
        console.log(goalToDelete, goalCategoryToDelete)
        KwmlGoal.remove({ goal: goalToDelete, category: goalCategoryToDelete}, function(err){
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
