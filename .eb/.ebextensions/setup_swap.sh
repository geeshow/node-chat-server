#!/bin/bash

LOGFILE=/var/log/web.stdout.log
/bin/chmod 644 $LOGFILE

SWAPFILE=/var/swapfile
SWAP_MEGABYTES=1024

if [ -f $SWAPFILE ]; then
	echo "Swapfile $SWAPFILE found, assuming already setup"
	exit;
fi

/bin/dd if=/dev/zero of=$SWAPFILE bs=1M count=$SWAP_MEGABYTES
/bin/chmod 600 $SWAPFILE
/sbin/mkswap $SWAPFILE
/sbin/swapon $SWAPFILE
