const meow = require("meow")
const { green, yellow, cyan } = require("chalk")

module.exports = meow(
	`
	Usage
	  ${green(`hexagon`)} ${yellow(`[--option]`)}
	  ${green(`hexagon`)} ${cyan(`doctor`)}     Hear doctor's diagnosis
	Options
	  ${yellow(`--time`)}, ${yellow(`-t`)}      Set Time limit (in milliseconds)
	Examples
	  ${green(`hexagon`)} ${cyan(`sol`)} ${cyan(`testcases`)}
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
