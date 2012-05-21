/**
 * Show functions to be exported from the design doc.
 */

 exports.transactions_by_date = {
    map: function (doc) {
        if (doc.type === 'transaction') {
            emit(doc.audit.createdTime, doc);
        }
    }
};

exports.transactions_by_id = {
    map: function (doc) {
        if (doc.type === 'transaction') {
            emit([doc._id],null);
        }
    }
};

exports.work_type = {
    map: function (doc) {
        if (doc.type === 'work_type') {
            emit([doc.name],doc);
        }
    }
};

exports.timesheets_by_id = {
	map: function (doc) {
		if (doc.type === 'timesheet_line') {
			emit([doc._id],doc);
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

