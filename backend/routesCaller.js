const app = require('./server'); // Import the app object from server.js

// Define additional routes or invoke existing routes if needed
// For example:

// Or you can invoke existing routes
app.get('/users', (req, res) => {
    // Invoke the existing '/users' route defined in server.js
    res.send('Calling /users route from another file');
});

// You can continue defining more routes as needed

// Finally, listen to a port if required
// For example:
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
