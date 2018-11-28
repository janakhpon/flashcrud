var mongoose = require('mongoose');

var MemberSchema = new mongoose.Schema({
  name: String,
  email: String,
  address:String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Member', MemberSchema);
