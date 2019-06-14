const express = require('express');
const taskRoutes = express.Router();

// Require Business model in our routes module
let Task = require('./business.model');

// Defined store route
taskRoutes.route('/addtask').post(function (req, res) {
  let task = new Task(req.body);
  task.save()
    .then(task => {
      res.status(200).json({'task': 'task is added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

taskRoutes.route('/addwork').post(function (req, res) {
  Task.findOne( { "task_id" : req.body.task_id } , function(err, task) {
    if (!task){
      let newtask = new Task(req.body);
      newtask.save()
      .then(task => {
        res.status(200).json({'task': 'task is added successfully'});
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });

    }
    else {
      task.task_id = req.body.task_id;
      console.log(JSON.stringify(task.task_id));
      if ( task.work_data.length == 0 ){
        task.work_data = [ req.body.work_data ];
      }
      else{
        task.work_data.push(req.body.work_data);
      }

      task.save().then(task => {
        res.json('Update complete');
      })
      .catch(err => {
        res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined get data(index or listing) route
taskRoutes.route('/gettask/:id').get(function (req, res) {
    let id = req.params.id;

    console.log('id= '+id);
    Task.findById(id, function (err, task){
      if (err){
        console.log(err);
      }else{
        console.log(JSON.stringify(task));
        res.json(task);
      }
    });
  });

taskRoutes.route('/gettaskbytask/:id').get(function (req, res) {
  let id = req.params.id;

  console.log('id= '+id);
  Task.findOne( { "task_id" : req.params.id } , function (err, task){
    if (err){
      console.log(err);
    }else{
      console.log(JSON.stringify(task));
      res.json(task);
    }
  });
});

// Defined get data(index or listing) route
taskRoutes.route('/').get(function (req, res) {
  Task.find(function(err, tasks){
  if(err){
    console.log(err);
  }
  else {
    console.log(tasks);
    res.json(tasks);
  }
  }).sort({_id:-1}).limit(5);
});

// Defined edit route
taskRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Task.findById(id, function (err, task){
      res.json(task);
  });
});

//  Defined update route
taskRoutes.route('/update/:id').post(function (req, res) {
    Task.findById(req.params.id, function(err, task) {
    if (!task)
      res.status(404).send("data is not found");
    else {
        task.task_id = req.body.task_id;
        task.task_name = req.body.task_name;

        task.save().then(task => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
taskRoutes.route('/delete/:id').get(function (req, res) {
    Task.findByIdAndRemove({_id: req.params.id}, function(err, task){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = taskRoutes;