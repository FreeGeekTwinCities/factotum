/**
 * Rewrite settings to be exported from the design doc
 */

module.exports = [
    {from: '/static/*', to: 'static/*'},
    {from: '/', to: '_list/transaction_list/transactionss_by_date'},
    {from: '/transaction/:id', to: '_list/transaction/transactions_by_id', query: {
        limit: '1',
        key: [':id'],
        include_docs: 'true'
    }},
    {from: '*', to: '_show/not_found'}
];
