require('dotenv').config();

const serverConfig = {
    PORT: process.env.PORT,
    MODE: process.env.MODE
};

module.exports = serverConfig;