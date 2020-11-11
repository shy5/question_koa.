import KoaRouter from 'koa-router'

import Answer from '../../schema/answer'
import { questionError, serverError } from '../../utils/errorcode'

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

// 回答列表
router.get('/list/:id', async (ctx, next) => {
    try {
        const { id } = ctx.params
        const data = await Answer.find({ questionId: id })
            .lean()
            .exec()
        if (data) {
            ctx.body = {
                status: 0,
                message: '成功',
                data: data
            }
            return next()
        } else {
            ctx.body = serverError.SERVER_ERROR
            return next()
        }
    } catch (error) {
        ctx.body = serverError.SERVER_ERROR
        return next()
    }
})

// 创建回答
router.post('/create', async (ctx, next) => {
    try {
        const req = ctx.request.body
        const { questionId, answerContent, answerUid } = req
        await Answer.create({
            id: uuid(),
            questionId,
            answerContent,
            answerUid,
            best: 2
        })
        ctx.body = {
            status: 0,
            message: '成功'
        }
        return next()
    } catch (err) {
        ctx.body = questionError.CREAT_FAIL
        return next()
    }
})

// 回答详情
router.get('/detail/:answerId', async (ctx, next) => {
    try {
        const { answerId } = ctx.params
        const answer = await Answer.findOne({ id: answerId })
            .lean()
            .exec()
        if (answer) {
            ctx.body = {
                status: 0,
                message: '成功',
                data: answer
            }
            return next()
        } else {
            ctx.body = serverError.SERVER_ERROR
            return next()
        }
    } catch (error) {
        ctx.body = serverError.SERVER_ERROR
        return next()
    }
})

// 更新回答
router.put('/update', async (ctx, next) => {
    try {
        const req = ctx.request.body
        const { questionId, answerContent, answerUid, answerId } = req
        // $位置运算符仅更新与查询匹配的第一个数组项
        await Answer.updateOne(
            {
                id: answerId
            },
            {
                questionId, answerContent, answerUid
            })
        ctx.body = {
            status: 0,
            message: '成功'
        }
        return next()
    } catch (error) {
        ctx.body = serverError.SERVER_ERROR
        return next()
    }
})

// 设置回答为最佳回答
router.put('/update/best', async (ctx, next) => {
    try {
        const req = ctx.request.body
        const { answerId } = req
        await Answer.updateMany(
            {
                best: 1
            },
            {
                best: '2'
            })
        await Answer.updateOne(
            {
                id: answerId
            },
            {
                best: '1'
            })
        ctx.body = {
            status: 0,
            message: '成功'
        }
        return next()
    } catch (error) {
        ctx.body = serverError.SERVER_ERROR
        return next()
    }
})

export default router
