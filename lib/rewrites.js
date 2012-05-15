/**
 * Rewrite settings to be exported from the design doc
 */

module.exports = [
    {from: '/static/*', to: 'static/*'},
    {from: '/bootstrap/*', to: 'bootstrap/*'},
    {from: '/', to: '_list/transaction_list/transactions_by_date'},
    {from: '/transaction/add', to: '_show/transaction_form'},
    {from: '/timesheet/add', to: '_show/timesheet_form'},
    {from: '/transaction/:id', to: '_list/transaction/transactions_by_id', query: {
        limit: '1',
        key: [':id'],
        include_docs: 'true'
    }},
    {from: '*', to: '_show/not_found'}
];
