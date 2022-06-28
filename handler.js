'use strict';
const mysql = require('mysql');
const config = require('./config');

const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

module.exports.hello = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = await getData();
  const result = {
    statusCode: 200,
    body: JSON.stringify(data),
  };
  return result;
};

const getData = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      // Use the connection
      connection.query(
        'SELECT id, name, email, createdAt FROM USERS',
        function (error, results) {
          // Handle error after the release.
          if (error) callback(error);
          resolve(results);
        }
      );
    });
  });
};
