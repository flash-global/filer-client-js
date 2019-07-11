const { Response } = require('whatwg-fetch');
const { configure, configs } = require('./../../../lib/configure');
const createUuid = require('./../../../lib/createUuid');
const File = require('./../../../src/entity/File');

it("Throw error because there is not configuration", () => {
    return expect(createUuid(File.CATEGORY_CMR)).rejects.toThrow("Please configure the client before using it!");
});

it("Reject because response not ok", () => {
    const urlFixture = 'http://filer-api.local/api/files';
    const categoryFixture = File.CATEGORY_CMR;

    const responseFixture = new Response();
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    responseFixture.ok = false;

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(createUuid(categoryFixture)).rejects.toBe(responseFixture).then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files/uuid?category=${categoryFixture}`);
        expect(global.fetch.mock.calls[0][1]).toEqual(
            {
                method: "post",
                headers: { "content-type": "application/x-www-urlencoded" },
            }
        );

        delete configs.url;
    });
});

it("Reject because error while sending request", () => {
    const urlFixture = 'http://filer-api.local/api/files';
    const categoryFixture = File.CATEGORY_CMR;

    const promiseFetchFixture = new Promise((_, reject) => reject("Error"));

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(createUuid(categoryFixture)).rejects.toBe("Error").then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files/uuid?category=${categoryFixture}`);
        expect(global.fetch.mock.calls[0][1]).toEqual(
            {
                method: "post",
                headers: { "content-type": "application/x-www-urlencoded" },
            }
        );

        delete configs.url;
    });
});

it("Resolve", () => {
    const urlFixture = 'http://filer-api.local/api/files';
    const categoryFixture = File.CATEGORY_CMR;
    const uuidResultFixture = { uuid: 'f5b004a8-a9f1-463a-afe0-e55aa746d203' };

    const responseFixture = new Response(JSON.stringify(uuidResultFixture));
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(createUuid(categoryFixture)).resolves.toEqual(uuidResultFixture).then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://filer-api.local/api/files/uuid?category=${categoryFixture}`);
        expect(global.fetch.mock.calls[0][1]).toEqual(
            {
                method: "post",
                headers: { "content-type": "application/x-www-urlencoded" },
            }
        );

        delete configs.url;
    });
});
