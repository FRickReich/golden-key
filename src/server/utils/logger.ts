import 'dotenv/config';
import log4js from 'log4js';

const serviceName = process.env.SERVICE_NAME || 'default';

log4js.configure({
    appenders: { [ serviceName ]: { type: 'stdout' } },
    categories: { default: { appenders: [ serviceName ], level: 'info' } }
});

export default log4js.getLogger(serviceName);
