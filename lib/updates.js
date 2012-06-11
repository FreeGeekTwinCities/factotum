/**
 * Update functions to be exported from the design doc.
 */
 
var templates = require('duality/templates'),
    fields = require('couchtypes/fields'),
    Form = require('couchtypes/forms').Form,
    transaction = require('./types').transaction,
    timesheet = require('./types').timesheet_line,
    user = require('./types').user,
    users = require('users');

exports.update_transaction = function (doc, req) {
    var form = new Form(transaction);
    form.validate(req);

 if (form.isValid()) {
        var content = templates.render("transaction_detail.html", req, {
            transaction: form.values
        });

        return [form.values, {content: content}];
    }   

 else {
        var content = templates.render('transaction_form.html', req, {
            form_title: 'My Form',
            method: 'POST',
            action: '/frontdesk/_design/frontdesk/_update/update_transaction',
            form: form.toHTML(req),
            button: 'Validate'
        }); 
        return [null, {content: content, title: 'Update Transaction'}];
    }   
};

exports.update_timesheet = function (doc, req) {
    var form = new Form(timesheet);
    form.validate(req);

 if (form.isValid()) {
        return [form.values, 'Thanks for your work on ' + form.values.work_type + ", " + form.values.volunteer + '!<br/><a href=/frontdesk/_design/frontdesk/_rewrite/timesheets>Back to Timesheets</a>'];
    }   

 else {
        var content = templates.render('timesheet_form.html', req, {
            form_title: 'My Form',
            method: 'POST',
            action: '/frontdesk/_design/frontdesk/_update/update_timesheet',
            form: form.toHTML(req),
            button: 'Validate'
        }); 
        return [null, {content: content, title: 'Update Transaction'}];
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
            button: 'Validate'
        }); 
        return [null, {content: content, title: 'Update User'}];
      }   
};
