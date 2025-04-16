const pool = require('../config/db'); // Assuming db.js is in the parent directory

class Address {
    constructor(id, street_address, addressline1, addressline2, postalcode, city, state, country, userid) {
        this.id = id;
        this.street_address = street_address;
        this.addressline1 = addressline1;
        this.addressline2 = addressline2;
        this.postalcode = postalcode;
        this.city = city;
        this.state = state;
        this.country = country;
        this.userid=userid;
    }

    static async getAll() {
        try {
            const [rows] = await pool.query('SELECT * FROM address');
            return rows.map(row => new Address(row.id, row.street_address, row.addressline1, row.addressline2, row.postalcode, row.city, row.state, row.country,row.userid));
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM address WHERE userid = ?', [id]);
            if (rows.length === 0) {
                return []; // Return an empty array if no addresses found
            }
            
            // Map the rows to Address objects and return the array
            return rows.map(row => new Address(row.id, row.street_address, row.addressline1, row.addressline2, row.postalcode, row.city, row.state, row.country, row.userid));
        } catch (error) {
            throw error;
        }
    }
    

    static async createAddress(street_address, addressline1, addressline2, postalcode, city, state, country, userid) {
        try {
            const [results] = await pool.query(
                'INSERT INTO address (street_address, addressline1, addressline2, postalcode, city, state, country, userid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [street_address, addressline1, addressline2, postalcode, city, state, country, userid]
            );

            if (results.affectedRows === 1) {
                const newAddress = new Address(results.insertId, street_address, addressline1, addressline2, postalcode, city, state, country,userid);
               
                return newAddress;
            } else {
                throw new Error('Failed to create address');
            }
        } catch (error) {
            console.error(error);
            throw error; // Re-throw for proper error handling
        }
    }
}

module.exports = Address;
