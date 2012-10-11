# Factotum

This is a basic application for tracking "front desk" info (sales and donations, as well as volunteer work) for Free Geek Twin Cities.

It's called factotum because, well, it [does a bit of everything](http://en.wiktionary.org/wiki/factotum).

## Requirements
Install [CouchDB](http://couchdb.apache.org), version 1.1 or later - since [Ubuntu only has 1.0](http://packages.ubuntu.com/search?keywords=couchdb) (grr), you can:

* Install from a PPA:
  * https://launchpad.net/~nilya/+archive/couchdb-1.2 works for 12.04 (this is what our "ledger" server uses...)
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

## Update

If Factotum is already installed, and you want the latest version:
+ Navigate to the directory where the Factotum code is located on your computer
+ Update the code
+ "Push" the application

Here's how that process is carried out at FGTC:

1. Log into our "ledger" server: `ssh fgtc@ledger`
2. Change to the factotum directory: `cd factotum`
3. Update the code: `git pull`
4. (Optional) Update any pre-packaged Kanso modules, such as jQuery: `kanso update`
5. Send the updated code to the CouchDB server: `kanso push`

## Usage

To see a list of existing transactions, go to:

http://localhost:5984/frontdesk/_design/frontdesk/_rewrite/

Note: for ease-of-use, we've got our "ledger" server hosting a page at http://ledger:80, so anyone browsing there gets redirected to the (admittedly convoluted) URL above...
