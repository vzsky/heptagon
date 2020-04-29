const cli = require("./cli")
const judge = require("./judge")
const utils = require("./utils")
const test = require("./test")

const Test = async () => {
	await judge.compileAll(`${__dirname}/../doctor/sol`)
	await test.testJudgeOne()
	await test.testJudgeAnswer()
	await test.testJudgeCompiled()
	await utils.Run("rm -f ../temp/compiled/*")
}
// Test()

const main = async () => {
	let args = cli.input
	let time = cli.flags.time

	if (args.length === 1 && args[0] === "doctor") {
		// console.log("yay")
		Test()
		return
	}

	if (args.length === 2) {
		let res = await judge.Judge(args[0], args[1], time)
		console.log(res)
		return
	}
}
main()
