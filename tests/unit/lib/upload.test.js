const { Response } = require('whatwg-fetch');
const { configure, configs } = require('./../../../lib/configure');
const upload = require('./../../../lib/upload');
const File = require('./../../../src/entity/File');

it("Throw error because there is not configuration", () => {
    const fileFixture = new File({uuid: '6a60a3ed-1304-4797-9a08-3ee1400099a3'});
    return expect(upload(fileFixture)).rejects.toThrow("Please configure the client before using it!");
});

it("Throw error because required uuid is null", () => {
    const urlFixture = 'http://filer-api.local';
    const fileFixture = new File({uuid: null});

    configure({url: urlFixture});

    return expect(upload(fileFixture, File.NEW_REVISION)).rejects.toEqual("UUID must be set when adding a new revision").then(() => delete configs.url);
});

it("Reject because validation", () => {
    const urlFixture = 'http://filer-api.local';
    const fileFixture = new File();
    const errorsFixture = {
        category: "The category cannot be empty",
        contentType: "Content Type cannot be empty",
        createdAt: "Creation date and time cannot be empty",
        data: "Data cannot be empty",
        filename: "The filename cannot ben an empty string"
    };

    configure({url: urlFixture});

    return expect(upload(fileFixture, File.NEW_REVISION)).rejects.toEqual(errorsFixture).then(() => delete configs.url);
});

it("Reject because response not ok", () => {
    const urlFixture = 'http://filer-api.local';
    const fileFixture = new File({
        category: 1,
        contentType: 'txt',
        createdAt: '2019-01-01 12:12:12',
        data: 'test',
        filename: 'test.txt',
    });

    const responseFixture = new Response();
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    responseFixture.ok = false;

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(upload(fileFixture)).rejects.toBe(responseFixture).then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files`);
        expect(global.fetch.mock.calls[0][1]).toEqual({
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `file=${encodeURIComponent(JSON.stringify(fileFixture.toJson()))}`,
        });

        delete configs.url;
    });
});

it("Reject because error while sending request", () => {
    const urlFixture = 'http://filer-api.local';
    const fileFixture = new File({
        category: 1,
        contentType: 'txt',
        createdAt: '2019-01-01 12:12:12',
        data: 'test',
        filename: 'test.txt',
    });

    const promiseFetchFixture = new Promise((_, reject) => reject("Error"));

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(upload(fileFixture)).rejects.toEqual("Error").then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files`);
        expect(global.fetch.mock.calls[0][1]).toEqual({
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `file=${encodeURIComponent(JSON.stringify(fileFixture.toJson()))}`,
        });

        delete configs.url;
    });
});

it("Resolve POST", () => {
    const urlFixture = 'http://filer-api.local';
    const responseDataFixture = {uuid: 'f5b004a8-a9f1-463a-afe0-e55aa746d203'};
    const fileFixture = new File({
        category: 1,
        contentType: 'txt',
        createdAt: '2019-01-01 12:12:12',
        data: 'test',
        filename: 'test.txt',
    });

    const responseFixture = new Response(JSON.stringify(responseDataFixture));
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(upload(fileFixture)).resolves.toEqual(responseDataFixture).then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files`);
        expect(global.fetch.mock.calls[0][1]).toEqual({
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `file=${encodeURIComponent(JSON.stringify(fileFixture.toJson()))}`,
        });

        delete configs.url;
    });
});

it("Resolve PUT", () => {
    const urlFixture = 'http://filer-api.local';
    const responseDataFixture = {uuid: 'f5b004a8-a9f1-463a-afe0-e55aa746d203'};
    const fileFixture = new File({
        category: 1,
        contentType: 'txt',
        createdAt: '2019-01-01 12:12:12',
        data: 'test',
        filename: 'test.txt',
        uuid: 'bck1:f5b004a8-a9f1-463a-afe0-e55aa746d203',
    });

    const responseFixture = new Response(JSON.stringify(responseDataFixture));
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(upload(fileFixture, File.NEW_REVISION)).resolves.toEqual(responseDataFixture).then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files`);
        expect(global.fetch.mock.calls[0][1]).toEqual({
            method: 'PUT',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `file=${encodeURIComponent(JSON.stringify(fileFixture.toJson()))}`,
        });

        delete configs.url;
    });
});
