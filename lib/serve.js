const { configs, hasBeenConfigured } = require("./configure");
const File = require("../src/entity/File");
const retrieve = require("./retrieve");

module.exports = uuid => {
    return new Promise(() => {
        hasBeenConfigured();

        retrieve(uuid).then(response => {
            const { contentType } = new File(response).toJson();

            fetch(`${configs.url}/data/${uuid}`, {
                method: "get",
                headers: {}
            }).then(response => {
                response.blob().then(myBlob => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const dataUrl = reader.result;
                        const base64 = dataUrl.split(",")[1];
                        const response = `data:${contentType};base64,${base64}`;

                        const link = document.createElement("a");
                        document.body.appendChild(link);
                        link.href = response;
                        link.download = `file_${new Date().toISOString()}`;
                        link.click();
                    };
                    reader.readAsDataURL(myBlob);
                });
            });
        });
    });
};
