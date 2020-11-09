import KoaRouter from 'koa-router'

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
    try {
        const { id } = ctx.params
        const data = await Question.findOne({id})
        .lean()
        .exec()
        if (data) {
            ctx.body = {
                status: 0,
                message: '成功',
                data: data.questionSolve || []
            }
            return next()
        } else {
            ctx.body = {
                status: 0,
                message: '成功',
                data: {
                    total,
                    list: []
                }
            }
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
        const question = await Question.findOne({ id: questionId })
        if (question !== null) {
            // let isSolveExists = false
            // for (const index in question.questionSolve) {
            //     if (question.questionSolve[index].solveId === questionSolve.solveId) {
            //         question.questionSolve[index] = questionSolve
            //         isSolveExists = true
            //         break; // 不需要继续循环了
            //     }
            // }
            // if (!isSolveExists) {
                // 如果没有找到相同的回复信息，就插入
                question.questionSolve.push({
                    id: uuid(),
                    questionId,
                    answerContent,
                    answerUid,
                    best: 2
                })
            // }
            question.save()
            ctx.body = {
                status: 0,
                message: '成功'
            }
            return 
        } else {
            // pid 没找到相关 document
        }
    } catch (err) {
        ctx.body = questionError.CREAT_FAIL
        return next()
    }
})

export default router
