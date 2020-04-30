const meow = require("meow")
const { green, yellow, cyan } = require("chalk")

module.exports = meow(
  `
	Usage
	  ${green(`heptagon`)} ${cyan(`sols`)} ${cyan(`tests`)} ${yellow(`[--option]`)}
	  ${green(`heptagon`)} ${cyan(`doctor`)}\t\t\tHear doctor's diagnosis
	Options
	  ${yellow(`--time`)}, ${yellow(`-t`)}\t\t\t\tSet Time limit (in milliseconds)
	Examples
	  ${green(`heptagon`)} ${cyan(`sol`)} ${cyan(`testcases`)}
`,
  {
    booleanDefault: undefined,
    hardRejection: false,
    inferType: false,
    flags: {
      time: {
        type: "number",
        default: 1000,
        alias: "t",
      },
    },
  }
)
