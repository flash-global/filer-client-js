const { configs, hasBeenConfigured } = require("./configure");
const validate = require("../src/validator/FileValidator");
const File = require("../src/entity/File");

module.exports = (file, flags = null) => {
    return new Promise((resolve, reject) => {
        hasBeenConfigured();

        if (flags & File.NEW_REVISION && file.uuid === null) {
            return reject("UUID must be set when adding a new revision");
        }

        let method = "POST";

        if (flags & File.NEW_REVISION) {
            method = "PUT";
        }

        validate(file).then(v => {
            if (v.valid) {
                return fetch(configs.url, {
                    method: method,
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: encodeURIComponent(`file=${JSON.stringify(file.toJson())}`)
                }).then(response => {
                    if (response.ok === false) {
                        return reject(response);
                    }
                    return response.json().then(data => {
                        resolve(data);
                    });
                });
            }
            throw reject(v.errors);
        });
    });
};
