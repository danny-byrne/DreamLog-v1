const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const eventRouter = require('./routes/event');
const userRouter = require('./routes/user');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;


mongoose.connect(uri, 
  { useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err)
);

app.use(cors());
app.use(express.json());

app.use('/events', eventRouter);
app.use('/users', userRouter)

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})