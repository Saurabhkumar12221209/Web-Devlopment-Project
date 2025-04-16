const pool = require('../config/db'); // Assuming db.js is in the parent directory
const bcrypt = require('bcrypt'); // Import bcrypt

class ProductInventory{
    constructor(id,quantity){
        this.id=id;
        this.quantity=quantity;
    }
    static async getAll() {
        try {
          const [rows] = await pool.query('SELECT * FROM product_inventory');
          return rows.map(row => new ProductInventory(row.id, row.quantity));
        } catch (error) {
          throw error;
        }
      }
    
      static async getById(id) {
        try {
          const [rows] = await pool.query('SELECT * FROM product_inventory WHERE id = ?', [id]);
          if (rows.length === 0) {
            return null;
          }
          return  new ProductInventory(rows[0].id, rows[0].quantity);
        } catch (error) {
          throw error;
        }
      }
      
      static   async createProductQuantity(quantity) {
        try {
          // Use prepared statements to prevent SQL injection
  
   
          const [results] = await pool.query(
            'INSERT INTO product_inventory (quantity) VALUES (?)',
            [quantity]
          );
      
          if (results.affectedRows === 1) {
            const newProductInventory = new ProductInventory(results.insertId,quantity);
            return newProductInventory;
          } else {
            throw new Error('Failed to create product inventory');
          }
        } catch (error) {
          console.error(error);
          throw error; // Re-throw for proper error handling
        }
      }
}

module.exports=ProductInventory;