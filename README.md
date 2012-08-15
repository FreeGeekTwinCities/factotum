# FrontDesk

This is a basic application for tracking "front desk" info (sales and donations, as well as volunteer work) for Free Geek Twin Cities.

## Requirements
Install [CouchDB](http://couchdb.apache.org), version 1.1 or later - since [Ubuntu only has 1.0](http://packages.ubuntu.com/search?keywords=couchdb) (grr), you can:

* Install from a PPA:
  * https://launchpad.net/~nilya/+archive/couchdb-1.2 should work for 12.04
  * https://launchpad.net/~longsleep/+archive/couchdb should work with 10.04
* Use Debian - [wheezy has version 1.2](http://packages.debian.org/wheezy/couchdb), as of August 2012
* If you've got time to spare, try [build-couchdb](http://github.com/iriscouch/build-couchdb), which builds CouchDB from the latest source code


## Install 

[Install Kanso](http://kan.so/install)

Then, get a copy of the code:
```
git clone https://github.com/bdunnette/frontdesk
cd frontdesk
kanso push frontdesk
```

## Usage

To see a list of existing transactions, go to:

http://localhost:5984/frontdesk/_design/frontdesk/_rewrite/
