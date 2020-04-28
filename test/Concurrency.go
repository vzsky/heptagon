package main

import (
	"fmt"
	"os/exec"
	"sync"
	"time"
)

func run() {
	cmd := exec.Command("sleep", "1")
	err := cmd.Run()
	if err != nil {
		panic(err)
	}
}

func runAll(times int) {
	for i := 0; i < times; i++ {
		run()
	}
}

func runAllatOnce(times int) {
	var wg sync.WaitGroup
	for i := 0; i < times; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			run()
		}()
	}
	wg.Wait()
}

func main() {
	fmt.Println("started")

	var start_at time.Time

	start_at = time.Now()
	runAllatOnce(2999)
	fmt.Println("finished all at once in ", time.Now().Sub(start_at))

	start_at = time.Now()
	runAll(5)
	fmt.Println("finished all in ", time.Now().Sub(start_at))
}
