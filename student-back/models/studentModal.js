const mongoose = require('mongoose');

const Student = mongoose.model('Student', {
    name:{type:String},
    email:{type:String},
    address:{type:String},
    age:{type:Number}
});

module.exports = Student;