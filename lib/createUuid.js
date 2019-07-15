const { configs, hasBeenConfigured } = require("./configure");

module.exports = (category) => new Promise((resolve, reject) => {
    hasBeenConfigured();

    fetch(
        `${configs.url}/uuid?category=${category}`,
        {
            method: "post",
            headers: { "content-type": "application/x-www-urlencoded" },
        },
    ).then((response) => {
        if (response.ok === false) {
            return reject(response);
        }

        response.json().then((data) => resolve(data));
    }).catch((error) => reject(error));
});
