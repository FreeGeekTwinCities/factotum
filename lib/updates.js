/**
 * Update functions to be exported from the design doc.
 */
 
var templates = require('duality/templates'),
    fields = require('couchtypes/fields'),
    Form = require('couchtypes/forms').Form,
    transaction = require('./types').transaction,
    timesheet = require('./types').timesheet_line;

exports.update_transaction = function (doc, req) {
    var form = new Form(transaction);
    form.validate(req);

 if (form.isValid()) {
        return [form.values, 'Hello ' + form.values.party.name +', thank you for your '+ form.values.transaction_type];
    }   

 else {
        var content = templates.render('transaction_form.html', req, {
            form_title: 'My Form',
            method: 'POST',
            action: '/frontdesk/_design/frontdesk/_update/update_transaction',
            form: form.toHTML(req),
            input: 'Validate'
        }); 
        return [null, {content: content, title: 'Update Transaction'}];
    }   
};

exports.update_timesheet = function (doc, req) {
    var form = new Form(timesheet);
    form.validate(req);

 if (form.isValid()) {
        return [form.values, 'Thanks for your work on ' + form.values.work + ", " + form.values.creator + '!'];
    }   

 else {
        var content = templates.render('timesheet_form.html', req, {
            form_title: 'My Form',
            method: 'POST',
            action: '/frontdesk/_design/frontdesk/_update/update_timesheet',
            form: form.toHTML(req),
            input: 'Validate'
        }); 
        return [null, {content: content, title: 'Update Transaction'}];
    }   
};
