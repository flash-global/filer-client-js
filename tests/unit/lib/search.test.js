const { Response } = require('whatwg-fetch');
const { configure, configs } = require('./../../../lib/configure');
const search = require('./../../../lib/search');
const File = require('./../../../src/entity/File');

it("Throw error because there is not configuration", () => {
    const criteriasFixture = {uuid: '6a60a3ed-1304-4797-9a08-3ee1400099a3'};
    return expect(search(criteriasFixture)).rejects.toThrow("Please configure the client before using it!");
});

it("Reject because response not ok", () => {
    const urlFixture = 'http://filer-api.local/api/files';
    const criteriasFixture = {uuid: '6a60a3ed-1304-4797-9a08-3ee1400099a3'};

    const responseFixture = new Response();
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    responseFixture.ok = false;

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(search(criteriasFixture)).rejects.toBe(responseFixture).then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files?criterias=${JSON.stringify(criteriasFixture)}`);

        delete configs.url;
    });
});

it("Reject because error while sending request", () => {
    const urlFixture = 'http://filer-api.local/api/files';
    const criteriasFixture = {uuid: '6a60a3ed-1304-4797-9a08-3ee1400099a3'};

    const promiseFetchFixture = new Promise((_, reject) => reject("Error"));

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(search(criteriasFixture)).rejects.toEqual("Error").then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files?criterias=${JSON.stringify(criteriasFixture)}`);

        delete configs.url;
    });
});

it("Resolve", () => {
    const urlFixture = 'http://filer-api.local/api/files';
    const criteriasFixture = {uuid: '6a60a3ed-1304-4797-9a08-3ee1400099a3'};
    const fileFixture = new File({uuid: '6a60a3ed-1304-4797-9a08-3ee1400099a3'});

    const responseFixture = new Response(JSON.stringify({files: [fileFixture.toJson()]}));
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(search(criteriasFixture)).resolves.toEqual([fileFixture.toJson()]).then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);

        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files?criterias=${JSON.stringify(criteriasFixture)}`);

        delete configs.url;
    });
});

it("Resolve with no criterias", () => {
    const urlFixture = 'http://filer-api.local/api/files';
    const fileFixture = new File({uuid: '6a60a3ed-1304-4797-9a08-3ee1400099a3'});

    const responseFixture = new Response(JSON.stringify({files: [fileFixture.toJson()]}));
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(search()).resolves.toEqual([fileFixture.toJson()]).then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);

        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files?criterias={}`);

        delete configs.url;
    });
});
