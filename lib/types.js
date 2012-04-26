/**
 * Kanso document types to export
 */

var Type = require('couchtypes/types').Type,
    fields = require('couchtypes/fields'),
    widgets = require('couchtypes/widgets');

exports.transaction = new Type('transaction', {
    fields: {
        party: {
            name: fields.string(),
            email: fields.email({required: false}),
            referred_by: fields.string({required:false})
        },
        date: fields.string({required: false}),
        transaction_type: fields.choice({values: {"donation": "Donation", "sale": "Sale"}}),
        items: fields.array(),
        payments: fields.array(),
        comments: fields.string({required: false}),
        audit: {
            creator: fields.creator({required: false}),
            createdTime: fields.createdTime()
        }
    }
});
