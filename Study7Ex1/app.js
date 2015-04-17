var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var users = require('./users');

function findUser(users, email) {
    var result = users.filter(function(u) {
        return u.email === email;
    });
    if(result.length >= 1) {
        return result[0];
    }
    return undefined;
}

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/api/users", function(req, res) {
    res.send(users);
});

app.get("/api/users/:email", function(req, res) {
    var user = findUser(users, req.params.email);
    if(!user) {
        return res.status(404).send({error: "user not found"});
    }
    res.send(user);
});

app.post("/api/users", function(req, res) {
    var user = req.body;
    if(findUser(users, user.email)) {
        return res.status(400).send({error: "user exist"});
    }
    users.push(user);
    res.send(user);
});

app.put("/api/users/:email", function(req, res) {
    var user = req.body;
    if(!findUser(users, req.params.email)) {
        return res.status(404).send({error: "user not found"});
    }
    if(!user) {
        return res.status(404).send({error: "no user provided"});
    }
    for(var i = 0; i < users.length; i += 1) {
        if(users[i].email === user.email) {
            users[i].password = user.password;
            break;
        }
    }
    res.send(user);
});

app.delete("/api/users/:email", function(req, res) {
    var user = findUser(users, req.params.email);
    if(!user) {
        return res.status(404).send({error: "user not found"});
    }
    for(var i = 0; i < users.length; i++) {
        if(users[i].email === req.params.email) {
            users.splice(i, 1);
            break;
        }
    }
    res.send(user);
});

app.all('*', function(req, res) {
    res.status(500).send(req.url + " not a valid");
});


app.listen(3000, function() {
    console.log("Rest API started, listen on port 3000");
});
