import KoaRouter from 'koa-router'

// import { swaggerSpec } from '../config'
import userRouter from './user'

const router = new KoaRouter()

// swaggerSpec.map(item => {
//     router.get(`/${item.dirName}`, (ctx) => {
//         ctx.body = item.swaggerJSDoc
//     })
// })

router.use('/user', userRouter.routes())

export default router
