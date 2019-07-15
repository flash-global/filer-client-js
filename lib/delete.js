const { configs, hasBeenConfigured } = require("./configure");

module.exports = (uuid, revision = null) => new Promise((resolve, reject) => {
    hasBeenConfigured();

    let baseUrl = configs.url;
    let appendParams = "";

    if (revision !== null) {
        baseUrl = `${configs.url}/revisions`;
        appendParams = `&rev=${revision}`;
    }

    fetch(
        `${baseUrl}?uuid=${uuid}${appendParams}`,
        { method: "delete" },
    ).then((response) => {
        if (response.ok === false) {
            return reject(response);
        }

        response.json().then(data => resolve(data));
    }).catch((error) => reject(error));
});
