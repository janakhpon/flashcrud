
var mongoose = require("mongoose");
var Member = require("../models/Member");



var memberController = {};

// Show list ofmembers
memberController.list = function(req, res) {
  Member.find({}).exec(function (err, members) {
    if (err) {
      console.log("Error:", err);
       req.flash('F', 'FAILED TO FETCH DATA', '/members');

    }
    else {
      res.render("../views/show", {members: members});

    }
  });
};


// Create new employee
memberController.create = function(req, res) {
  res.render("../views/add");
};

// Save new employee
memberController.save = function(req, res) {
  var member = new Member(req.body);

  member.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/add");
    } else {
      req.flash('S', 'ADDED NEW USER SUCCESSFULLY', '/members/create');

    }
  });
};

// Edit an employee
memberController.edit = function(req, res) {
 Member.findOne({_id: req.params.id}).exec(function (err, member) {
  if (err) {
    console.log("Error:", err);
  }
  else {

    res.render("../views/edit", {member: member});
  }
});
};

// Update an employee
memberController.update = function(req, res) {
  Member.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, email: req.body.email, rank: req.body.address}}, { new: true }, function (err, member) {
    if (err) {
      console.log(err);
      res.render("../views/edit", {member: req.body});
      req.flash('F', 'FAILED TO UPDATE USER DATA', '/members/edit');
    }else{
      req.flash('S', 'UPDATED USER DATA SUCCESSFULLY', '/members');
     
    }
    
  });
};

// Delete an employee
memberController.delete = function(req, res) {
 Member.remove({_id: req.params.id}, function(err) {
  if(err) {
    console.log(err);
  }
  else {
    console.log("Employee deleted!");
    req.flash('S', 'DELETED USER DATA SUCCESSFULLY', '/members');

  }
});
};

module.exports = memberController;
