require( 'dotenv' ).config()

var mariaDB = require( './config' ).get( process.env.NODE_ENV ).mariaDB;
var mssql = require( './config' ).get( process.env.NODE_ENV ).mssql;


//MariaDB
module.exports.mariaDB = mariaDB;

//MS-sql
module.exports.mssql = mssql;

