import logger from 'log4js'

const loggerConfig = logger.configure({
    replaceConsole: true,
    appenders: {
        'out': {
            type: 'stdout',
            layout: {
                type: 'colored'
            }
        },
        'app-info': {
            type: 'file',
            filename: 'src/logs/info.log',
            layout: {
                type: 'pattern',
                pattern: '%d{yyyy-MM-dd} %p %c %m %n'
            },
            maxLogSize: 31457280
        },
        'app-error': {
            type: 'dateFile',
            filename: 'src/logs/error/error.log',
            layout: {
                type: 'pattern',
                pattern: '%d{yyyy-MM-dd} %[p] %c %m %n'
            },
            pattern: '-yyyy-MM-dd',
            keepFileExt: true,
            alwaysIncludePattern: true,
            compress: true
        },
        'error-files': {
            type: 'logLevelFilter',
            appender: 'app-error',
            level: 'error'
        }
    },
    categories: {
        default: {
            appenders: ['out', 'app-info', 'error-files'], level: 'all'
        }
    }
})

export {
    loggerConfig
}
