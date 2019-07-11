let configured = false;
let configs = {};

exports.hasBeenConfigured = () => {
    if (configured === false) {
        throw new Error("Please configure the client before using it!");
    }
};

exports.configs = configs;

exports.configure = (configurations) => {
    Object.assign(configs, configurations);

    if (configs.url) {
        configured = true;
    }
};
