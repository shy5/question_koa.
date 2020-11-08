import koaSwagger from 'koa2-swagger-ui'
// import swaggerJSDoc from 'swagger-jsdoc'

import { ip, port } from '../utils/ip'
import { getDirName } from '../utils/common'

// const dirList = getDirName('./src/routes')

// const swaggerSpec = dirList.map(dirName => {
//     return {
//         dirName: `${dirName}`,
//         swaggerJSDoc: swaggerJSDoc({
//             swaggerDefinition: {
//                 info: {
//                     title: `${dirName}-Server`,
//                     version: '1.0.0',
//                     description: `${dirName}-Server`,
//                 },
//                 host: `http://localhost:${port}`,
//                 basePath: `/${dirName}`
//             },
//             apis: [`**/routes/${dirName}/index.js`]
//         })
//     }
// })

// const urls = dirList.map(dirName => {
//     return {
//         url: `http://localhost:${port}/${dirName}`,
//         name: dirName
//     }
// })

// const swaggerUI = koaSwagger({
//     routePrefix: '/swagger-ui',
//     swaggerOptions: {
//         urls: urls
//     }
// })

const mongoConfig = {
    // url: 'mongodb://hzbi:199695@106.14.10.18:27017/hzbi_blog_api',
    url: 'mongodb://localhost:27017/question_koa',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
}

const userSchemaConfig = {
    // autoIndex: true,
    _id: true,
    collection: 'user', // 这里是为了避免新建的表会带上 s 后缀
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }
}

const questionSchemaConfig = {
    // autoIndex: true,
    _id: true,
    collection: 'question', // 这里是为了避免新建的表会带上 s 后缀
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }
}

const labelSchemaConfig = {
    // autoIndex: true,
    id: true,
    collection: 'label', // 这里是为了避免新建的表会带上 s 后缀
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }
}

export {
    // swaggerSpec,
    // swaggerUI,
    mongoConfig,
    userSchemaConfig,
    questionSchemaConfig,
    labelSchemaConfig
}
