const judge = require("./judge")
const chalk = require("chalk")

const Test = (name, func, tobe) => {
	return async () => {
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
}

const testJudgeOne = Test(
	"judgeOne",
	async () =>
		await judge.judgeOne(
			1,
			`${__dirname}/../doctor/test/w`,
			`${__dirname}/../temp/compiled/sub2`,
			1000,
			"anything"
		),
	"Wrong"
)

const testJudgeAnswer = Test(
	"judgeAnswer",
	async () =>
		await judge.judgeAnswer(
			1,
			`${__dirname}/../doctor/test`,
			`${__dirname}/../temp/compiled/sub2`,
			1000,
			"sub2"
		),
	{
		"2": "TLE",
		"9": "TLE",
		"10": "TLE",
		sample: "TLE",
		w: "Wrong",
	}
)

const testJudgeCompiled = Test(
	"judgeCompiled",
	async () =>
		await judge.judgeCompiled(1, `${__dirname}/../doctor/test`, 1000),
	{
		"1": { "2": "AC", "9": "AC", "10": "AC", sample: "AC", w: "AC" },
		"2": { "2": "TLE", "9": "TLE", "10": "TLE", sample: "TLE", w: "Wrong" },
		"3": { "2": "AC", "9": "AC", "10": "AC", sample: "AC", w: "AC" },
		"4": { "2": "TLE", "9": "TLE", "10": "TLE", sample: "TLE", w: "Wrong" },
		editorial: { "2": "AC", "9": "AC", "10": "AC", sample: "AC", w: "AC" },
		sub2: {
			"2": "TLE",
			"9": "TLE",
			"10": "TLE",
			sample: "TLE",
			w: "Wrong",
		},
	}
)

module.exports = {
	testJudgeOne,
	testJudgeAnswer,
	testJudgeCompiled,
}
