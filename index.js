const
	express = require('express'),
	app = express(),
	ejsLayouts = require('express-ejs-layouts'),
	mongoose = require('mongoose'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	index = require('./routes/index'),
	members = require('./routes/members'),
	flash = require('express-flash-notification')



const
	PORT = process.env.PORT || 3000,
	mongoConnectionString = process.env.MONGODB_URI || 'mongodb://localhost/flashcrud'

// mongoose connection
mongoose.connect(mongoConnectionString, (err) => {
	console.log(err || "Connected to MongoDB.")
})

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
}))


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



app.use(flash(app, flashNotificationOptions));

// middleware
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true})) // interpret any form data coming in
app.use(bodyParser.json()) // interpret any json data coming in (eg: using ajax requests)
app.use(flash())
app.set('view engine', 'ejs')
app.use(ejsLayouts)

app.use('/', index);
app.use('/members', members);

app.listen(PORT, (err) => {
	console.log(err || `Server running on ${PORT}`)
})
