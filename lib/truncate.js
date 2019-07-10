const { configs, hasBeenConfigured } = require("./configure");

module.exports = (uuid, keep = 0) => {
    return new Promise((resolve, reject) => {
        hasBeenConfigured();

        return fetch(`${configs.url}/truncate?uuid=${uuid}&keep=${keep}`, {
            method: "delete",
            headers: {}
        }).then(response => {
            if (response.ok === false) {
                return reject(response);
            }
            return response.json().then(data => {
                resolve(data);
            });
        });
    });
};
