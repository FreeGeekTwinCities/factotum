#!/bin/sh
curl -H 'Content-Type: application/json' -X POST http://localhost:5984/_users -d '{"_id": "_design/_users", "language": "javascript", "views": {"all_users": {"map": "function(doc) {if (doc.type === \"user\") {emit(doc.name,null);}}"}}}'
