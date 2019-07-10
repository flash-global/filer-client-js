const { configs, hasBeenConfigured } = require("./configure");
const File = require("../src/entity/File");

module.exports = (criterias = {}) => {
    return new Promise((resolve, reject) => {
        hasBeenConfigured();

        return fetch(`${configs.url}?criterias=${JSON.stringify(criterias)}`, {
            method: "get",
            headers: {}
        }).then(response => {
            if (response.ok === false) {
                return reject(response);
            }

            let fileArray = [];

            return response.json().then(data => {
                data.files.map(file => {
                    fileArray.push(new File(file).toJson());
                });
                resolve(fileArray);
            });
        });
    });
};
