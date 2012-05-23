import psycopg2
import urllib2
import json

# Try to connect
try:
    conn=psycopg2.connect("dbname='foo' user='dbuser' password='mypass'")
except:
    print "I am unable to connect to the database."

cur = conn.cursor()
try:
    cur.execute("""SELECT * from bar""")
except:
    print "I can't SELECT from bar"

rows = cur.fetchall()
print "\nRows: \n"
for row in rows:
    print "   ", row[1]
    username = "dunn0172"
    userid = "org.couchdb.user:" + username
    password = "foo"
    salt = "bar"
    password_salted = "-hashed-" + password + "," + salt
    jdata = json.dumps({"type":"user", "roles":[], "_id":%s, "name":username, "password":password_salted}) % (userid, username, password_salted)
    urllib2.urlopen("http://localhost:5984/_users/_bulk_docs", jdata)
