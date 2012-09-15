/**
 * Update functions to be exported from the design doc.
 */
 
var templates = require('duality/templates'),
    fields = require('couchtypes/fields'),
    Form = require('couchtypes/forms').Form,
    transaction = require('./types').transaction,
    timesheet = require('./types').timesheet_line,
    user = require('./types').person,
    users = require('users');

exports.update_transaction = function (doc, req) {
    var form = new Form(transaction);
    form.validate(req);

 if (form.isValid()) {
        var payment_headers = {"Sale": "Payment(s) Received", "Donation": "Monetary Donation(s)"};
        var doc = form.values
        
        var transaction_date = new Date(doc.date[0], doc.date[1], doc.date[2]); 
        transaction_date.setMonth(transaction_date.getMonth()-1);       
        var transaction_date_string = transaction_date.toDateString();
        
        var content = templates.render("transaction_detail.html", req, {
            transaction: form.values, payment_header: payment_headers[doc.transaction_type], transaction_date_string: transaction_date_string
        });

        return [form.values, {content: content}];
    }   

 else {
        var content = templates.render('transaction_form.html', req, {
            form_title: 'My Form',
            method: 'POST',
            action: '/frontdesk/_design/frontdesk/_update/update_transaction',
            form: form.toHTML(req),
            button: 'Save Transaction'
        }); 
        return [null, {content: content, title: 'Update Transaction'}];
    }   
};

exports.update_timesheet = function (doc, req) {
    var form = new Form(timesheet);
    form.validate(req);
    
 if (form.isValid()) {
        var total_hours = 0
        var content = templates.render("timesheet_detail.html", req, {
            timesheet: form.values,
            total_hours: total_hours
        });

        return [form.values, {content: content}];
    }   

 else {
        var content = templates.render('timesheet_form.html', req, {
            form_title: 'My Form',
            method: 'POST',
            action: '/frontdesk/_design/frontdesk/_update/update_timesheet',
            form: form.toHTML(req),
            button: 'Save Timesheet'
        }); 
        return [null, {content: content, title: 'Update Timesheet'}];
    }   
};

exports.update_user = function (doc, req) {
    var form = new Form(user);
    form.validate(req);

 if (form.isValid()) {
        var content = templates.render("user_detail.html", req, {
            user: form.values
        });

        return [form.values, {content: content}];
    }   

 else {
        var content = templates.render('user_form.html', req, {
            form_title: 'My Form',
            method: 'POST',
            action: '/frontdesk/_design/frontdesk/_update/update_user',
            form: form.toHTML(req),
            button: 'Save User'
        }); 
        return [null, {content: content, title: 'Update User'}];
      }   
};
