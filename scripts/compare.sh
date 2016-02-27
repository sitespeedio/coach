#! /bin/bash

if [ $# -ne 1 ]; then
    echo $0: usage: compare urls.txt
    exit 1
fi

input=$1

echo "You are using GPSI key $GPSI_KEY"

URLS=()
while read txt ; do
   URLS[${#URLS[@]}]=$txt
done < $input
echo 'URL, Coach, GPSI, YSlow' > result.txt

for url in "${URLS[@]}"; do
echo "$url"
gpsi="$(gpagespeed "$url" --key $GPSI_KEY | jq .ruleGroups.SPEED.score)"
coach="$(webcoach -u "$url" | jq .performance.score)"
yslow="$(phantomjs yslow.js "$url" | jq .o )"
echo "$url, $coach, $gpsi, $yslow" >> result.txt
done
