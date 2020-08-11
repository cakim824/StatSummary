require('dotenv').config();

const mariadb = require("mysql2/promise");
const config = require("../config/dbInfo.js");

const c_cloud_config = config.mariaDB;


const getConnection = db_config => mariadb.createConnection(db_config);

// const getConnection = db_config => new mariadb.ConnectionPool(db_config).connect();
// const connectionClose = () => mariadb.close();

const getPreparedStatement = db_connection => new mssql.PreparedStatement(db_connection);

const executePreparedStatement = async (prepared_statement, query, parameters = {}) => {
  try {
    await prepared_statement.prepare(query);
    const { rows } = await prepared_statement.execute(parameters);
    await prepared_statement.unprepare();
    return rows;
  } catch (error) {
    throw error;
  }
};



const sendPreparedStatementTo = db_config => async ({ query, params = [] }) => {
  console.log("query: " + query);
  console.log("params: " + JSON.stringify(params));
  let connection = '';
  try {
    connection = await getConnection(db_config);
    const [rows] = await connection.execute(query, params);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection && connection.end();
  }
};

const sendPreparedStatementToPortalDB = sendPreparedStatementTo(c_cloud_config);


module.exports = {
  getConnection,
  sendPreparedStatementToPortalDB
};
