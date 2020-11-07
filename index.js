let interfaceUrl = ''
let swaggerUrl = ''
let mongoUrl = ''
const env = process.env.NODE_ENV == 'development' ? 'development' : 'production'
switch (env) {
    case 'development':
        interfaceUrl = ''
        swaggerUrl = ''
        mongoUrl = ''
        require('babel-register')
        require('./app')
        break
    case 'production':
        require('babel-register')
        require('./app')
        break
}
