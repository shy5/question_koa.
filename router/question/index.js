import KoaRouter from 'koa-router'

import Question from '../../schema/question'
import { questionError } from '../../utils/errorcode'

const router = new KoaRouter()
/**
 * @swagger
 *
 * /login:
 *   get:
 *     description: get all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: get all users
 */

router.post('/login', async (ctx, next) => {
    const req = ctx.request.body
    const user = await User.findOne({
        username: req.username,
        password: md5(req.password)
    })
    .lean()
    .exec()
    if (user) {
        ctx.body = {
            code: 0,
            message: '登录成功',
            data: Object.assign({},  user )
        }
    } else {
        ctx.body = questionError.LOGIN_FAIL
    }
})

/**
 * @swagger
 *
 * /register:
 *   get:
 *     description: get all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: get all users
 */

// 创建问题
router.post('/create', async (ctx, next) => {
    const req = ctx.request.body
    const { title, description, labelType, uid } = req
    try {
        await Question.create({
            id: uuid(),
            title,
            description,
            labelType,
            uid
        })
        ctx.body = {
            status: 0,
            message: '创建成功'
        }
        return next()
    } catch (err) {
        ctx.body = questionError.CREAT_FAIL
        return next()
    }
})

export default router
