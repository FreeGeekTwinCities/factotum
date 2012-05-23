/**
 * List functions to be exported from the design doc.
 */

var templates = require('duality/templates');

exports.transaction_list = function (head, req) {

    log('calling transaction list');
    log(head);

    start({code: 200, headers: {'Content-Type': 'text/html'}});

    // fetch all the rows
    var transaction, transactions= [];

    while (transaction = getRow()) {
        transactions.push(transaction);
    }

    // generate the markup for a list of transactions
    var content = templates.render('transaction_list.html', req, {
        transactions: transactions
    });

    return {title: 'Transaction Index', content: content};

};

exports.transaction = function (head, req) {

    start({code: 200, headers: {'Content-Type': 'text/html'}});
    
    // fetch row and set page.
    var row = [];
    var transaction;
    if (row = getRow()) {
    	transaction = row.doc
    }
    else {
        return {
    	    title: '404 - Not Found',
	        content: 'transaction not found'
    	};
    }

    // generate the markup for the transaction
    var content = templates.render("transaction_detail.html", req, {
        transaction: transaction
    });

    return {title: transaction.transaction_type + " " + transaction._id, content: content};

};

exports.timesheet_list = function (head, req) {

    log('calling timesheet list');
    log(head);

    start({code: 200, headers: {'Content-Type': 'text/html'}});
    
    // fetch all the rows
    var timesheet, timesheets= [];

    while (timesheet = getRow()) {
        timesheets.push(timesheet);
    }

    // generate the markup for a list of timesheets
    var content = templates.render('timesheet_list.html', req, {
        timesheets: timesheets
    });

    return {title: 'Timesheet List', content: content};

};

exports.system_list = function (head, req) {
    
    log('calling system list');
    log(head);

    start({code: 200, headers: {'Content-Type': 'text/html'}});

    // fetch all the rows
    var system, systems= [];

    while (system = getRow()) {
        systems.push(system);
    }

    // generate the markup for a list of systems
    var content = templates.render('system_list.html', req, {
        systems: systems
    });

    return {title: 'System List', content: content};

};

exports.system = function (head, req) {

    start({code: 200, headers: {'Content-Type': 'text/html'}});
    
    // fetch row and set page.
    var row = [];
    var system;
    if (row = getRow()) {
    	system = row.doc
    }
    else {
        return {
    	    title: '404 - Not Found',
	        content: 'system not found'
    	};
    }

    // generate the markup for the system
    var content = templates.render("system_detail.html", req, {
        system:system
    });

    return {title: system.product, content: content};

};

exports.users = function (head, req) {

    start({code: 200, headers: {'Content-Type': 'text/html'}});
    
    var user; 
    var users = [];

    while (user = getRow()) {
        users.push(user.key);
    }

    var content = users

    return {title: 'User List', content: content};

};

