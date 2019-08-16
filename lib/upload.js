const { configs, hasBeenConfigured } = require("./configure");
const validate = require("../src/validator/FileValidator");
const File = require("../src/entity/File");

module.exports = (file, flags = null) => new Promise((resolve, reject) => {
    hasBeenConfigured();

    if (flags & File.NEW_REVISION && file.uuid === null) {
        return reject("UUID must be set when adding a new revision");
    }

    let method = "POST";

    if (flags & File.NEW_REVISION) {
        method = "PUT";
    }

    validate(file).then((validationResult) => {
        if (!validationResult.valid) {
            return reject(validationResult.errors);
        }

        fetch(`${configs.url}/api/files`, {
            method: method,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `file=${encodeURIComponent(JSON.stringify(file.toJson()))}`,
        }).then((response) => {
            if (response.ok === false) {
                return reject(response);
            }

            response.json().then(data => {
                resolve(data);
            });
        }).catch((error) => reject(error));
    }).catch((error) => reject(error));
});
