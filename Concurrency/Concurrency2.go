package main

import (
	"fmt"
	"os/exec"
	"time"

	"github.com/chebyrash/promise"
)

func run() *promise.Promise {
	p := promise.New(func(resolve func(interface{}), reject func(error)) {
		cmd := exec.Command("sleep", "1")
		err := cmd.Run()
		if err != nil {
			reject(err)
			return
		}
		resolve(0)
		return
	})
	return p
}

func runAll(times int) {
	for i := 0; i < times; i++ {
		run().Await()
	}
}

func runAllatOnce(times int) {
	var res []*promise.Promise
	for i := 0; i < times; i++ {
		res = append(res, run())
	}
	promise.All(res...).Await()
}

func main() {
	fmt.Println("started")

	var start_at time.Time

	start_at = time.Now()
	runAllatOnce(3000)
	fmt.Println("finished all at once in ", time.Now().Sub(start_at))

	start_at = time.Now()
	runAll(1)
	fmt.Println("finished all in ", time.Now().Sub(start_at))
}
