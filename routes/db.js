var express = require('express');
var router = express.Router();
var sql = require('mssql');


const dbConfig = {
  user: "thomja",
  password: "Bestseller2!",
  server: "jt-express-test.database.windows.net",
  database: "jt-express-test",
  port: 1433,
  options: {
    encrypt: true
  }
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a db resource');
  var conn = new sql.ConnectionPool(dbConfig);

  conn.connect()
  // Successfull connection
  .then(function () {

    // Create request instance, passing in connection instance
    var req = new sql.Request(conn);

    // Call mssql's query method passing in params
    req.query("SELECT * FROM [SalesLT].[Customer]")
    .then(function (recordset) {
      console.log(recordset);
      res.send(recordset);
      conn.close();
    })
    // Handle sql statement execution errors
    .catch(function (err) {
      console.log("SQL statement error: " + err);
      conn.close();
    })

  })
  // Handle connection errors
  .catch(function (err) {
    console.log("SQL Connection error: " + err);
    conn.close();
  });

});

module.exports = router;