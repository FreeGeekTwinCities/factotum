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
            city: fields.string({required: false}),
            /* the first option for 'referred by' is deliberately blank, to allow for a default of no referral source */
            referred_by: fields.choice({required: false, values: {"": "", "search:cheap-computer": "Search for cheap/free computers", "search:recycling": "Search for computer recycling","news": "News story", "flyer": "Flyer", "school": "School", "social-service": "Social service agency", "facebook": "Facebook", "twitter": "Twitter", "other": "Other"}})
        },
        /* use the "hint" option to place explanatory text by the field on the administration page */
        date: fields.string({required: false, hint: "Only needed if entry date is DIFFERENT from transaction date"}),
        transaction_type: fields.choice({values: {"donation": "Donation", "sale": "Sale"}}),
        items: fields.array({
            parseEach: function (string) {
                return {quantity: parseFloat(string.split(" ", 1)), description: string};
            }
        }),
        payments: fields.array({required: false}),
        comments: fields.string({required: false}),
        audit: {
            creator: fields.creator({required: false}),
            createdTime: fields.createdTime()
        }
    }
});
