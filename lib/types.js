/**
 * Kanso document types to export
 */

var Type = require('couchtypes/types').Type,
    fields = require('couchtypes/fields'),
    widgets = require('couchtypes/widgets');

exports.work_type = new Type('work_type', {
    fields: {
        name: fields.string(),
        code: fields.number({required: false}),
        description: fields.string({required: false})
    }
});

exports.transaction = new Type('transaction', {
    fields: {
        transaction_type: fields.choice({values: {"donation": "Donation", "sale": "Sale"}}),
        party: {
            name: fields.string(),
            email: fields.email({required: false}),
            city: fields.string({required: false}),
            /* the first option for 'referred by' is deliberately blank, to allow for a default of no referral source */
            referred_by: fields.choice({required: false, values: {"": "", "search:cheap-computer": "Search for cheap/free computers", "search:recycling": "Search for computer recycling", "news": "News story", "flyer": "Flyer", "school": "School", "social-service": "Social service agency", "facebook": "Facebook", "twitter": "Twitter", "other": "Other"}})
        },
        items: fields.array({widget: widgets.textarea({cols: 40, rows: 5}),
            /* the parseEach function should split off the numeric part of each item and use that as the item quantity; the remainder - anything after a number and a space */
            parseEach: function (string) {
                var description, quantity = parseFloat(string.split(" ", 1)[0]);
                if (!isNaN(quantity)) {
                    description = string.slice(string.indexOf(" "), string.length);
                } else {
                    description = string;
                }
                return {quantity: quantity, description: description};
            }
        }),
        payments: fields.array({required: false}),
        comments: fields.string({required: false, widget: widgets.textarea({cols: 40, rows: 2})}),
        date: fields.array({hint: "Dates should be entered in 'year,month,day' format", default_value: function (req) {return [new Date().getFullYear(), String('00'+(new Date().getMonth()+1)).slice(-2), String('00'+(new Date().getDate())).slice(-2)];}}),
        audit: {
            entered_by: fields.creator({required: false}),
            entry_time: fields.createdTime()
        }
    }
});

exports.timesheet_line = new Type('timesheet_line', {
    fields: {
        volunteer: fields.string({hint: "Your ID is typically your first inital followed by your last name - no spaces, all lower case"}),
        hours: fields.number({hint: "Round your time to the nearest quarter hour (15 min.) - for example, if you spent 2 hours and 40 minutes on something, enter '2.75'"}),
        work_type: fields.choice({values: {"build": "Build", "recycling": "Recycling", "testing": "Testing", "sales": "Sales", "admin": "Administrivia"}}),
        work_code: fields.number({required: false}),
        description: fields.string({required: false, hint: "This is a free-form (optional) description of what you've been working on"}),
        date: fields.array({hint: "Dates should be entered in 'year,month,day' format", default_value: function (req) {return [new Date().getFullYear(), String('00'+(new Date().getMonth()+1)).slice(-2), String('00'+(new Date().getDate())).slice(-2)];}}),
        audit: {
            entered_by: fields.creator({required: false}),
            entry_time: fields.createdTime({required: false})
        }
    }
});

exports.gizmo = new Type('gizmo', {
    fields: {
        id: fields.string(),
        class: fields.string({required: false}),
        description: fields.string({required: false}),
        vendor: fields.string({required: false}),
        product: fields.string({required: false}),
        version: fields.string({required: false}),
        serial: fields.string({required: false}),
        capacity: fields.string({required: false}),
        size: fields.string({required: false}),
        clock: fields.string({required: false}),
        width: fields.number({required: false}),
        slot: fields.string({required: false}),
        logicalname: fields.string({required: false}),
        dev: fields.string({required: false}),
        businfo: fields.string({required: false}),
        physid: fields.string({required: false}),
        claimed: fields.boolean({required: false}),
        children: fields.array({required: false})
    }
});

exports.person = new Type('person', {
    fields: {
        username: fields.string(),
        password: fields.string({widget: widgets.password()}),
        email: fields.email({required: false}),
        name: {
            given: fields.string({required: false}),
            family: fields.string({required: false}),
            nickname: fields.string({required: false})
        }
    }
});
