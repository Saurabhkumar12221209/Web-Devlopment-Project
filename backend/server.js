const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();       // Load .env variables
connectDB();           // Connect to MongoDB

const app = express();
app.use(express.json());  // Parse incoming JSON
 
// Define routes
app.use('/api/products', productRoutes);

// Handle 404 and errors
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
