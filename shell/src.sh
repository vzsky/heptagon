# Usage
# 1 - cpp file to be grade
# 2 - relative path to Testcase folder
# 3 - time limit in second

APPNAME=heptagon

function printTable()
{
    local -r delimiter="${1}"
    local -r data="$(removeEmptyLines "${2}")"

    if [[ "${delimiter}" != '' && "$(isEmptyString "${data}")" = 'false' ]]
    then
        local -r numberOfLines="$(wc -l <<< "${data}")"

        if [[ "${numberOfLines}" -gt '0' ]]
        then
            local table=''
            local i=1

            for ((i = 1; i <= "${numberOfLines}"; i = i + 1))
            do
                local line=''
                line="$(sed "${i}q;d" <<< "${data}")"

                local numberOfColumns='0'
                numberOfColumns="$(awk -F "${delimiter}" '{print NF}' <<< "${line}")"

                # Add Line Delimiter

                if [[ "${i}" -eq '1' ]]
                then
                    table="${table}$(printf '%s#+' "$(repeatString '#+' "${numberOfColumns}")")"
                fi

                # Add Header Or Body

                table="${table}\n"

                local j=1

                for ((j = 1; j <= "${numberOfColumns}"; j = j + 1))
                do
                    table="${table}$(printf '#| %s' "$(cut -d "${delimiter}" -f "${j}" <<< "${line}")")"
                done

                table="${table}#|\n"

                # Add Line Delimiter

                if [[ "${i}" -eq '1' ]] || [[ "${numberOfLines}" -gt '1' && "${i}" -eq "${numberOfLines}" ]]
                then
                    table="${table}$(printf '%s#+' "$(repeatString '#+' "${numberOfColumns}")")"
                fi
            done

            if [[ "$(isEmptyString "${table}")" = 'false' ]]
            then
                echo "${table}" | column -s '#' -t | awk '/^\+/{gsub(" ", "-", $0)}1'
            fi
        fi
    fi
}

function removeEmptyLines()
{
    local -r content="${1}"

    echo "${content}" | sed '/^\s*$/d'
}

function repeatString()
{
    local -r string="${1}"
    local -r numberToRepeat="${2}"

    if [[ "${string}" != '' && "${numberToRepeat}" =~ ^[1-9][0-9]*$ ]]
    then
        local -r result="$(printf "%${numberToRepeat}s")"
        echo "${result// /${string}}"
    fi
}

function isEmptyString()
{
    local -r string="${1}"

    if [[ "$(trimString "${string}")" = '' ]]
    then
        echo 'true' && return 0
    fi

    echo 'false' && return 1
}

function trimString()
{
    local -r string="${1}"

    sed 's,^[[:blank:]]*,,' <<< "${string}" | sed 's,[[:blank:]]*$,,'
}

function judgeOne () {
    file=$1
    tc_dir=$2
    tlim_s=$3

    start_ms=$(ruby -e 'puts (Time.now.to_f * 1000).to_i')

    timeout ${tlim_s}s ./ans.out < $tc_dir/$file.in > $tc_dir/$file.out

    end_ms=$(ruby -e 'puts (Time.now.to_f * 1000).to_i')
    time_ms=$((end_ms - start_ms))
    limit=$(echo "scale = 3; $tlim_s * 1000" | bc )
    limit=${limit%.*}

    if (( time_ms > limit ))
    then 
        JudgeResult="TLE"
    else 
        result=$(diff -w $tc_dir/$file.sol $tc_dir/$file.out)

        if [ "$result" = "" ];
        then
            JudgeResult="$time_ms ms"
        else 
            JudgeResult="Wrong"
        fi
    fi

    rm $tc_dir/$file.out
}

sub_dir=$1
tc_dir=$2
tlim_s=1
HELP=0

for arg in "$@"
do
    case $arg in
        -h|--help)
        HELP=1
        echo "USAGE: $APPNAME [SOL_DIR] [TEST_DIR] [options]"
        echo "Options:"
        echo " -t --time : time limit for each cases in seconds "
        exit 0
        shift 
        ;;
        -t=*|--time=*)
        tlim_s="${arg#*=}"
        shift 
        ;;
        *)
        shift
        ;;
    esac
done

if [ "$sub_dir" = "" ]; then
    echo "$APPNAME --help for more information"
    exit 1
fi
if [ "$tc_dir" = "" ]; then
    echo "$APPNAME --help for more information"
    exit 1
fi
if [ ! -d "$sub_dir" ]; then
    echo "$APPNAME --help for more information"
    exit 1
fi
if [ ! -d "$tc_dir" ]; then
    echo "$APPNAME --help for more information"
    exit 1
fi

tput reset
clear
echo "Initializing"

Table="CASE"
for submission in $sub_dir/*.cpp;
do
    sub="${submission##*/}"
    sub="${sub%.*}"
    Table="$Table,$sub"
done

declare -a Line
#fill first ele of every line
i=0
for f in $tc_dir/*.in;
do 
    file="${f##*/}"
    file="${file%.*}"
    Line[i]=$file
    ((i=i+1))
done
#fill first ele of every line

for submission in $sub_dir/*.cpp;
do
    # for one solution
    clear
    echo "Grading ${submission##*/}"
    g++ -std=c++17 $submission -o ans.out;
    i=0
    # for every testcases
    for f in $tc_dir/*.in;
    do 
        file="${f##*/}"
        file="${file%.*}"

        JudgeResult="?"
        judgeOne $file $tc_dir $tlim_s
        Line[i]="${Line[i]},$JudgeResult"
        ((i=i+1))
    done
    # for every testcases
    rm ans.out  
    # for one solution
done

i=0
for f in $tc_dir/*.in;
do 
    Table="$Table\n${Line[i]}"
    ((i=i+1))
done
clear
printTable ',' "$Table"
