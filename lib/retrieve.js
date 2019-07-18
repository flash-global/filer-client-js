const { configs, hasBeenConfigured } = require("./configure");
const File = require("../src/entity/File");

module.exports = (uuid) => new Promise((resolve, reject) => {
    hasBeenConfigured();

    fetch(`${configs.url}/api/files?uuid=${uuid}`).then((response) => {
        if (response.ok === false) {
            return reject(response);
        }

        response.json().then((data) => resolve(new File(data.data).toJson()));
    }).catch((error) => reject(error));
});
