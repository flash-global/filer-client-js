const { Response } = require('whatwg-fetch');
const { configure, configs } = require('./../../../lib/configure');
const getFileBinary = require('./../../../lib/getFileBinary');
const File = require('./../../../src/entity/File');

it("Throw error because there is not configuration", () => {
    const fileFixture = new File();
    return expect(getFileBinary(fileFixture)).rejects.toThrow("Please configure the client before using it!");
});

it("Reject because response not ok", () => {
    const urlFixture = 'http://filer-api.local';
    const fileFixture = new File();

    const responseFixture = new Response();
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    fileFixture.uuid = 'fc678498-d8cc-4379-895e-a16573643817';
    responseFixture.ok = false;

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(getFileBinary(fileFixture)).rejects.toBe(responseFixture).then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files/data/${fileFixture.uuid}`);

        delete configs.url;
    });
});

it("Reject because error while sending request", () => {
    const urlFixture = 'http://filer-api.local';
    const fileFixture = new File();

    const promiseFetchFixture = new Promise((_, reject) => reject("Error"));

    fileFixture.uuid = 'fc678498-d8cc-4379-895e-a16573643817';

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(getFileBinary(fileFixture)).rejects.toEqual("Error").then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files/data/${fileFixture.uuid}`);

        delete configs.url;
    });
});

it("Resolve", () => {
    const urlFixture = 'http://filer-api.local';
    const fileFixture = new File();

    const responseFixture = new Response('hello');
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    fileFixture.uuid = 'fc678498-d8cc-4379-895e-a16573643817';

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    const fileResultFixture = new File(fileFixture);
    fileResultFixture.data = new Blob(['hello']);

    return expect(getFileBinary(fileFixture)).resolves.toEqual(fileResultFixture.toJson()).then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files/data/${fileFixture.uuid}`);

        delete configs.url;
    });
});
