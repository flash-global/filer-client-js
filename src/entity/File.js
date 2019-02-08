import { camelCase } from 'lodash';

class File {
  constructor(args = {}) {
    this._contexts = [];
    this._revision = 1;

    Object.keys(args).map((key) => {
      this[camelCase(key)] = args[key];

      return null;
    });
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get uuid() {
    return this._uuid;
  }

  set uuid(uuid) {
    this._uuid = uuid;
  }

  get filename() {
    return this._filename;
  }

  set filename(filename) {
    this._filename = filename;
  }

  get revision() {
    return this._revision;
  }

  set revision(rev) {
    this._revision = rev;
  }

  get category() {
    return this._category;
  }

  set category(category) {
    this._category = category;
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(createdAt) {
    this._createdAt = createdAt;
  }

  get contentType() {
    return this._contentType;
  }

  set contentType(contentType) {
    this._contentType = contentType;
  }

  get data() {
    return this._data;
  }

  set data(data) {
    this._data = data;
  }

  get contexts() {
    return this._contexts;
  }

  set contexts(context) {
    this._contexts = context;
  }

  toJson() {
    const prototype = Object.getPrototypeOf(this);
    let properties = Object.getOwnPropertyNames(prototype);
    properties = properties.filter(name => typeof this[name] !== 'function');

    const objectToReturn = {};

    Object
      .values(properties)
      .map(property => {
        objectToReturn[property] = this[property];

        return null;
      });

      return objectToReturn;
  }
}

File.CATEGORY_LOGO = 1;
File.CATEGORY_IMG = 2;
File.CATEGORY_INVOICE = 3;
File.CATEGORY_CMR = 4;
File.CATEGORY_MISCELLANEOUS = 5;
File.CATEGORY_SINISTRE = 6;
File.CATEGORY_MAIL = 7;
File.CATEGORY_EDI = 8;
File.CATEGORY_REIMBURSEMENT = 9;
File.CATEGORY_SUPPLIER = 10;
File.CATEGORY_CLIENT = 11;
File.CATEGORY_INVOICE_TEMP = 12;
File.CATEGORY_CREDIT_NOTE = 13;
File.CATEGORY_GLOBAL_INVOICE = 14;
File.CATEGORY_GLOBAL_INVOICE_TEMP = 15;
File.CATEGORY_INVOICE_INTERFACE = 16;

File.ASYNC_UPLOAD = 2;
File.NEW_REVISION = 4;
File.FORCE_DOWNLOAD = 1;
File.FORCE_INLINE = 0;

export default File;