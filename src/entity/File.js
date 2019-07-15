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

  #id;
  #uuid;
  #filename;
  #revision;
  #category;
  #createdAt;
  #contentType;
  #data;
  #contexts;

  constructor(args = {}) {
      this.#contexts = [];
      this.#revision = 1;

      ["id", "uuid", "filename", "revision", "category", "createdAt", "contentType", "data", "contexts"].forEach((attributeName) => {
          if (attributeName in args) {
              this[attributeName] = args[attributeName];
          }
      })
  }

  get id() {
      return this.#id;
  }

  set id(id) {
      this.#id = id;
  }

  get uuid() {
      return this.#uuid;
  }

  set uuid(uuid) {
      this.#uuid = uuid;
  }

  get filename() {
      return this.#filename;
  }

  set filename(filename) {
      this.#filename = filename;
  }

  get revision() {
      return this.#revision;
  }

  set revision(rev) {
      this.#revision = rev;
  }

  get category() {
      return this.#category;
  }

  set category(category) {
      this.#category = category;
  }

  get createdAt() {
      return this.#createdAt;
  }

  set createdAt(createdAt) {
      this.#createdAt = createdAt;
  }

  get contentType() {
      return this.#contentType;
  }

  set contentType(contentType) {
      this.#contentType = contentType;
  }

  get data() {
      return this.#data;
  }

  set data(data) {
      this.#data = data;
  }

  get contexts() {
      return this.#contexts;
  }

  set contexts(context) {
      this.#contexts = context;
  }

  toJson() {
      const prototype = Object.getPrototypeOf(this);
      const properties = Object.getOwnPropertyNames(prototype).filter(name => typeof this[name] !== "function");

      const objectToReturn = {};

      Object.values(properties).map(property => {
          objectToReturn[property] = this[property];

          return null;
      });

      return objectToReturn;
  }
}

module.exports = File;
