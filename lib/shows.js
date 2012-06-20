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

exports.transaction_form = function (doc, req) {
    var myForm = new Form (transaction, doc, {exclude: ['work_code']});
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
    // generate the markup for the transaction
    var content = templates.render("transaction_detail.html", req, {
        transaction: doc
    });

    return {title: transaction.transaction_type + " " + transaction._id, content: content};  
};
