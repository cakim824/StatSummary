require('dotenv').config();
const dayjs = require('dayjs');
const {
  forEach,
  values,
  split,
  pipe,
  head,
  tail,
  last,
} = require('ramda');
const path = require('path');
const {
  Logger
} = require('./logger')

const batchStates = {
  STARTED: 'STARTED',
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED'
};

const promiseHandler = promise =>
  promise
    .then(data => ({
      data,
      err: null
    }))
    .catch(err => ({
      data: null,
      err
    }));

const decodeError = error =>
  `error.name:${error.name}|error.message:${error.message}`;

const responseError = (errorCode, errorMsg) => ({
  success: false,
  errorCode,
  errorMsg
});

const responseSuccess = rows => ({
  success: true,
  result: rows
});

const handleResponse = response => (response.success ? response.result : Promise.reject(new Error('문제 발생')));

const getFilename = fileFullpath => path.basename(fileFullpath);

const createLogger = __filename => {
  const filename = getFilename(__filename);
  return Logger(filename);
};

const splitDateTime = split(' ');
const splitTime = split(':');

const getDate = pipe(
  splitDateTime,
  head
);
const getTime = pipe(
  splitDateTime,
  last
);
const getHour = pipe(
  splitTime,
  head
);
const getMinute = pipe(
  splitTime,
  tail,
  head
);
const getSecond = pipe(
  splitTime,
  last
);

const getStartTimestamp = currentDate =>
  dayjs(currentDate)
    .subtract(1, 'minute')
    .unix();
const getEndTimestamp = currentDate =>
  dayjs(currentDate)
    .subtract(1, 'second')
    .unix();

module.exports = {
  createLogger,
  head,
  forEach,
  values,
  batchStates,
  promiseHandler,
  decodeError,
  responseError,
  responseSuccess,
  handleResponse,
  getDate,
  getTime,
  getHour,
  getMinute,
  getSecond,
  getStartTimestamp,
  getEndTimestamp
};
