const { configs, hasBeenConfigured } = require("./configure");
const File = require("../src/entity/File");

module.exports = (criterias = {}) => new Promise((resolve, reject) => {
    hasBeenConfigured();

    fetch(`${configs.url}?criterias=${JSON.stringify(criterias)}`).then((response) => {
        if (response.ok === false) {
            return reject(response);
        }

        response.json().then((data) => {
            let fileArray = data.files.map((file) => (new File(file).toJson()));

            resolve(fileArray);
        });
    }).catch((error) => reject(error));
});
