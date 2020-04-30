const utils = require("./utils")
const fs = require("fs")
const chalk = require("chalk")

const judgeOne = async (mock, test, sol, time, output) => {
  try {
    let runner = `${sol} < ${test}.in > ${__dirname}/../temp/${output}`
    let checker = `diff -w ${__dirname}/../temp/${output} ${test}.sol`
    let cleaner = `rm -f ${__dirname}/../temp/${output}`
    const getResult = async () => {
      let startAt = Date.now()

      let [err] = await utils.Run(runner, { timeout: time })
      if (err && err.signal === "SIGTERM") return chalk.yellow("TLE")
      if (err) {
        console.log(err)
        return chalk.white.bgRed(" Error ")
      }

      let timeUsed = Date.now() - startAt
      if (timeUsed > 1000 * time) return chalk.yellow("TLE")

      let [runerr] = await utils.Run(checker)
      if (runerr) return chalk.red("Wrong")

      return chalk.green(mock ? "AC" : timeUsed)
    }
    let result = await getResult()
    await utils.Run(cleaner)
    return result
  } catch (e) {
    throw e
  }
}

const judgeAnswer = (mock, testdir, sol, time, solname) => {
  let result = []
  return new Promise((resolve, reject) => {
    fs.readdir(testdir, async (err, files) => {
      if (err) reject(err)
      try {
        let tests = files.map((file) => {
          let splited = file.split(".")
          let ext = splited.pop()
          let filename = splited.join(".")
          if (ext === "in") return `${filename}`
        })

        tests = tests.filter((val) => val !== undefined)

        for (let test of tests) {
          result.push(
            await judgeOne(
              mock,
              `${testdir}/${test}`,
              sol,
              time,
              `${test}${solname}`
            )
          )
        }
        let ret = {}
        for (let i in tests) {
          ret[tests[i]] = result[i]
        }
        resolve(ret)
      } catch (e) {
        reject(e)
      }
    })
  })
}

const judgeCompiled = (mock, testdir, time) => {
  let result = []
  return new Promise((resolve, reject) => {
    fs.readdir(`${__dirname}/../temp/compiled`, async (err, sols) => {
      if (err) reject(err)
      try {
        for (let sol of sols) {
          result.push(
            await judgeAnswer(
              mock,
              testdir,
              `${__dirname}/../temp/compiled/${sol}`,
              time,
              sol
            )
          )
        }

        let ret = {}
        for (let i in sols) {
          ret[sols[i]] = result[i]
        }
        resolve(ret)
      } catch (e) {
        reject(e)
      }
    })
  })
}

const compile = async (soldir, sol) => {
  let [err] = await utils.Run(
    `g++ -std=c++17 -o ${__dirname}/../temp/compiled/${sol} ${soldir}/${sol}.cpp`
  )
  if (err) throw err
  return
}

const compileAll = async (soldir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(soldir, async (err, sols) => {
      if (err) reject(err)
      try {
        let result = []
        for (let sol of sols) {
          let splited = sol.split(".")
          let ext = splited.pop()
          result.push(await compile(soldir, splited.join(".")))
        }
        Promise.all(result).then((done) => {
          resolve()
        })
      } catch (e) {
        reject(e)
      }
    })
  })
}

const Judge = async (soldir, testdir, time, mock = 0) => {
  try {
    await compileAll(soldir)
    let res = await judgeCompiled(mock, testdir, time)
    await utils.Run(`rm -f ${__dirname}/../temp/compiled/*`)
    return res
  } catch (e) {
    throw e
  }
}

module.exports = {
  judgeOne,
  judgeAnswer,
  judgeCompiled,
  compileAll,
  Judge,
}
