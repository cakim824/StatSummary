require('dotenv').config();

const cronJob = require('cron').CronJob;
const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');

const app = express();
const { summaryLoginInfo } = require('./models/agent-login-summary');
// var logger = require('./utils/logger')({ 
//     dirname: '', 
//     filename: '', 
//     sourcename: 'agent-login-summary.js' 
//   });

var PORT = process.env.PORT || 30001;
var mode = process.env.NODE_ENV;



// announce wrapup ready job
const job1 = new cronJob('00 03 * * *', function () {
    const d = new Date();

    // logger.debug('[job1]:', d.toTimeString());
    // console.log("[job1]: ", d.toTimeString());
    console.log("[job1]: ", d.toDateString(), '//', d.toTimeString());

    summaryStat();
});

job1.start();

const summaryStat = async () => {
    try {
        // get current alarm data from alarm table
        var result = await summaryLoginInfo();
        // logger.debug("[summaryStat] completed.: " + JSON.stringify(result));
        console.log("[summaryStat] completed: " + JSON.stringify(result));
    } catch (error) {
        // logger.error(error);
        console.error(error);
        throw error;
    }
};



module.exports = app;