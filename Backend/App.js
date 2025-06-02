const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());

app.use(cors());
// mongoose.connect('mongodb://localhost:27017/mydatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Handle login logic
  res.json({ message: 'Login successful' });
});

app.post('/api/signup', (req, res) => {
  const { username, email, password } = req.body;
  // Handle signup logic
  res.json({ message: 'Signup successful' });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
module.exports = app;