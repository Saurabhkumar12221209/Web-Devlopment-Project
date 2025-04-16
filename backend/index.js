const express = require('express');
const bodyParser = require('body-parser');

const User = require('./model/user.model');
const Product = require('./model/product.model');
const Tag = require('./model/tag.model');
const Address = require('./model/address.model');
const AddToCart = require('./model/addToCart.model');
const UserAddress = require('./model/useraddress.model');
const Category = require('./model/category.model');
const ProductInventory = require('./model/productInventory.model');


const fileUpload = require('express-fileupload');
const path = require('path');


const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt
const app = express();
const port = 8000;
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');
const verifyCustomerToken = require('./verifyCustomerToken');
app.use(bodyParser.json()); // Parse JSON data from requests
app.use(cors({ origin: 'http://localhost:3000' }));
app.get('/users', async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.post('/users/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.createUser(name, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password } = req.body;
    const updatedUser = await User.updateUser(id, name, email, password);
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send(error.message);
  }
});


app.put('/users/name/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const updatedUser = await User.updateUserName(id, name);
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send(error.message);
  }
});


app.put('/users/email/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { email } = req.body;
    const updatedUser = await User.updateUserEmail(id, email);
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send(error.message);
  }
});

app.put('/users/password/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { oldPassword, newPassword } = req.body;
    const updatedUser = await User.updateUserPassword(id, oldPassword, newPassword);
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send(error.message);
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.deleteUser(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send(error.message);
  }
});


// Middleware for file upload
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));
// Route for handling file uploads
app.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;

    file.mv(path.join(__dirname, '/public/products/', file.name), err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: file.name, filePath: `/products/${file.name}` });
    });
});


app.get('/tags', async (req, res) => {
  try {
    const tags = await Tag.getAll();
    res.json(tags);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/addtocart', async (req, res) => {
  try {
    const addToCart = await AddToCart.getAll();
    res.json(addToCart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/address', async (req, res) => {
  try {
    const address = await Address.getAll();
    res.json(address);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/useraddress', async (req, res) => {
  try {
    const useraddress = await UserAddress.getAll();
    res.json(useraddress);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.json(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.get('/products', async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.get('/productInventory', async (req, res) => {
  try {
    const productInventory = await ProductInventory.getAll();
    res.json(productInventory);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) {
      res.status(404).send('Product not found');
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/productInventory/:id', async (req, res) => {
  try {
    const productInventory = await ProductInventory.getById(req.params.id);
    if (!productInventory) {
      res.status(404).send('productInventory not found');
    } else {
      res.json(productInventory);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/tags/:id', async (req, res) => {
  try {
    const tag = await Tag.getById(req.params.id);
    if (!tag) {
      res.status(404).send('Tag not found');
    } else {
      res.json(tag);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get('/addtocart/:id', async (req, res) => {
  try {
    const addToCart = await AddToCart.getById(req.params.id);
    if (!addToCart) {
      res.status(404).send('Add To Cart not found');
    } else {
      res.json(addToCart);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/useraddtocart/:id', async (req, res) => {
  try {
    const userAddToCart = await AddToCart.getByUserId(req.params.id);
    if (!userAddToCart) {
      res.status(404).send('Add To Cart not found');
    } else {
      res.json(userAddToCart);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/useraddress/:id', async (req, res) => {
  try {
    const useraddress = await UserAddress.getById(req.params.id);
    if (!useraddress) {
      res.status(404).send('User Address not found');
    } else {
      res.json(useraddress);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/address/:id', async (req, res) => {
  try {
    const address = await Address.getById(req.params.id);
    if (!address) {
      res.status(404).send('Address not found');
    } else {
      res.json(address);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/categories/:id', async (req, res) => {
  try {
    const category = await Category.getById(req.params.id);
    if (!category) {
      res.status(404).send('Category not found');
    } else {
      res.json(category);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const isAdmin = (req, res, next) => {
  // Check if the user exists in the request object (assuming it's set by your authentication middleware)
  if (req.user && req.user.user_role === 'ADMIN') {
    // User has admin role, proceed to the next middleware or route handler
    next();
  } else {
    // User does not have admin role, send 403 Forbidden response
    res.status(403).json({ message: 'Access denied. You must have admin privileges to perform this action.' });
  }
};
app.post('/products', verifyToken, async (req, res) => {
  try {
    // Retrieve the user object from the request
    const user = req.user;
    
    // Extract product data from the request body
    const { name, price, description, image, feature1, feature2, feature3, feature4, feature5,tagId,categoryId,inventory_id } = req.body;
    
    // Create the product using the createProduct method
    const newProduct = await Product.createProduct( name, price, description, image, feature1, feature2, feature3, feature4, feature5,tagId,categoryId,inventory_id);
    
    // Send a success response
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});


app.post('/address', verifyCustomerToken, async (req, res) => {
  try {
    // Retrieve the user object from the request
    const user = req.user;
    
    // Extract product data from the request body
    const { street_address, addressline1, addressline2, postalcode, city, state, country,userid } = req.body;
    
    // Create the product using the createProduct method
    const newAddress = await Address.createAddress( street_address, addressline1, addressline2, postalcode, city, state, country, userid);
    
    // Send a success response
    res.status(201).json(newAddress);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.post('/useraddress', verifyCustomerToken, async (req, res) => {
  try {
    // Retrieve the user object from the request
    const user = req.user;
    
    // Extract product data from the request body
    const { userId, addressId } = req.body;
    
    // Create the product using the createProduct method
    const newUserAddress = await UserAddress.createUserAddress( userId, addressId);
    
    // Send a success response
    res.status(201).json(newUserAddress);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});


app.post('/tags', verifyToken, async (req, res) => {
  try {
    // Retrieve the user object from the request
    const user = req.user;
    
    // Extract product data from the request body
    const { name, slug } = req.body;
    
    // Create the product using the createProduct method
    const newTag = await Tag.createTag( name, slug);
    
    // Send a success response
    res.status(201).json(newTag);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});



app.post('/addtocart', verifyCustomerToken, async (req, res) => {
  try {
    // Retrieve the user object from the request
    const user = req.user;
    
    // Extract product data from the request body
    const { user_id, product_id, quantity, added_at } = req.body;
    
    // Create the product using the createProduct method
    const newAddToCart = await AddToCart.createAddToCart( user_id, product_id, quantity, added_at);
    
    // Send a success response
    res.status(201).json(newAddToCart);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});


app.post('/productInventory', verifyToken, async (req, res) => {
  try {
    // Retrieve the user object from the request
    const user = req.user;
    
    // Extract product data from the request body
    const { quantity } = req.body;
    
    // Create the product using the createProduct method
    const newproductInventory = await ProductInventory.createProductQuantity( quantity);
    
    // Send a success response
    res.status(201).json(newproductInventory);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});




app.post('/categories', verifyToken, async (req, res) => {
  try {
    // Retrieve the user object from the request
    const user = req.user;
    
    // Extract product data from the request body
    const { name, slug } = req.body;
    
    // Create the product using the createProduct method
    const newCategory = await Category.createCategory( name, slug);
    
    // Send a success response
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});



app.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ userId: user.id, userRole: user.user_role }, 'st39NWy9sa45Xgf2', { expiresIn: '1h' });
    console.log(token);
    // Login successful, return user data and token
    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.put('/useraddtocart/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const {  quantity, added_at } = req.body;
    const updatedCart = await AddToCart.updateAddToCart( quantity, added_at);
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send(error.message);
  }
});


// Add route handlers for create, update, delete as needed

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
