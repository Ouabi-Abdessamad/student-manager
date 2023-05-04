const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const Student = require('../models/studentModal');
const ObjectId = require('mongoose').Types.ObjectId;

router.get('/', (req, res)=>{
    Student.find((err, students)=>{
        if(!err){
            res.send(students);
        }else{
            console.log('Error in Retrieving students : ' + JSON.stringify(err, undefined, 2));
        }
    })
})

router.post('/save', (req, res)=>{
    let {name, email, address, age} = req.body;
    const student = new Student({
        name,
        email,
        address, 
        age
    })
    student.save((err, student)=>{
        if(!err){
            res.send(student);
        }
        else{
            console.log('Error in Saving student : ' + JSON.stringify(err, undefined, 2));
        }
    });
})

router.get('/:id', (req, res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send('Not Found');
    }
    Student.findById(req.params.id, (err, student)=>{
        if(!err){
            res.send(student);
        }
        else{
            console.log('Error in Saving student : ' + JSON.stringify(err, undefined, 2));
        }
    })
})

router.put('/update/:id', (req, res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send('Not Found');
    }
    Student.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, student)=>{
        if(!err){
            res.send(student);
        }
        else{
            console.log('Error in Updating student : ' + JSON.stringify(err, undefined, 2));
        }
    })
})

router.delete('/delete/:id', (req, res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send('Not Found');
    }
    Student.findByIdAndRemove(req.params.id, (err, student)=>{
        if(!err){
            res.json({
                id:student._id,
                message:"Student removed successfully"
            });
        }
        else{
            console.log('Error in Removing student : ' + JSON.stringify(err, undefined, 2));
        }
    })
})

module.exports = router;