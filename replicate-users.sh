#!/bin/sh
curl -H 'Content-Type: application/json' -X POST http://localhost:5984/_replicate -d ' {"source": "_users", "target": "frontdesk", "continuous": true}'
curl -H 'Content-Type: application/json' -X POST http://localhost:5984/_replicate -d ' {"source": "frontdesk", "filter":"frontdesk/user", "target": "_users", "continuous": true}'


