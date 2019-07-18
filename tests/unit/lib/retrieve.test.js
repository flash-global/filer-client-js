const { Response } = require('whatwg-fetch');
const { configure, configs } = require('./../../../lib/configure');
const retrieve = require('./../../../lib/retrieve');
const File = require('./../../../src/entity/File');

it("Throw error because there is not configuration", () => {
    const uuidFixture = '6a60a3ed-1304-4797-9a08-3ee1400099a3';
    return expect(retrieve(uuidFixture)).rejects.toThrow("Please configure the client before using it!");
});

it("Reject because response not ok", () => {
    const urlFixture = 'http://filer-api.local';
    const uuidFixture = '6a60a3ed-1304-4797-9a08-3ee1400099a3';

    const responseFixture = new Response();
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    responseFixture.ok = false;

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(retrieve(uuidFixture)).rejects.toBe(responseFixture).then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files?uuid=${uuidFixture}`);

        delete configs.url;
    });
});

it("Reject because error while sending request", () => {
    const urlFixture = 'http://filer-api.local';
    const uuidFixture = '6a60a3ed-1304-4797-9a08-3ee1400099a3';

    const promiseFetchFixture = new Promise((_, reject) => reject("Error"));

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(retrieve(uuidFixture)).rejects.toEqual("Error").then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files?uuid=${uuidFixture}`);

        delete configs.url;
    });
});

it("Resolve", () => {
    const urlFixture = 'http://filer-api.local';
    const uuidFixture = '6a60a3ed-1304-4797-9a08-3ee1400099a3';
    const fileFixture = new File({uuid: uuidFixture});

    const responseFixture = new Response(JSON.stringify({data: fileFixture.toJson()}));
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(retrieve(uuidFixture)).resolves.toEqual(fileFixture.toJson()).then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files?uuid=${uuidFixture}`);

        delete configs.url;
    });
});
