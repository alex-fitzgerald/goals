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

const kwmlGoals = require(path.resolve(__dirname, './api/kwmlgoals'));
app.use(path.resolve(__dirname, './api/kwmlgoals'), kwmlGoals);

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

var dailyStoicism = {quote: "Loading...", author: ""}
var dailyPoem = {poemTitle: "Loading...", poemAuthor: "", poemLines: ""}

https.get("https://stoicquotesapi.com/v1/api/quotes/random", (res) => {
    console.log(res.statusCode)
    res.on("data", function(data){
        // console.log(JSON.parse(data))
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

app.get("/api", (req, res) => {
    
    res.json({
        message: "Hello from server!",
        stoic: JSON.stringify(dailyStoicism),
        poem: JSON.stringify(dailyPoem),
    });
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// var morgan = require('morgan');



// const app = express();
// app.use(express.static(path.join(__dirname, '../build')))
// app.use(cors());
// app.use(morgan('dev'));
// app.use(express.json());
// app.use(express.urlencoded({
//     extended: true
//   }));

// const corsOptions = {
//       origin: 'https://localhost:' + PORT,
//     }
    
// const configuredCors = cors(corsOptions);

// if (process.env.NODE_ENV === "production"){
//     app.use(express.static("build"));
//     app.get("*", (req, res) => {
//       res.sendFile(path.resolve(__dirname,  "build", "index.html"));
//     });
//   }

// app.options('*', configuredCors)
    
// mongoose.set('useCreateIndex', true);

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function(){
//   //we're connected!
// });

    

// app.use(express.static(path.join(__dirname, '../build')))

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build'))
// })



// app.get("/api", (req, res) => {
//     var currentGoals = []

//     KwmlGoal.find({}, function(err, foundGoals){
//         if (foundGoals.length === 0) {
//             console.log("Found no items")
//             res.json({
//                 message: "Hello from server!",
//                 stoic: JSON.stringify(dailyStoicism),
//                 poem: JSON.stringify(dailyPoem)
//             });
//         } else {
//         currentGoals = foundGoals
//         res.json({
//             message: "Hello from server!",
//             stoic: JSON.stringify(dailyStoicism),
//             poem: JSON.stringify(dailyPoem),
//             kwmlGoals: JSON.stringify(currentGoals)
//         });
//     }})
//   });

// app.post('/postGoals', configuredCors, (req, res) => {
//     const goalName = req.body.goal;
//     const goalCategory = req.body.category;

//     const goal = new KwmlGoal({
//         goal: goalName,
//         category:goalCategory
//     });

//     goal.save();
//     console.log(goalName + goalCategory)
// });

// app.post("/deleteGoals",configuredCors, (req, res) => {
//     const goalToDelete = req.body.goal;
//     const goalCategoryToDelete = req.body.category
    
//     console.log(goalToDelete, goalCategoryToDelete)
//     KwmlGoal.remove({ goal: goalToDelete, category: goalCategoryToDelete}, function(err){
//     if (!err) {
//         console.log("Task successfully deleted");
//     } else {
//         console.log("error")
//     }
//     });
//   });

// app.listen(PORT, () => {
//     console.log("server listening on " + PORT)
// });
