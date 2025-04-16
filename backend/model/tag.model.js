const pool = require('../config/db'); // Assuming db.js is in the parent directory
const bcrypt = require('bcrypt'); // Import bcrypt

class Tag{
    constructor(id,name,slug){
        this.id=id;
        this.name=name;
        this.slug=slug;
    }
    static async getAll() {
        try {
          const [rows] = await pool.query('SELECT * FROM tags');
          return rows.map(row => new Tag(row.id, row.name, row.slug));
        } catch (error) {
          throw error;
        }
      }
    
      static async getById(id) {
        try {
          const [rows] = await pool.query('SELECT * FROM tags WHERE id = ?', [id]);
          if (rows.length === 0) {
            return null;
          }
          return  new Tag(rows[0].id, rows[0].name, rows[0].slug);
        } catch (error) {
          throw error;
        }
      }
      
      static   async createTag(name,slug) {
        try {
          // Use prepared statements to prevent SQL injection
  
   
          const [results] = await pool.query(
            'INSERT INTO tags (name,slug) VALUES (?, ?)',
            [name,slug]
          );
      
          if (results.affectedRows === 1) {
            const newTag = new Tag(results.insertId,name,slug);
            return newTag;
          } else {
            throw new Error('Failed to create tag');
          }
        } catch (error) {
          console.error(error);
          throw error; // Re-throw for proper error handling
        }
      }
}

module.exports=Tag;