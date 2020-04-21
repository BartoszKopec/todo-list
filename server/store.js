function LoggingFilter() {
  this.handle = (requestOptions, next) => {
    console.log(requestOptions);
    next(requestOptions, (returnObject, finalCallback, next) => {
      console.log(returnObject);
    })
  }
}

const storage = require('azure-storage')
const retryOperation = new storage.LinearRetryPolicyFilter();
const loggingOperation = new LoggingFilter();
const service = storage.createTableService()
  .withFilter(loggingOperation)  
  .withFilter(retryOperation);
const table = 'tasks'

const init = async () => (
  new Promise((resolve, reject) => {
    service.createTableIfNotExists(table, (error, result, response) => {
      !error ? resolve() : reject()
    })
  })
)

module.exports = {
  init
}