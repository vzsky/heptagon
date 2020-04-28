const cli = require("./cli")
const judge = require("./judge")
const utils = require("./utils")
const test = require("./test")

const Test = async () => {
	await test.testJudgeOne()
	await test.testJudgeAnswer()
}
Test()
