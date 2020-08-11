/**
 * @author changa
 */
const { sendPreparedStatementToPortalDB } = require('../utils/mariadb');
const { sendPreparedStatementToInfomart } = require('../utils/mssql');
const { promiseHandler, decodeError, responseSuccess } = require('../utils/common');

// var logger = require('../utils/logger')({ 
//   dirname: '', 
//   filename: '', 
//   sourcename: 'agent-login-summary.js' 
// });

const summaryLoginInfo = async () => {
    try {
  
      const mssqlQuery = `
      SELECT 
        S.TENANT_KEY, R.AGENT_LAST_NAME, B.GROUP_KEY, A.RESOURCE_KEY, R.AGENT_FIRST_NAME AS AGENT_NAME,
        CONVERT(VARCHAR(10), (DATEADD(S, S.START_TS + 9*3600, '1970-01-01')), 120) as LOGIN_DAY,
        CONVERT(VARCHAR(50), (DATEADD(S, MIN(S.START_TS) + 9*3600, '1970-01-01')), 20) as LOGIN_TIME,
        CONVERT(VARCHAR(50), (DATEADD(S, MAX(S.END_TS) + 9*3600, '1970-01-01')), 20) as LOGOUT_TIME

      FROM SM_RES_SESSION_FACT S, RESOURCE_ R, RESOURCE_GROUP_FACT_ A, GROUP_ B

      WHERE S.RESOURCE_KEY = R.RESOURCE_KEY
        AND A.GROUP_KEY = B.GROUP_KEY
        AND A.RESOURCE_KEY = R.RESOURCE_KEY
        AND (S.START_DATE_TIME_KEY between (SELECT DATE_TIME_KEY FROM DATE_TIME WHERE CAL_DATE=CONVERT(datetime, CONVERT(CHAR(10),dateadd(d,-1, GETDATE()),120)))
                                       AND (SELECT DATE_TIME_KEY FROM DATE_TIME WHERE CAL_DATE=CONVERT(datetime, CONVERT(CHAR(10), GETDATE(),120))))

      GROUP BY R. AGENT_FIRST_NAME, R.AGENT_LAST_NAME, S.TENANT_KEY, B.GROUP_KEY, A.RESOURCE_KEY, CONVERT(VARCHAR(10), (DATEADD(S, S.START_TS + 9*3600, '1970-01-01')), 120)
      ;
      `

  
      // logger.debug("[summaryLoginInfo] mssqlQuery: " + mssqlQuery);
      console.log("[summaryLoginInfo] mssqlQuery: " , mssqlQuery);
      const summaryResult = await sendPreparedStatementToInfomart(mssqlQuery);
      // logger.debug("rows: " + JSON.stringify(rows));
      // console.log(summaryResult);
      // console.log(Object.keys(summaryResult).length);
      // console.log(summaryResult[0]);
      // console.log(summaryResult[0].TENANT_KEY);

      for(var i=0; i<Object.keys(summaryResult).length; i++) {
          const row = `("`+ summaryResult[i].TENANT_KEY + `", "` 
          + summaryResult[i].AGENT_LAST_NAME + `", "` 
          + summaryResult[i].GROUP_KEY + `", "` 
          + summaryResult[i].RESOURCE_KEY + `", "` 
          + summaryResult[i].AGENT_NAME + `", "` 
          + summaryResult[i].LOGIN_DAY + `", "` 
          + summaryResult[i].LOGIN_TIME + `", "` 
          + summaryResult[i].LOGOUT_TIME + `")` ;

          const query = `
          INSERT INTO tb_login_summary (TENANT_KEY, SITE_CD, GROUP_KEY, RESOURCE_KEY, EMP_NM, LOGIN_DAY, START_TS, END_TS)
          VALUES ${row}
          ;
          `
          console.log("[summaryLoginInfo] mariadbQuery: ", query);
          const result = await sendPreparedStatementToPortalDB({ query });
          console.log(result);
      }
  
    } catch (error) {
      throw error;
    }
  
}




module.exports = {
    // logger,
    // find,
    // create,
    summaryLoginInfo
};