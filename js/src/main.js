#!/usr/bin/env node

const cli = require("./cli")
const judge = require("./judge")
const utils = require("./utils")
const test = require("./test")
const ora = require("ora")
const Table = require("cli-table3")
const chalk = require("chalk")

const Test = async (spinner) => {
	await judge.compileAll(`${__dirname}/../doctor/sol`)
	await test.testJudgeOne(spinner)
	await test.testJudgeAnswer(spinner)
	await test.testJudgeCompiled(spinner)
	await utils.Run("rm -f ../temp/compiled/*")
}

const Print = async (res, spinner) => {
	let head = [chalk.cyanBright("cases")]
	let tests = []
	let cases = []
	for (sol in res) {
		head.push(chalk.cyanBright(sol))
		tests.push(res[sol])
	}
	let table = new Table({ head })
	for (c in tests[0]) {
		cases.push(c)
	}
	cases.forEach((val) => {
		let row = [val]
		tests.forEach((test) => {
			row.push(test[val])
		})
		table.push(row)
	})
	spinner.stop()
	console.log(table.toString())
}

const main = async () => {
	let args = cli.input
	let time = cli.flags.time

	if (args.length === 1 && args[0] === "doctor") {
		// console.log("yay")
		const spinner = ora("Clinic's running").start()
		await Test(spinner)
		spinner.stop()
		return
	}

	if (args.length === 2) {
		const spinner = ora("Be patient").start()
		try {
			let res = await judge.Judge(args[0], args[1], time)
			await Print(res, spinner)
		} catch (e) {
			spinner.fail(
				chalk.red(
					"Error occurred, try heptagon docter, fix directories, or contact my99n"
				)
			)
			spinner.stop()
		}
		return
	}

	console.log(cli.help)
}
main()
