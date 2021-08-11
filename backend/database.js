const mongoose = require('mongoose');
const connection = "mongodb+srv://admin-alex:Nhuyt7g82@cluster0.tegcl.mongodb.net/dashboardDB?retryWrites=true&w=majority";

mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));