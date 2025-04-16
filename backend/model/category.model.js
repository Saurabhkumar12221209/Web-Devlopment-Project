const pool = require('../config/db'); // Assuming db.js is in the parent directory
const bcrypt = require('bcrypt'); // Import bcrypt

class Category{
    constructor(id,name,slug){
        this.id=id;
        this.name=name;
        this.slug=slug;
    }
    static async getAll() {
        try {
          const [rows] = await pool.query('SELECT * FROM categories');
          return rows.map(row => new Category(row.id, row.name, row.slug));
        } catch (error) {
          throw error;
        }
      }
    
      static async getById(id) {
        try {
          const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
          if (rows.length === 0) {
            return null;
          }
          return  new Category(rows[0].id, rows[0].name, rows[0].slug);
        } catch (error) {
          throw error;
        }
      }
      
      static   async createCategory(name,slug) {
        try {
          // Use prepared statements to prevent SQL injection
  
   
          const [results] = await pool.query(
            'INSERT INTO categories (name,slug) VALUES (?, ?)',
            [name,slug]
          );
      
          if (results.affectedRows === 1) {
            const newCategory = new Category(results.insertId,name,slug);
            return newCategory;
          } else {
            throw new Error('Failed to create category');
          }
        } catch (error) {
          console.error(error);
          throw error; // Re-throw for proper error handling
        }
      }
}

module.exports = Category;