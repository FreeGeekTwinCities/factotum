#!/bin/sh
#this script relies on couchdb-dump, which is part of the couchdb-python package (apt-get install python-couchdb)
#before running this backup script, be sure to copy your SSH key to the backup user/host, e.g.: ssh-copy-id backup-user@backup-host
today=`date +%y%m%d`
/usr/bin/couchdb-dump http://127.0.0.1:5984/frontdesk > frontdesk-$today.dump
/bin/bzip2 frontdesk-$today.dump
/usr/bin/scp frontdesk-$today.dump.bz2 backup-user@backup-host:
mv frontdesk-$today.dump.bz2 /home/fgtc/backup
