const chalk = require('chalk')

const logCustom = (type) =>
  (getMessageFn) => {
    console.log(chalk.cyan(`${type} > `) + getMessageFn())
  }

const logInfo = (getMessageFn) => {
  console.log(chalk.green('INFO > ') + getMessageFn())
}

const logConfig = (getMessageFn) => {
  console.log(chalk.yellow('CONFIG > ') + getMessageFn())
}

const logError = (getMessageFn) => {
  console.log(chalk.red('ERROR > ') + getMessageFn())
}

module.exports = {
  logCustom,
  logInfo,
  logConfig,
  logError
}
