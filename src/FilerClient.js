
import configureLib from '../lib/configure';
import FilerEntity from '../src/entity/File';

import uploadLib from '../lib/upload';
import retrieveLib from '../lib/retrieve';
import deleteLib from '../lib/delete';
import truncateLib from '../lib/truncate';
import serveLib from '../lib/serve';
import createUuidLib from '../lib/createUuid';
import getFileBinaryLib from '../lib/getFileBinary';
import searchLib from '../lib/search';

export const configure = configureLib;
export const File = FilerEntity;

export const upload = uploadLib;
export const retrieve = retrieveLib;
export const remove = deleteLib;
export const truncate = truncateLib;
export const serve = serveLib;
export const createUuid = createUuidLib;
export const getFileBinary = getFileBinaryLib;
export const search = searchLib;