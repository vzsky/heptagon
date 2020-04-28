const child = require("child_process")
const exec = child.exec

const Run = (command, options) => {
	return new Promise((resolve) => {
		exec(command, { options }, (err, stdout) => {
			if (err) return resolve(1, err)
			return resolve(0, stdout)
		})
	})
}

module.exports = {
	Run,
}
