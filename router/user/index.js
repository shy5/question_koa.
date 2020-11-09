import KoaRouter from 'koa-router'
import md5 from 'md5'

import User from '../../schema/user'
import { userError } from '../../utils/errorcode'
import { createToken } from '../../utils/token'

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
        ctx.body = userError.LOGIN_FAIL
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

// 注册
router.post('/register', async (ctx, next) => {
    const req = ctx.request.body
    const { username, password, email, avatar } = req
    const user = await User.findOne({
        username: req.username
    }).countDocuments()
    .exec()
    if (user) {
        ctx.body = userError.ACCOUNT_EXISTS
        return next()
    }
    try {
        await User.create({
            id: uuid(),
            username,
            password: md5(password),
            email,
            avatar: avatar || 'https://hosjoy-oss-test.oss-cn-hangzhou.aliyuncs.com/images/20200717/a5ba487b-5513-47d0-aa74-4e513673f313.png'
        })
        ctx.body = {
            status: 0,
            message: '创建成功'
        }
        return next()
    } catch (err) {
        ctx.body = userError.RESGISTER_FAIL
        return next()
    }
})

export default router
