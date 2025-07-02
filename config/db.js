import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jamshaid143#",
  database: "mysql_db"
});

console.log('✅ Connected to MySQL');

// create users table if it doesn't exist
await db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_image VARCHAR(255) DEFAULT NULL,
    bio TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`);
console.log('✅ Users table ready');

await db.query(`
  CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) DEFAULT NULL,
    user_id INT NOT NULL,
    description TEXT DEFAULT NULL,
    image VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`);
console.log('✅ posts table ready');

await db.query(`
CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    customerId VARCHAR(255) NOT NULL, 
    firstName VARCHAR(255) NOT NULL, 
    lastName VARCHAR(255) NOT NULL, 
    company VARCHAR(255) NOT NULL, 
    city VARCHAR(255) NOT NULL, 
    country VARCHAR(255) NOT NULL, 
    phone1 VARCHAR(255) NOT NULL, 
    phone2 VARCHAR(255) DEFAULT NULL, 
    email VARCHAR(255) NOT NULL UNIQUE, 
    subscriptionDate DATE NOT NULL, 
    website VARCHAR(255) NOT NULL
      )
  `);
console.log('✅ Customers table ready');

await db.query(`
  CREATE TABLE IF NOT EXISTS peoples (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    sex VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255) NOT NULL,
    dateOfBirth DATE DEFAULT NULL,
    jobTitle VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`);
console.log('✅ peoples table ready');


export default db;
