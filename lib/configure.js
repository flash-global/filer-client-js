let configured = false;

export const hasBeenConfigured = function hasBeenConfigured() {
    if (configured === false) {
        throw new Error('Please configure the client before using it!');
    }
};

export const configs = {};

export default function (configurations) {
    Object.assign(configs, configurations);

    if (configs.url) {
        configured = true;
    }
}