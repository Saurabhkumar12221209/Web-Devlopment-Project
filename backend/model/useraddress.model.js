const pool = require('../config/db'); // Assuming db.js is in the parent directory

class UserAddress {
    constructor(id, userId, addressId) {
        this.id = id;
        this.userId = userId;
        this.addressId = addressId;
    }

    static async getAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM user_address');
            return rows.map(row => new UserAddress(row.id, row.user_id, row.address_id));
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM user_address WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null;
            }
            return new UserAddress(rows[0].id, rows[0].user_id, rows[0].address_id);
        } catch (error) {
            throw error;
        }
    }

    static async createUserAddress(userId, addressId) {
        try {
            const [results] = await pool.query(
                'INSERT INTO user_address (user_id, address_id) VALUES (?, ?)',
                [userId, addressId]
            );

            if (results.affectedRows === 1) {
                const newUserAddress = new UserAddress(results.insertId, userId, addressId);
                return newUserAddress;
            } else {
                throw new Error('Failed to create user address');
            }
        } catch (error) {
            console.error(error);
            throw error; // Re-throw for proper error handling
        }
    }
}

module.exports = UserAddress;
