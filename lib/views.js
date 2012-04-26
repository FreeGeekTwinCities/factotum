/**
 * Show functions to be exported from the design doc.
 */

 exports.transactions_by_date = {
    map: function (doc) {
        if (doc.type === 'transaction') {
            emit(doc.date, doc);
        }
    }
};

exports.transactionss_by_id = {
    map: function (doc) {
        if (doc.type === 'transaction') {
            emit([doc._id],null);
        }
    }
};
