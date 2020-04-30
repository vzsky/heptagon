const judge = require("./judge")
const chalk = require("chalk")

const Test = (name, func, tobe) => {
  return async (spinner) => {
    let startAt = Date.now()
    let res = await func()

    let status = JSON.stringify(res) === JSON.stringify(tobe) ? 1 : 0
    let msg = `${
      status
        ? chalk.black.bgGreen(" PASSED ")
        : chalk.white.bgRed(" FAILED ")
      } ${name} in ${chalk.yellow(Date.now() - startAt)} ms`
    if (status) spinner.succeed(msg)
    if (!status) spinner.succeed(msg)
    spinner.start()
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
  { "2": "TLE", "9": "TLE", w: "Wrong" }
)

const testJudgeCompiled = Test(
  "judgeCompiled",
  async () =>
    await judge.judgeCompiled(1, `${__dirname}/../doctor/test`, 1000),
  {
    editorial: { "2": "AC", "9": "AC", w: "AC" },
    sub2: { "2": "TLE", "9": "TLE", w: "Wrong" },
  }
)

module.exports = {
  testJudgeOne,
  testJudgeAnswer,
  testJudgeCompiled,
}
