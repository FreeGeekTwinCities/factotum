/**
 * Filter functions to be exported from the design doc.
 */
 
exports.user = function(doc, req) {
    if (doc.type && doc.type === 'user') {
        return true;
    } 
    
    else {
        return false;
    }
}
