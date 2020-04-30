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
    if (!status) spinner.fail(msg)
    spinner.start()
  }
}

const testJudgeOneW = Test(
  "judgeOne WA",
  async () =>
    await judge.judgeOne(
      1,
      `${__dirname}/../doctor/test/w`,
      `/tmp/heptagon/compiled/sol`,
      1000,
      "anything"
    ),
  "Wrong"
)

const testJudgeOneP = Test(
  "judgeOne AC",
  async () =>
    await judge.judgeOne(
      1,
      `${__dirname}/../doctor/test/a`,
      `/tmp/heptagon/compiled/sol`,
      1000,
      "anything"
    ),
  "AC"
)

const testJudgeOneT = Test(
  "judgeOne TLE",
  async () =>
    await judge.judgeOne(
      1,
      `${__dirname}/../doctor/test/a`,
      `/tmp/heptagon/compiled/tle`,
      1000,
      "anything"
    ),
  "TLE"
)

const testJudgeAnswer = Test(
  "judgeAnswer",
  async () =>
    await judge.judgeAnswer(
      1,
      `${__dirname}/../doctor/test`,
      `/tmp/heptagon/compiled/sol`,
      1000,
      "sub2"
    ),
  { a: "AC", w: "Wrong" }
)

const testJudgeCompiled = Test(
  "judgeCompiled",
  async () =>
    await judge.judgeCompiled(1, `${__dirname}/../doctor/test`, 1000),
  {
    sol: { a: "AC", w: "Wrong" },
    tle: { a: "TLE", w: "TLE" },
  }
)

module.exports = {
  testJudgeOneW,
  testJudgeOneP,
  testJudgeOneT,
  testJudgeAnswer,
  testJudgeCompiled,
}
