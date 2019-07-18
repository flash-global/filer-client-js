const {camelCase} = require('lodash');

class File {
    static CATEGORY_LOGO = 1;
    static CATEGORY_IMG = 2;
    static CATEGORY_INVOICE = 3;
    static CATEGORY_CMR = 4;
    static CATEGORY_MISCELLANEOUS = 5;
    static CATEGORY_SINISTRE = 6;
    static CATEGORY_MAIL = 7;
    static CATEGORY_EDI = 8;
    static CATEGORY_REIMBURSEMENT = 9;
    static CATEGORY_SUPPLIER = 10;
    static CATEGORY_CLIENT = 11;
    static CATEGORY_INVOICE_TEMP = 12;
    static CATEGORY_CREDIT_NOTE = 13;
    static CATEGORY_GLOBAL_INVOICE = 14;
    static CATEGORY_GLOBAL_INVOICE_TEMP = 15;
    static CATEGORY_INVOICE_INTERFACE = 16;

    static FORCE_INLINE = 0;
    static FORCE_DOWNLOAD = 1;
    static ASYNC_UPLOAD = 2;
    static NEW_REVISION = 4;

    id;
    uuid;
    filename;
    revision = 1;
    category;
    createdAt;
    contentType;
    data;
    contexts = [];

    constructor(args = {}) {
        Object.keys(args)
            .filter((key) => camelCase(key) in this)
            .forEach((key) => this[camelCase(key)] = args[key]);
    }

    toJson() {
        const objectToReturn = {};

        Object.keys(this).forEach((property) => {
            objectToReturn[property] = this[property];
        });

        return objectToReturn;
    }
}

module.exports = File;
