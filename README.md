# FrontDesk

This is a basic application for tracking "front desk" info (sales and donations) for Free Geek Twin Cities.

## Requirements
Install [CouchDB](http://couchdb.apache.org), version 1.1 or later - since [Ubuntu only has 1.0](http://packages.ubuntu.com/search?keywords=couchdb) (grr), you can:

* Install from a PPA:
  * https://launchpad.net/~nilya/+archive/couchdb-1.2 should work for 12.04
  * https://launchpad.net/~longsleep/+archive/couchdb should work with 10.04
* Use Debian - [wheezy has version 1.1.1](http://packages.debian.org/wheezy/couchdb), as of May 2012
* If you've got time to spare, try [build-couchdb](http://github.com/iriscouch/build-couchdb), which builds CouchDB from the latest source code


## Install 

The easiest way to install, once you have CouchDB running, is to take advantage of its replication features - either download and run the [replicate-iriscouch script](./replicate-iriscouch.sh), or manually:

1. Go to your CouchDB's [Futon](http://guide.couchdb.org/draft/tour.html#welcome) - if you're installing on localhost, this is normally: http://localhost:5984/_utils
2. Create a "frontdesk" database
3. Visit the Replication section
4. Replicate from our demo database: http://fgtc.iriscouch.com/frontdesk 

## Usage

Manage your transactions with the Kanso admin - if you pushed to a CouchDB on localhost, the URL will be something like:

http://localhost:5984/frontdesk/_design/admin/_rewrite/frontdesk/

To see a list of existing transactions, go to:

http://localhost:5984/frontdesk/_design/frontdesk/_rewrite/

## Development
Install [Kanso](http://kan.so/install)

This app uses the Kanso admin to edit your data.  Push the frontdesk and admin apps
to your "couch" once you clone or unpack them:

```
git clone https://github.com/bdunnette/frontdesk
cd frontdesk
kanso push frontdesk
```

```
git clone https://github.com/mandric/admin
cd admin
kanso push frontdesk
```