const { configs, hasBeenConfigured } = require("./configure");

module.exports = (uuid, keep = 0) => new Promise((resolve, reject) => {
    hasBeenConfigured();

    fetch(
        `${configs.url}/truncate?uuid=${uuid}&keep=${keep}`,
        { method: "delete" },
    ).then((response) => {
        if (response.ok === false) {
            return reject(response);
        }

        response.json().then((data) => {
            resolve(data);
        });
    });
});
