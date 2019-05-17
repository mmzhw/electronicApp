const path = require('path');

module.exports = {
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src/'),
            assets: path.resolve(__dirname, 'src/assets/'),
            utils: path.resolve(__dirname, 'src/utils/'),
            services: path.resolve(__dirname, 'src/services/'),
        },
    },
};
