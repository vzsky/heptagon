const meow = require("meow")
const { green, yellow, cyan } = require("chalk")

module.exports = meow(
	`
	Usage
	  ${green(`hexagon`)} ${yellow(`[--option]`)}
	Options
	  ${yellow(`--time`)}, ${yellow(`-t`)}      Set Time limit (in seconds)
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
				default: 1,
				alias: "t",
			},
		},
	}
)
