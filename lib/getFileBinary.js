const { configs, hasBeenConfigured } = require("./configure");
const File = require("../src/entity/File");

module.exports = file => new Promise((resolve, reject) => {
    hasBeenConfigured();

    let fileEntity = new File(file);

    fetch(`${configs.url}/data/${fileEntity.uuid}`).then((response) => {
        if (response.ok === false) {
            return reject(response);
        }

        response.blob().then((myBlob) => {
            fileEntity.data = myBlob;
            resolve(fileEntity.toJson());
        });
    }).catch((error) => reject(error));
});
