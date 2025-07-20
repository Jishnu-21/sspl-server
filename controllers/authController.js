const jwt = require('jsonwebtoken');

const ADMIN_USER = {
  username: 'admin',
  password: 'password123' // Change this in production
};

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid credentials' });
}; 