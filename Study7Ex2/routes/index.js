var express = require('express');
var router = express.Router();

var todos = [
    'eat',
    'sleep',
    'study'
]

/* GET home page. */
router.get('/api', function(req, res, next) {
  res.render('todos', { title: todos });
});
router.get('/api/todos', function(req, res, next) {
    res.render('todos', { title: todos});
});

router.post('/api/addTodo', function(req, res, next) {
    var todoExist = false;
    for(var i = 0; i < todos.length; i++) {
        if (todos[i] === req.body.todo) {
            todos.splice(i, 1);
            todoExist = true;
        }
    }
    if(todoExist === false){
        todos.push(req.body.todo);
    }
    res.render('todos', { title: todos});
});

router.delete("/api/deleteTodo/:todo", function(req, res) {
    console.log(req.body.todo);
    for(var i = 0; i < todos.length; i++) {
        if(todos[i] === req.body.todo){
            todos.splice(i,1);
        }
    }
    res.render('todos', { title: todos});
});

module.exports = router;
