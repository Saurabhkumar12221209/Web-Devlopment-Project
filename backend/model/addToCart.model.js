const pool = require('../config/db'); // Assuming db.js is in the parent directory

class AddToCart {
    constructor(id, user_id, product_id, quantity, added_at) {
        this.id = id;
        this.user_id = user_id;
        this.product_id = product_id;
        this.quantity = quantity;
        this.added_at = added_at;
    }

    static async getAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM addtocart');
            return rows.map(row => new AddToCart(row.id, row.user_id, row.product_id, row.quantity, row.added_at));
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM addtocart WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null;
            }
            return new AddToCart(rows[0].id, rows[0].user_id, rows[0].product_id, rows[0].quantity, rows[0].added_at);
        } catch (error) {
            throw error;
        }
    }


    static async getByUserId(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM addtocart WHERE user_id = ?', [id]);
            if (rows.length === 0) {
                return []; // Return an empty array if no cart items found
            }
            // Map each row to an AddToCart object
            return rows.map(row => new AddToCart(row.id, row.user_id, row.product_id, row.quantity, row.added_at));
        } catch (error) {
            throw error;
        }
    }


    static async createAddToCart(user_id, product_id, quantity, added_at) {
        try {
            const [results] = await pool.query(
                'INSERT INTO addtocart (user_id, product_id, quantity, added_at) VALUES (?, ?, ?, ?)',
                [user_id, product_id, quantity, added_at]
            );

            if (results.affectedRows === 1) {
                return new AddToCart(results.insertId, user_id, product_id, quantity, added_at);
            } else {
                throw new Error('Failed to create add to cart');
            }
        } catch (error) {
            console.error(error);
            throw error; // Re-throw for proper error handling
        }
    }

    static async updateAddToCart(cart_id, quantity, added_at) {
        try {
            const [results] = await pool.query(
                'UPDATE addtocart SET quantity = ?, added_at = ? WHERE cart_id = ?',
                [quantity, added_at, cart_id]
            );

            if (results.affectedRows === 1) {
                // If the update was successful, return the updated cart
                return new AddToCart(cart_id, user_id, product_id, quantity, added_at);
            } else {
                throw new Error('Failed to update add to cart');
            }
        } catch (error) {
            console.error(error);
            throw error; // Re-throw for proper error handling
        }
    }

}

module.exports = AddToCart;
