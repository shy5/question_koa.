import KoaRouter from 'koa-router'

import Label from '../../schema/label'

const router = new KoaRouter()

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
router.get('/list', async (ctx, next) => {
    try {
        const labelList = await Label.find() // 查找条件，全部
            .sort({ _id: -1 }) // 倒序
            .lean() // 转换mongoose查询结果类型，从MongooseDocuments转换为JS Object
            .exec() // 执行查询，返回查询结果，这里是具体的JS Object
        ctx.body = {
            code: 0,
            message: '登录成功',
            data: labelList
        }
        return next()
    } catch (err) {
        ctx.body = {
            status: 500,
            message: '系统出，请稍后再试'
        }
        return next()
    }
})

export default router
