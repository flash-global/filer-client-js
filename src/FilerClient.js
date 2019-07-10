const configureLib = require("../lib/configure");
const FilerEntity = require("../src/entity/File");

const uploadLib = require("../lib/upload");
const retrieveLib = require("../lib/retrieve");
const deleteLib = require("../lib/delete");
const truncateLib = require("../lib/truncate");
const serveLib = require("../lib/serve");
const createUuidLib = require("../lib/createUuid");
const getFileBinaryLib = require("../lib/getFileBinary");
const searchLib = require("../lib/search");

exports.configure = configureLib;
exports.File = FilerEntity;

exports.upload = uploadLib;
exports.retrieve = retrieveLib;
exports.remove = deleteLib;
exports.truncate = truncateLib;
exports.serve = serveLib;
exports.createUuid = createUuidLib;
exports.getFileBinary = getFileBinaryLib;
exports.search = searchLib;
