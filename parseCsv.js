import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import db from './config/db.js';
import csvMappingConfig from './csvMappingConfig.js';

const csvFileName = process.argv[2];
if (!csvFileName) {
    console.error("❌ Please provide a CSV filename, e.g. node parseCsv.js customers.csv");
    process.exit(1);
}

const mapping = csvMappingConfig[csvFileName];
if (!mapping) {
    console.error(`❌ No mapping config found for file: ${csvFileName}`);
    process.exit(1);
}

const filePath = path.join('csvfiles', csvFileName);
const rows = [];

fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
        console.log("📄 Parsed row:", row);
        rows.push(row);
    })
    .on('end', async () => {
        console.log(`✅ Parsed total rows: ${rows.length}`);

        for (const [index, row] of rows.entries()) {
            try {
                console.log(`🔎 Processing row ${index + 1}/${rows.length}`);
                const values = mapping.csvKeys.map((key) => row[key]);
                const placeholders = mapping.columns.map(() => '?').join(', ');
                const sql = `INSERT INTO ${mapping.table} (${mapping.columns.join(', ')}) VALUES (${placeholders})`;
                const [result] = await db.query(sql, values);
                console.log(`✅ Inserted row ${index + 1} into table '${mapping.table}' (id: ${result.insertId})`);
            } catch (err) {
                console.error(`❌ Failed to insert row ${index + 1}:`, err.message);
            }
        }
        console.log(`🎉 Finished importing ${rows.length} rows into table '${mapping.table}' from ${csvFileName}`);
        process.exit(0);
    })
    .on('error', (err) => {
        console.error("❌ Error reading CSV:", err);
        process.exit(1);
    });
