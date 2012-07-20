/**
 * Show functions to be exported from the design doc.
 */

 exports.transactions_by_date = {
    map: function (doc) {
        if (doc.type === 'transaction') {
            emit(doc.date, doc);
        }
    }
};

exports.transactions_by_id = {
    map: function (doc) {
        if (doc.type === 'transaction') {
            emit(doc._id, doc);
        }
    }
};

exports.work_type = {
    map: function (doc) {
        if (doc.type === 'work_type') {
            emit(doc.name,doc);
        }
    }
};

exports.timesheets_by_id = {
	map: function (doc) {
		if (doc.type === 'timesheet_line') {
			emit(doc._id, doc);
		}
	}
};

exports.timesheets_by_date = {
    map: function (doc) {
        if (doc.type === 'timesheet_line') {
            emit(doc.date, doc);
        }
    }
};

exports.timesheets_by_volunteer = {
    map: function (doc) {
        if (doc.type === 'timesheet_line') {
            emit(doc.volunteer, doc);
        }
    }
};

exports.systems = {
    map: function (doc) {
        if (doc.class === 'system') {
            emit(doc._id,doc);
        }
    }
};

exports.systems_by_id = {
    map: function (doc) {
        if (doc.class === 'system') {
            emit([doc._id],null);
        }
    }
};

exports.users = {
    map: function (doc) {
        if (doc.type === 'person' || doc.type === 'user') {
            emit([doc.username], null);
        }
    }
};

exports.people = {
    map: function (doc) {
        if (doc.type === 'person' || doc.type === 'user') {
            var name = []
            for (field in doc.name) {
                if (field) {
                    name.push(doc.name[field].toString());
                };
            };
            if (name.length < 1) {
                name.push(doc.username.toString());
            };
            var name_str = name.join(" ")
            emit(name_str, doc._id);
        } 
        else {
            if (doc.type === 'transaction') {
                emit(doc.party.name, null);
            }
        };
    },
    
    reduce: function(keys, values, rereduce) {
        return true;
    }

};

exports.volunteer_hours_total = {
    map: function (doc) {
	    if (doc.type === 'timesheet_line') {
			emit(doc.volunteer,doc.hours);
		}
	},
	
    reduce: function(keys, values, rereduce) {
        return sum(values);
    }

};
