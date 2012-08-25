/**
 * Show functions to be exported from the design doc.
 */

var templates = require('duality/templates'),
    fields = require('couchtypes/fields'),
    Form = require('couchtypes/forms').Form,
    users = require('users'),
    transaction = require('./types').transaction,
    timesheet = require('./types').timesheet_line,
    user = require('./types').person;
    
exports.not_found = function (doc, req) {
    return {
        title: '404 - Not Found',
        content: templates.render('404.html', req, {})
    };
};

exports.reports = function (doc, req) {
    return {
        title: 'Reports',
        content: templates.render('reports.html', req, {})
    };
};

exports.transaction_form = function (doc, req) {
    var myForm = new Form (transaction, doc, {exclude: ['receipt_status']});
    return {
      title : 'Add Transaction',
      content: templates.render('transaction_form.html', req, {
            form_title : 'Add Transaction',
            method : 'POST',
            action : '/frontdesk/_design/frontdesk/_update/update_transaction',
            form : myForm.toHTML(req),
            button: 'Validate'})
    }   
};

exports.timesheet_form = function (doc, req) {
    var myForm = new Form (timesheet, doc, {exclude: ['work_code', 'audit']});
    return {
      title : 'Add Timesheet Line',
      content: templates.render('timesheet_form.html', req, {
            form_title : 'Add Timesheet Line',
            method : 'POST',
            action : '/frontdesk/_design/frontdesk/_update/update_timesheet',
            form : myForm.toHTML(req),
            button: 'Validate'})
    }   
};

exports.user_form = function (doc, req) {
    var myForm = new Form (user);
    return {
      title : 'Add User',
      content: templates.render('user_form.html', req, {
            form_title : 'Add User',
            method : 'POST',
            action : '/frontdesk/_design/frontdesk/_update/update_user',
            form : myForm.toHTML(req),
            button: 'Validate'})
    }   

};

exports.transaction = function (doc, req) {
    var payment_headers = {"Sale": "Payment(s) Received", "Donation": "Monetary Donation(s)"};
    
    var transaction_date = new Date(doc.date[0], doc.date[1], doc.date[2]); 
    transaction_date.setMonth(transaction_date.getMonth()-1); 
    var transaction_date_string = transaction_date.toDateString();
    
    // generate the markup for the transaction
    var content = templates.render("transaction_detail.html", req, {
        transaction: doc, payment_header: payment_headers[doc.transaction_type], transaction_date_string: transaction_date_string
    });

    return {title: doc.transaction_type + " " + doc._id, content: content};  
};
