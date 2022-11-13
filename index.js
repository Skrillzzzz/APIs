const express = require("express");                         // Pull in express package
const app = express();                                      // intialise express app
app.use(express.json());

const port = 3000;                                          // define port for app to run on

app.get("/", (req, res) => {                                // route checking it works
    res.send("Hello World!");
});

let users = [];
let next_id = 1;

app.post("/users", (req, res) => {                          // data sent is stored in req.body

    let user = { 
        user_id: next_id,
        user_name: req.body.user_name
    };

    users.push(user);                                       // object added to array
    next_id = next_id + 1;

    return res.status(201).send(user);                      // let user know server has finshed processing request
});

app.get("/users", (req, res) => {
    return res.status(200).send(users);
})

app.get("/users/:id", (req, res) => {
    let id = parseInt(req.params.id);                       // converting req.params string to integer

    const user = users.find(temp => temp.user_id === id);
    if(!user) return res.status(404).send("No user found");

    return res.status(200).send(user);
})

app.delete("/users/:id", (req, res) => {
    let id = parseInt(req.params.id);                       // converting req.params string to integer

    const user = users.find(temp => temp.user_id === id);
    if(!user) return res.status(404).send("No user found");

    const index = users.indexOf(user);
    users.splice(index, 1);

    return res.status(200).send("User deleted")

})

app.patch("/users/:id", (req, res) => {
    //1 Get the id from the path
    let id = parseInt(req.params.id);

    //2 Check if user with id exists, else 404
    const user = users.find(temp => temp.user_id === id);
    if(!user) return res.status(404).send("No user found");

    //3 Update name
    if(user.user_name != req.body.name){
        user.user_name = req.body.name
    }

    return res.status(200).send("User updated")

})

app.listen(port, () => {                                    // make sure app is accessible
    console.log("App is listing on port: " + port);
});

