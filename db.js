const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

// Open the SQLite database
async function openDB() {
  return open({
    filename: './weather.db',
    driver: sqlite3.Database
  });
}

// Run a query (for insert, update, delete)
async function run(sql, params = []) {
  const db = await openDB();
  return db.run(sql, params);
}

// Fetch multiple rows (for select queries)
async function all(sql, params = []) {
  const db = await openDB();
  return db.all(sql, params);
}

// Export database functions
module.exports = {
  run,
  all
};
