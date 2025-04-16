const { password } = require('pg/lib/defaults');
const pool = require('../config/db'); // Assuming db.js is in the parent directory
const bcrypt = require('bcrypt'); // Import bcrypt
class User {
  constructor(id, name, email, password, user_role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.user_role = user_role;
  }

  static async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM users');
      return rows.map(row => new User(row.id, row.name, row.email));
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      if (rows.length === 0) {
        return null;
      }
      return new User(rows[0].id, rows[0].name, rows[0].email);
    } catch (error) {
      throw error;
    }
  }

  static   async createUser(name, email , password) {
     try {
       // Use prepared statements to prevent SQL injection
       const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash password

       const [results] = await pool.query(
         'INSERT INTO users (name, email, password, user_role) VALUES (?, ?, ?, ?)',
         [name, email, hashedPassword, 'CUSTOMER']
       );
   
       if (results.affectedRows === 1) {
         const newUser = new User(results.insertId, name, email, hashedPassword);
         return newUser;
       } else {
         throw new Error('Failed to create user');
       }
     } catch (error) {
       console.error(error);
       throw error; // Re-throw for proper error handling
     }
   }

   static async getUserByEmail(email) {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return null; // No user found with this email
    }
    const user = rows[0];
    return new User(user.id, user.name, user.email, user.password, user.user_role);
  } catch (error) {
    console.error(error);
    throw error; // Re-throw for proper error handling
  }
}

    static   async updateUser(id, name, email, password) {
      try {
        // Use prepared statements to prevent SQL injection
        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash password
        const [results] = await pool.query(
          'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
          [name, email, hashedPassword, id]
        );
    
        if (results.affectedRows === 0) {
          throw new Error('User not found or update failed');
        } else {
            return new User(id, name, email, hashedPassword);
        }
      } catch (error) {
        console.error(error);
        throw error; // Re-throw for proper error handling
      }
    }



   //This name method will be implemented in our ecommerce website. 
    static   async updateUserName(id, name) {
      try {
        // Use prepared statements to prevent SQL injection
        const [results] = await pool.query(
          'UPDATE users SET name = ? WHERE id = ?',
          [name, id]
        );
    
        if (results.affectedRows === 0) {
          throw new Error('User not found or update failed');
        } else {
          const updatedUser = new User(id, name);
          return updatedUser;
        }
      } catch (error) {
        console.error(error);
        throw error; // Re-throw for proper error handling
      }
    }
//This email method will not be implemented in our ecommerce website.
    static   async updateUserEmail(id, email) {
      try {
        // Use prepared statements to prevent SQL injection
        const [results] = await pool.query(
          'UPDATE users SET email = ? WHERE id = ?',
          [email, id]
        );
    
        if (results.affectedRows === 0) {
          throw new Error('User not found or update failed');
        } else {
          const updatedUser = new User(id, email);
          return updatedUser;
        }
      } catch (error) {
        console.error(error);
        throw error; // Re-throw for proper error handling
      }
    }

//This password will be implemented in our ecommerce website.
    static async updateUserPassword(id, oldPassword, newPassword) {
      try {
        // Retrieve existing user data
        const [existingUser] = await pool.query(
          'SELECT password FROM users WHERE id = ?',
          [id]
        );
   
       
    const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Validate old password
        const isPasswordValid = await bcrypt.compare(oldPassword, [existingUser][0][0]['password']);
        if (!isPasswordValid) {
          throw new Error('Invalid old password');
        }
    
        // Hash the new password
        
    
        // Update the password in the database
        const [results] = await pool.query(
          'UPDATE users SET password = ? WHERE id = ?',
          [hashedNewPassword, id]
        );
    
        if (results.affectedRows === 0) {
          throw new Error('Update failed');
        }
    
        return { message: 'Password updated successfully' };
      } catch (error) {
        console.error(error);
        throw error; // Re-throw for proper error handling
      }
    }
    



      static async deleteUser(id) {
     try {
       // Use prepared statements to prevent SQL injection
       const [results] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
   
       if (results.affectedRows === 0) {
         throw new Error('User not found or delete failed');
       } else {
         return { message: `User with ID ${id} deleted successfully` };
       }
     } catch (error) {
       console.error(error);
       throw error; // Re-throw for proper error handling
     }
   }

  // Add methods for create, update, delete as needed
}

module.exports = User;