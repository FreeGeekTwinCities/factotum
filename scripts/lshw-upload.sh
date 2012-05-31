#!/bin/sh
sudo lshw -json > lshw.json
echo "{\"docs\":[" > upload.json
cat lshw.json >> upload.json
echo "]}" >> upload.json
curl -d @upload.json -X POST http://localhost:5984/frontdesk/_bulk_docs -H "Content-Type: application/json"
