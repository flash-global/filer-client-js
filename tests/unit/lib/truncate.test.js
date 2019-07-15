const { Response } = require('whatwg-fetch');
const { configure, configs } = require('./../../../lib/configure');
const truncate = require('./../../../lib/truncate');

it("Throw error because there is not configuration", () => {
    const uuidFixture = '6a60a3ed-1304-4797-9a08-3ee1400099a3';
    return expect(truncate(uuidFixture)).rejects.toThrow("Please configure the client before using it!");
});

it("Reject because response not ok", () => {
    const urlFixture = 'http://filer-api.local/api/files';
    const uuidFixture = '6a60a3ed-1304-4797-9a08-3ee1400099a3';

    const responseFixture = new Response();
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    responseFixture.ok = false;

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(truncate(uuidFixture)).rejects.toBe(responseFixture).then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files/truncate?uuid=${uuidFixture}&keep=0`);

        delete configs.url;
    });
});

it("Reject because error while sending request", () => {
    const urlFixture = 'http://filer-api.local/api/files';
    const uuidFixture = '6a60a3ed-1304-4797-9a08-3ee1400099a3';

    const promiseFetchFixture = new Promise((_, reject) => reject("Error"));

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(truncate(uuidFixture)).rejects.toEqual("Error").then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files/truncate?uuid=${uuidFixture}&keep=0`);

        delete configs.url;
    });
});

it("Resolve", () => {
    const urlFixture = 'http://filer-api.local/api/files';
    const uuidFixture = '6a60a3ed-1304-4797-9a08-3ee1400099a3';
    const resultFixture = {uuid: uuidFixture};

    const responseFixture = new Response(JSON.stringify(resultFixture));
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(truncate(uuidFixture)).resolves.toEqual(resultFixture).then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files/truncate?uuid=${uuidFixture}&keep=0`);

        delete configs.url;
    });
});

it("Resolve with keep versions", () => {
    const urlFixture = 'http://filer-api.local/api/files';
    const uuidFixture = '6a60a3ed-1304-4797-9a08-3ee1400099a3';
    const resultFixture = {uuid: uuidFixture};
    const keepFixture = 5;

    const responseFixture = new Response(JSON.stringify(resultFixture));
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(truncate(uuidFixture, keepFixture)).resolves.toEqual(resultFixture).then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files/truncate?uuid=${uuidFixture}&keep=${keepFixture}`);

        delete configs.url;
    });
});
