///////////////////////////////////////////////////////
//                                                   //
//                      UPLOAD                       //
//                                                   //
///////////////////////////////////////////////////////

// FilerClient.upload(file, 4)
// .then(response => console.log(response));


///////////////////////////////////////////////////////
//                                                   //
//                      SERVE                        //
//                                                   //
///////////////////////////////////////////////////////

// FilerClient.serve('bck1:8733e10d-5b1a-4bd1-b8d6-1c9c036323d5');

///////////////////////////////////////////////////////
//                                                   //
//                      CREATE UUID                  //
//                                                   //
///////////////////////////////////////////////////////

// FilerClient.createUuid(1).then(response => {
//   console.log(response);
// });


///////////////////////////////////////////////////////
//                                                   //
//                      GET BINARY                   //
//                                                   //
///////////////////////////////////////////////////////

// file.uuid = 'bck1:ca96701d-3c4c-4ed0-8cac-f3ccfa0efb54';
// FilerClient.getFileBinary(file).then(response => {
//   console.log(response);
// });

///////////////////////////////////////////////////////
//                                                   //
//                      DELETE (REMOVE)              //
//                                                   //
///////////////////////////////////////////////////////

// FilerClient.remove('bck1:ca96701d-3c4c-4ed0-8cac-f3ccfa0efb54', 4)
// .then(response => console.log(response));

///////////////////////////////////////////////////////
//                                                   //
//                      SEARCH                       //
//                                                   //
///////////////////////////////////////////////////////

  // FilerClient.search({category: 1, filename: "toto.jpg"})
  // .then(response => console.log(response));

///////////////////////////////////////////////////////
//                                                   //
//                      TRUNCATE                     //
//                                                   //
///////////////////////////////////////////////////////

// FilerClient.truncate('bck1:ca96701d-3c4c-4ed0-8cac-f3ccfa0efb54', 2)
// .then(response => console.log(response));

///////////////////////////////////////////////////////
//                                                   //
//                      RETRIEVE                     //
//                                                   //
///////////////////////////////////////////////////////

// FilerClient.retrieve('bck1:ca96701d-3c4c-4ed0-8cac-f3ccfa0efb54')
// .then(response => console.log(response));
