import Koa from 'koa'
const fs = require('fs')
import path from 'path'
import cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'
// import serve from 'koa-static'

// import moment from 'moment'
import uuid from 'uuid/v1'

// import { ip, port } from './utils/ip'
// import { swaggerUI } from './config'
// import { loggerConfig } from './utils/logger'
// const logger = loggerConfig.getLogger()

const app = new Koa()

// global.moment = moment
global.uuid = uuid

import router from './router/index.js'
// console.log(router)

app.use(bodyParser())
    .use(cors({
        origin: function (ctx) {
            return '*'
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT'],
        allowHeaders: ['Content-Type','Content-Length', 'Authorization', 'Accept',' X-Requested-With','yourHeaderFeild']
    }))

    // .use(serve(path.join(__dirname + '/views/')))

    .use(async (ctx, next) => {
        try {
            await next()
        } catch (err) {
            ctx.body = {
                status: 500,
                message: '系统出错，请稍后再试'
            }
        }
    })

    .use(router.routes())

    .use(router.allowedMethods())

    // .use(swaggerUI)

    .on('error', (err) => {
        console.log(err)
    })

    .listen(40100, () => {
        console.log(`koa server listening on port http://localhost:40100`)
        // console.log(`swagger server listening on port http://localhost:${port}/swagger-ui`)
    })

export default app
