#!/usr/bin/python
import psycopg2
import sys
from couchdb.client import Server

#Field mapping (ID-Name)
#1	Administrivia
#2	Build
#3	Recycling
#4	Testing
#5	Education
#6	Sales

#Frontdesk work types: Build, Recycling, Testing, Sales, Administrivia

user_array = {}

work_array = {1: "Administrivia", 2: "Build", 3: "Recycling", 4: "Testing", 5: "Education", 6: "Sales"}

if len(sys.argv) < 2:
    print "Please run the script as follows:"
    print "%s tryton-db-user tryton-db-password couchdb-url (couchdb-url is optional)" % sys.argv[0]
    sys.exit(1)
elif len(sys.argv) > 3:
    server = Server(sys.argv[3])
else:
    server = Server()

# Try to connect
connect_string = "host='wyatt' dbname='fgtc' user='%s' password='%s'" % (sys.argv[1], sys.argv[2])
couch = server['frontdesk']

try:
    conn=psycopg2.connect(connect_string)
    cur = conn.cursor()
except:
    print "I am unable to connect to the database using connect_string " + connect_string

try:
    cur.execute("""SELECT id,party from company_employee""")
    employees = cur.fetchall()
    cur.execute("""SELECT id,name from party_party""")
    parties = cur.fetchall()
    cur.execute("""SELECT id,login,name,employee from res_user""")
    users = cur.fetchall()    
    cur.execute("""SELECT description,work,date,employee,hours from timesheet_line""")
    timesheets = cur.fetchall()
except:
    print "I can't SELECT from timesheet_line"

for user in users:
    user_array[user[3]] = user[1]
    
print "%s timesheets found, processing..." % len(timesheets)    
for timesheet in timesheets:
    user_id = timesheet[3]
    work_date = timesheet[2]
    work_code = timesheet[1]
    if (user_id in user_array) and (work_code in work_array):
        timesheet_doc = {}
        user_name = user_array[user_id]
        work_type = work_array[work_code]
        timesheet_doc['type'] = 'timesheet_line'
        timesheet_doc['hours'] = timesheet[4]
        timesheet_doc['volunteer'] = user_name
        timesheet_doc['work_type'] = work_type
        timesheet_doc['description'] = timesheet[0]
        timesheet_doc['date'] = [work_date.year, work_date.month, work_date.day]
        doc_id, doc_rev = couch.save(timesheet_doc)
        print "Added %s timesheet for %s (%s)" % (str(work_date), user_name, doc_id)
