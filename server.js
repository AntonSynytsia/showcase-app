const express = require('express');
const session = require('express-session');
// const cookieParser = require('cookie-parser');
const sequelize = require('./connect');

const app = express();
const PORT = 5000;
let server = null;

function cleanup() {
  sequelize.close().then(() => {
    console.log('closed');
    if (server) {
      server.close();
      process.exit();
    } else {
      process.exit();
    }
  });
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Add JSON body-parser middleware
app.use(express.json());
// app.use(cookieParser());

// Add the express session middleware
// This adds req.session to your routes
//app.set('trust proxy', 1);
app.use(
  session({
    secret: 'arctic_paradise',
    resave: true,
    saveUninitialized: true,
  })
);

//const dir = path.join(__dirname, 'public');
//app.use(express.static(dir));

// Add sequelize connection as middleware
// This adds req.sequelize to your routes
app.use(function(req, res, next) {
  req.sequelize = sequelize;
  next();
});

// Add page and API routes
app.use('/api/users', require('./routes/api/users'));
//app.use('/', require('./routes/pages')); // important to be last since utilizes wildcard

sequelize.sync().then(() => {
  server = app.listen(PORT, 'localhost', () => {
    console.log(`Listening on port ${PORT}!`);
  });
});
