const express = require('express');
const { users } = require('../utils/data');
const { generateToken } = require('../config/jwt');

const router = express.Router();

router.post('/', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const token = generateToken(user);
  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      fullname: user.fullname
    }
  });
});

module.exports = router;