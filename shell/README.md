# heptagon

A helper for tasks subtask distribution

heptagon is a tool imitating polygon by codeforces.  
It's used for determining the time consumed by each tasks for the whole set of solutions, making it easier to manage subtasks during the task setting sessions for competitive problems.

TESTED ONLY ON MACOS

## installation

simply clone this and do

```
./install.sh
```

you may have to set path (should have done by default)

```
PATH="$PATH:/usr/local/bin"
```

## usage

it now supports only c++ (.cpp) solution

-   put all solution in a directory SOL_DIR
-   put all testcases in a directory TEST_DIR
    -   testcases could be named anything but with extension .in and .sol
-   do `hexagon SOL_DIR TEST_DIR [options]`

## options

it now contain only one options

-   `-t=0.5 / --time=0.5` represent time limit of each testcase in seconds (default 1 second)

## screenshot

![screenshot](https://github.com/vzsky/heptagon/blob/master/shell/screenshot.png)
