const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const index = require('./routes/index');
const members = require('./routes/members');
const flash = require('express-flash-notification');



// DB Config
const db = require('./config/database');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose
  .connect(db.mongoURI, { useNewUrlParser: true, useFindAndModify : false })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));





// Session Middleware REQUIRED
app.use(session({
  name: 'whatthefuck',
  secret: 'hahahahahahahhaa',
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    expires: new Date('Tuesday, 22 September 2066')
  },
}));



//Setting Flash noti options
const flashNotificationOptions = {
  beforeSingleRender: function(item, callback) {
    if (item.type) {
      switch(item.type) {
        case 'S':
          item.type = 'SUCCESS!';
          item.alertClass = 'alert-success';
          break;
        case 'U':
          item.type = 'UPDATED!';
          item.alertClass = 'alert-info';
          break;
        case 'E':
          item.type = 'FAILED!';
          item.alertClass = 'alert-danger';
          break;
      }
    }
    callback(null, item);
  }
};


//Declaring
app.use(flash(app, flashNotificationOptions));

// middleware
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true})) // interpret any form data coming in
app.use(bodyParser.json()) // interpret any json data coming in (eg: using ajax requests)
app.use(flash())
app.set('view engine', 'ejs')
app.use(ejsLayouts)



// Index Route
app.get('/', (req, res) => {
  res.render('index');
});



//set home page
app.use('/', index);


//set member page
app.use('/members', members);

//assing local or global port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
