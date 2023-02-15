//Getting Mongoose Library
const mongoose = require('mongoose');
// Gettng Dot Env
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
// Getting App module
const app = require('./app');

//Configuring DB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// Connecting to Database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModifyIndex: false,
  })
  .then(() => {
    console.log('DB Sucessfully Connected 🟢');
  });

//Defining Port
const port = process.env.PORT || 3000;

//Starting server
const server = app.listen(port, () => {
  console.log('listening on port', port);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
