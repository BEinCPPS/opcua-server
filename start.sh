#!/bin/sh
rm opcua-server.log
rm result.log
if [ "$1" != "" ]; then
	echo "Alternate host set to "\$1
	node server.js -a $1	
else
	node server.js
fi