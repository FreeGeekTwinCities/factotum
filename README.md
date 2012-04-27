# FrontDesk

This is a basic application for tracking "front desk" info (sales and donations) for Free Geek Twin Cities.

## Requirements

Install [Kanso](http://kan.so/install)

## Install 

This app uses the Kanso admin to edit your data.  Push the frontdesk and admin apps
to your [couch](http://couchdb.apache.org/) once you clone or unpack them:

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

## Usage

Manage your transactions with the Kanso admin - if you pushed to a CouchDB on localhost, the URL will be something like:

http://localhost:5984/frontdesk/_design/admin/_rewrite/frontdesk/

To see a list of existing transactions, go to:

http://localhost:5984/frontdesk/_design/frontdesk/_rewrite/
