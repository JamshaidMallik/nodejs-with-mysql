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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`);
console.log('✅ Users table ready');

export default db;
