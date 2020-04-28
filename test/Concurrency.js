const child = require("child_process")
const exec = child.exec

const run = () => {
	return new Promise((resolve) => {
		exec(`sleep 1`, () => {
			return resolve()
		})
	})
}

const runAllatOnce = async (times) => {
	return new Promise((resolve) => {
		Res = []
		for (let c = 1; c <= times; c++) {
			Res.push(run())
		}
		Promise.all(Res).then(() => resolve())
	})
}

const runAll = async (times) => {
	for (let c = 1; c <= times; c++) {
		await run()
	}
}

const main = async () => {
	let startat
	console.log("started")
	startat = Date.now()
	await runAllatOnce(3000)
	console.log("done all at once in", Date.now() - startat, "ms")
	startat = Date.now()
	await runAll(1)
	console.log("done all in", Date.now() - startat, "ms")
}

main()
