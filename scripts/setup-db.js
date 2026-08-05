const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Read .env.local
const envFile = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
const directUrlMatch = envFile.match(/DIRECT_URL="([^"]+)"/);
const databaseUrlMatch = envFile.match(/DATABASE_URL="([^"]+)"/);

const connectionString = (directUrlMatch && directUrlMatch[1]) || (databaseUrlMatch && databaseUrlMatch[1]);

if (!connectionString) {
  console.error("No database connection string found in .env.local");
  process.exit(1);
}

console.log("Connecting to PostgreSQL...");

const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to PostgreSQL!");

    const sqlPath = path.join(__dirname, '..', 'supabase_schema.sql');
    const sqlScript = fs.readFileSync(sqlPath, 'utf8');

    console.log("Executing SQL schema...");
    await client.query(sqlScript);
    console.log("SQL Schema & Storage Bucket setup completed successfully!");
  } catch (err) {
    console.error("Error executing database setup:", err);
  } finally {
    await client.end();
  }
}

run();
