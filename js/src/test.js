const judge = require("./judge")
const chalk = require("chalk")

const Test = async (name, func, tobe) => {
	let startAt = Date.now()
	let res = await func()
	let status = "ERROR"
	if (JSON.stringify(res) === JSON.stringify(tobe)) {
		status = chalk.black.bgGreen(" PASSED ")
	} else {
		status = chalk.white.bgRed(" FAILED ")
	}
	console.log(
		`${status} on test ${chalk.cyan(name)} in ${chalk.yellow(
			Date.now() - startAt
		)} ms`
	)
}

const testJudgeOne = async () => {
	Test(
		"judgeOne",
		async () =>
			await judge.judgeOne(
				"../../sample/test/w",
				"../../sample/sol/s",
				1,
				"../temp/anything"
			),
		"Wrong"
	)
}

const testJudgeAnswer = async () => {
	Test(
		"judgeAnswer",
		async () =>
			await judge.judgeAnswer(
				"../../sample/test",
				"../../sample/sol/s",
				1
			),
		{ "2": "TLE", "9": "TLE", "10": "TLE", sample: "TLE", w: "Wrong" }
	)
}

module.exports = {
	testJudgeOne,
	testJudgeAnswer,
}
