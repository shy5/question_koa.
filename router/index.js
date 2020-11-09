import KoaRouter from 'koa-router'

// import { swaggerSpec } from '../config'
import userRouter from './user'
import questionRouter from './question'
import labelRouter from './label'
import answerRouter from './answer'

const router = new KoaRouter()

// swaggerSpec.map(item => {
//     router.get(`/${item.dirName}`, (ctx) => {
//         ctx.body = item.swaggerJSDoc
//     })
// })

router.use('/user', userRouter.routes())
router.use('/question', questionRouter.routes())
router.use('/label', labelRouter.routes())
router.use('/answer', answerRouter.routes())

export default router
