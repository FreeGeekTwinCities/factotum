/**
 * List functions to be exported from the design doc.
 */

var templates = require('duality/templates');


exports.transaction_list = function (head, req) {

    log('calling transaction list');
    log(head);

    start({code: 200, headers: {'Content-Type': 'text/html'}});

    // fetch all the rows
    var transaction, transactions= [];

    while (transaction = getRow()) {
        transactions.push(transaction);
    }

    // generate the markup for a list of transactions
    var content = templates.render('transaction_list.html', req, {
        transactions: transactions
    });

    return {title: 'Transaction Index', content: content};

};

exports.transaction = function (head, req) {

    start({code: 200, headers: {'Content-Type': 'text/html'}});
    
    // fetch row and set page.
    var row = [];
    var transaction;
    if (row = getRow()) {
    	transaction = row.doc
    }
    else {
        return {
    	    title: '404 - Not Found',
	        content: 'transaction not found'
    	};
    }

    // generate the markup for the transaction
    var content = templates.render("transaction_detail.html", req, {
        transaction: transaction
    });

    return {title: transaction._id, content: content};

};
