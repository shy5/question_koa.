import KoaRouter from 'koa-router'

import Answer from '../../schema/answer'
import Question from '../../schema/question'
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
    const { id } = ctx.params
    const data = await Answer.find({ questionId: id })
        .lean()
        .exec()
    await Question.updateOne(
        {
            id
        }, {
        answerCount: data.length
    }
    )
    ctx.body = {
        status: 0,
        message: '成功',
        data
    }
})

// 创建回答
router.post('/create', async (ctx, next) => {
    const req = ctx.request.body
    const { questionId, answerContent, answerUid } = req
    await Answer.create({
        id: uuid(),
        questionId,
        answerContent,
        answerUid,
        best: 2
    })
    const answerCount = await Answer.find({ questionId: id })
        .countDocuments()
        .lean()
        .exec()
    Question.updateOne(
        {
            id: questionId
        }, {
        answerCount
    }
    )
    ctx.body = {
        status: 0,
        message: '成功'
    }
})

// 回答详情
router.get('/detail/:answerId', async (ctx, next) => {
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
})

// 更新回答
router.put('/update', async (ctx, next) => {
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
})

// 设置回答为最佳回答
router.put('/update/best', async (ctx, next) => {
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
})

export default router
