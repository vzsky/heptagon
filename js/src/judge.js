const utils = require("./utils")
const fs = require("fs")

const judgeOne = async (test, sol, time, output) => {
	let runner = `./${sol} < ${test}.in > ${output}` //TODO add time limit
	let checker = `diff -w ${output} ${test}.sol`
	let cleaner = `rm -f ${output}`
	const getResult = async () => {
		let startAt = Date.now()
		let e = await utils.Run(runner)
		if (e) return "Error"

		let timeUsed = Date.now() - startAt
		if (timeUsed > 1000 * time) return "TLE"

		let check = await utils.Run(checker)
		if (check) return "Wrong"

		return timeUsed
	}
	let result = await getResult()
	await utils.Run(cleaner)

	return result
}

const judgeAnswer = (testdir, sol, time) => {
	let result = []
	return new Promise((resolve) => {
		fs.readdir(testdir, async (err, files) => {
			let tests = files.map((file) => {
				let splited = file.split(".")
				let ext = splited.pop()
				let filename = splited.join(".")
				if (ext === "in") return `${filename}`
			})

			tests = tests.filter((val) => val !== undefined)

			for (let test of tests) {
				result.push(
					judgeOne(`${testdir}/${test}`, sol, time, `${test}smt`)
				)
			}

			Promise.all(result).then((done) => {
				let ret = {}
				for (let i in tests) {
					ret[tests[i]] = done[i]
				}
				resolve(ret)
			})
		})
	})
}

module.exports = {
	judgeOne,
	judgeAnswer,
}
