const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userHandler = require('./modules/user/user.controller');

const app = express();
app.use(express.json());

app.use(cors());
mongoose.connect('mongodb+srv://rayhanulamint2:Mp7i9UGGkbBLhmmn@cluster0.i20gg40.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });


app.use('/user', userHandler);

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Handle login logic
  res.json({ message: 'Login successful' });
});

app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  // Handle signup logic
  res.json({ message: 'Signup successful' });
});

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
module.exports = app;