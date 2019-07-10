import * as FilerClient from './FilerClient.js';

global.FilerClient = FilerClient;

export const {
  File,
  serve,
  upload,
  remove,
  search,
  truncate,
  retrieve,
  createUuid,
  getFileBinary,
} = FilerClient;
