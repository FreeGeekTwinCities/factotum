#!/usr/bin/python
import psycopg2
import sys
from couchdb.client import Server

if len(sys.argv) < 2:
    print "Please run the script as follows:"
    print "%s tryton-db-user tryton-db-password couchdb-url (couchdb-url is optional)" % sys.argv[0]
    sys.exit(1)
elif len(sys.argv) > 3:
    server = Server(sys.argv[3])
else:
    server = Server()
print server

# Try to connect
connect_string = "host='wyatt' dbname='fgtc' user='%s' password='%s'" % (sys.argv[1], sys.argv[2])
couch = server['_users']

try:
    conn=psycopg2.connect(connect_string)
    cur = conn.cursor()
except:
    print "I am unable to connect to the database using connect_string " + connect_string

try:
    cur.execute("""SELECT id,name,login,password,salt from res_user""")
    rows = cur.fetchall()
except:
    print "I can't SELECT from res_user"

for row in rows:
    #print "   ", row
    username = row[2]
    userid = "org.couchdb.user:" + username
    if row[3] == None:
        password = ''    
    else:
        password = row[3]
    if row[4] == None:
        salt = ''
    else:
        salt = row[4]
    if password and salt:
        user_doc = {}
        user_doc['type'] = 'user'
        user_doc['roles'] = []
        user_doc['name'] = username
        user_doc['_id'] = userid
        user_doc['password_sha'] = password
        user_doc['salt'] = salt
        try:
            doc_id, doc_rev = couch.save(user_doc)
            print "Added user %s (%s)" % (username, doc_id)
	except:
	    print "User %s already exists" % username
