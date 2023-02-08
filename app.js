const { urlencoded } = require('express');
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound= require('./middleware/not-found');
const errorHandlingMiddleware = require('./middleware/error-handler')
//middleware

app.use(express.json());
app.use(express.static('./public'));
//routes

app.use('/api/v1/tasks', tasks);
app.use(notFound)
app.use(errorHandlingMiddleware)
//app.get('/api/v1/tasks') ---- get all the tasks
//app.post('/api/v1/tasks') -- create new task
//app.get('/api/v1/tasks/:id') --get single tasks
//app.patch('/api/v1/tasks/:id') --update task
// app.delete('/api/v1/tasks/:id') -- delete tasks

const port =process.env.PORT|| 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`listening to port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
