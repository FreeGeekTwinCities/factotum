#!/bin/sh
curl -H 'Content-Type: application/json' -X POST http://localhost:5984/_replicate -d ' {"source": "http://fgtc.iriscouch.com/frontdesk", "target": "frontdesk-test", "create_target": true}'
chromium-browser http://localhost:5984/frontdesk/_design/frontdesk/_rewrite/ http://localhost:5984/frontdesk/_design/admin/_rewrite/

