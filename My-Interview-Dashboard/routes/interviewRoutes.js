const express = require('express');
const interviewRoutes = express.Router();
let Interview = require('../models/interview.model.js');

interviewRoutes.route('/').get(function(req, res) {
    Interview.find(function(err, interviews) {
        if (err) {
            console.log(err);
        } else {
            console.log(JSON.stringify(interviews))
            res.json(interviews);
        }
    });
});

interviewRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Interview.findById(id, function(err, interview) {
        res.json(interview);
    });
});

interviewRoutes.route('/update/:id').post(function(req, res) {
    Interview.findById(req.params.id, function(err, interview) {
        if (!interview)
            res.status(404).send("data is not found");
        else
            interview.interview_company_name = req.body.interview_company_name;
            interview.interview_role = req.body.interview_role;
            interview.interview_company_location = req.body.interview_company_location;
            interview.interview_status = req.body.interview_status;
            interview.interview_date = req.body.interview_date;
            interview.save().then(interview => {
                res.json('Interview updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

interviewRoutes.route('/delete/:id').delete(function(req, res) {
    Interview.findByIdAndRemove(req.params.id, function(err, interview) {
        if (!interview)
            res.status(404).send("data is not found");
        else
            if (!err)
                res.json('Interview deleted!');
            else
                res.status(400).send("Update not possible");
    });
});

interviewRoutes.route('/addfeedback/:id').post(function(req, res) {
    Interview.findById(req.params.id, function(err, interview) {
        if (!interview)
            res.status(404).send("data is not found");
        else
            interview.interview_feedback.push( req.body );
            interview.save().then(interview => {
                res.json('Interview updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

interviewRoutes.route('/add').post(function(req, res) {
    let interview = new Interview(req.body);
    interview.save()
        .then(interview => {
            res.status(200).json({'interview': 'interview added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new interview failed');
        });
});


module.exports = interviewRoutes;