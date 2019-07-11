const { Response } = require('whatwg-fetch');
const { configure, configs } = require('./../../../lib/configure');
const deleteMethod = require('./../../../lib/delete');

it("Throw error because there is not configuration", () => {
    const uuidFixture = '6a60a3ed-1304-4797-9a08-3ee1400099a3';
    return expect(deleteMethod(uuidFixture)).rejects.toThrow("Please configure the client before using it!");
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

    return expect(deleteMethod(uuidFixture)).rejects.toBe(responseFixture).then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files?uuid=${uuidFixture}`);
        expect(global.fetch.mock.calls[0][1]).toEqual({ method: "delete" });

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

    return expect(deleteMethod(uuidFixture)).rejects.toBe("Error").then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files?uuid=${uuidFixture}`);
        expect(global.fetch.mock.calls[0][1]).toEqual({ method: "delete" });

        delete configs.url;
    });
});

it("Resolve without revision", () => {
    const urlFixture = 'http://filer-api.local/api/files';
    const uuidFixture = '6a60a3ed-1304-4797-9a08-3ee1400099a3';
    const uuidResultFixture = { uuid: 'f5b004a8-a9f1-463a-afe0-e55aa746d203' };

    const responseFixture = new Response(JSON.stringify(uuidResultFixture));
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(deleteMethod(uuidFixture)).resolves.toEqual(uuidResultFixture).then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files?uuid=${uuidFixture}`);
        expect(global.fetch.mock.calls[0][1]).toEqual({ method: "delete" });

        delete configs.url;
    });
});

it("Resolve with revision", () => {
    const urlFixture = 'http://filer-api.local/api/files';
    const uuidFixture = '6a60a3ed-1304-4797-9a08-3ee1400099a3';
    const revisionFixture = 2;
    const uuidResultFixture = { uuid: 'f5b004a8-a9f1-463a-afe0-e55aa746d203' };

    const responseFixture = new Response(JSON.stringify(uuidResultFixture));
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(deleteMethod(uuidFixture, revisionFixture)).resolves.toEqual(uuidResultFixture).then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files/revisions?uuid=${uuidFixture}&rev=${revisionFixture}`);
        expect(global.fetch.mock.calls[0][1]).toEqual({ method: "delete" });

        delete configs.url;
    });
});
