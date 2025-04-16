const pool = require('../config/db'); // Assuming db.js is in the parent directory
const bcrypt = require('bcrypt'); // Import bcrypt

class Product{
    constructor(id,name,price,description,image,feature1,feature2,feature3,feature4,feature5,tag_id,category_id,inventory_id){
        this.id=id; 
        this.name=name;
         this.price=price;
         this.description=description;
         this.image=image;
         this.feature1=feature1;
         this.feature2=feature2;
         this.feature3=feature3;
         this.feature4=feature4;
         this.feature5=feature5;
         this.tag_id=tag_id;
         this.category_id=category_id;
         this.inventory_id=inventory_id;
    }

    
    static async getAll() {
        try {
          const [rows] = await pool.query('SELECT * FROM product');
          return rows.map(row => new Product(row.id, row.name, row.price,row.description,row.image,row.feature1,row.feature2,row.feature3,row.feature4,row.feature5,row.tag_id,row.category_id,row.inventory_id));
        } catch (error) {
          throw error;
        }
      }
    
      static async getById(id) {
        try {
          const [rows] = await pool.query('SELECT * FROM product WHERE id = ?', [id]);
          if (rows.length === 0) {
            return null;
          }
          return   new Product(rows[0].id, rows[0].name, rows[0].price,rows[0].description,rows[0].image,rows[0].feature1,rows[0].feature2,rows[0].feature3,rows[0].feature4,rows[0].feature5,rows[0].tag_id,rows[0].category_id,rows[0].inventory_id);
        } catch (error) {
          throw error;
        }
      }
      
      static   async createProduct(name,price,description,image,feature1,feature2,feature3,feature4,feature5,tag_id,category_id,inventory_id) {
        try {
          // Use prepared statements to prevent SQL injection
  
   
          const [results] = await pool.query(
            'INSERT INTO product (name,price,description,image,feature1,feature2,feature3,feature4,feature5,tag_id,category_id,inventory_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name,price,description,image,feature1,feature2,feature3,feature4,feature5,tag_id,category_id,inventory_id]
          );
      
          if (results.affectedRows === 1) {
            const newProduct = new Product(results.insertId,name,price,description,image,feature1,feature2,feature3,feature4,feature5,tag_id,category_id,inventory_id);
            return newProduct;
          } else {
            throw new Error('Failed to create product');
          }
        } catch (error) {
          console.error(error);
          throw error; // Re-throw for proper error handling
        }
      }
}

module.exports = Product;