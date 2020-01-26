
const config = {};

config.IS_PROD = process.env.NODE_ENV === 'production';

config.BASE_URL = config.IS_PROD ? "https://cnodejs.org" : "https://cnodejs.org";

config.CODE_BASE_PORT = "";

config.GATEWAY_URL = config.BASE_URL + config.CODE_BASE_PORT;

export default config;