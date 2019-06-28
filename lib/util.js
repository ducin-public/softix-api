const logMessage = (getMessageFn) => {
  // setTimeout(() => {
    console.log('CONFIG > ' + getMessageFn())
  // }, 0)
}

const logError = (getMessageFn) => {
  console.log('ERROR > ' + getMessageFn())
}

module.exports = {
  logMessage,
  logError
}
