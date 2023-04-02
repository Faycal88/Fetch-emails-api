const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database_name'
});

connection.connect();

function updateProject(entry) {
  const {id, ...fieldsToUpdate} = entry;

  const sql = `UPDATE projects SET ${Object.keys(fieldsToUpdate).map((key) => {
    return fieldsToUpdate[key] ? `${key} = "${fieldsToUpdate[key]}"` : '';
  }).filter(Boolean).join(',')} WHERE id = ${id}`;

  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = { updateProject };