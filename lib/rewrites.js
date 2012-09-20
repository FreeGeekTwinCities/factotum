/**
 * Rewrite settings to be exported from the design doc
 */

module.exports = [
    {from: '/static/*', to: 'static/*'},
    {from: '/bootstrap/*', to: 'bootstrap/*'},
    {from: '/kanso-topbar/*', to: 'kanso-topbar/*'},
    {from: '/', to: '_list/timesheet_list/timesheets_by_date'},
    {from: '/transactions', to: '_list/transaction_list/transactions_by_date'},
    {from: '/timesheets', to: '_list/timesheet_list/timesheets_by_date'},
    {from: '/transactions.csv', to: '_list/transaction_csv/transactions_by_date'},
    {from: '/reports/', to: '_show/reports'},
    {from: '/reports/sales/monthly', to: '_list/sales_report/sales_by_date?group_level=2'},
    {from: '/reports/sales/credit', to: '_list/credit_sales_report/credit_sales'},
    {from: '/systems', to: '_list/system_list/systems'},
    {from: '/transaction/add', to: '_show/transaction_form'},
    {from: '/timesheet/add', to: '_show/timesheet_form'},
    {from: '/timesheet/edit/:id', to: '_show/timesheet_form/:id'},
    {from: '/user/add', to: '_show/user_form'},
    {from: '/transaction/:id', to: '_show/transaction/:id'},
    {from: '/timesheet/:volunteer', to: '_list/volunteer_timesheet/timesheets_by_volunteer?key=":volunteer"'},
    //{from: '/transaction/:id', to: '_list/transaction/transactions_by_id', query: {
    //    limit: '1',
    //    key: [':id'],
    //    include_docs: 'true'
    //}},
    {from: '/transaction/edit/:id', to: '_show/transaction_form/:id'},
    {from: '/system/:id', to: '_list/system/systems_by_id', query: {
        limit: '1',
        key: [':id'],
        include_docs: 'true'
    }},
    {from: '*', to: '_show/not_found'}
];
