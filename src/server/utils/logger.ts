import 'dotenv/config';
import log4js from 'log4js';

const serviceName = String(process.env.SERVICE_NAME);

log4js.configure({
    appenders: { [ serviceName ]: { type: 'stdout' } },
    categories: { default: { appenders: [ serviceName ], level: 'info' } }
});

export default log4js.getLogger(serviceName);
