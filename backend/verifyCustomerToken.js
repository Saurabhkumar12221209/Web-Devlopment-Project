const jwt = require('jsonwebtoken');

const verifyCustomerToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'st39NWy9sa45Xgf2', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded; // Attach the decoded user object to the request
console.log(decoded);
    // Check if the user has the admin role
    if (decoded.userRole !== 'CUSTOMER') {
      return res.status(403).json({ message: 'Access denied. You must have customer access to add something.' });
    }

    next();
  });
};

module.exports = verifyCustomerToken;
