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

// 创建问题
router.post('/create', async (ctx, next) => {
    const req = ctx.request.body
    const { title, description, labelType, uid, pending } = req
    await Question.create({
        id: uuid(),
        title,
        description,
        labelType,
        uid,
        pending
    })
    ctx.body = {
        status: 0,
        message: '创建成功'
    }
})

// 更新问题
router.put('/update', async (ctx, next) => {
    const req = ctx.request.body
    const { id } = req
    const { title, description, labelType, uid } = req
    await Question.update({ id }, {
        title,
        description,
        labelType,
        uid
    })
    ctx.body = {
        status: 0,
        message: '更新成功'
    }
    return next()
})

// 问题列表
router.get('/list', async (ctx, next) => {
    const req = ctx.request.query
    let { title, labelType, pageSize, pageNumber, pending } = req
    pageSize = Number(pageSize)
    pageNumber = Number(pageNumber)

    const titleReg = new RegExp(title, 'i')
    let filterObj = {
        $and: [
            { title: { $regex: titleReg } },
            { labelType: labelType ? labelType : { $ne: null } },
            { pending: pending ? pending : { $ne: null } }
        ]
    }
    const total = await Question.find(filterObj)
        .countDocuments() // 查询总数
        .exec()
    if (total) {
        let list = await Question
            .find(filterObj) // 查找条件
            .sort({ createTime: -1 }) // 倒序
            .limit(pageSize) // 查询数量
            .skip((pageNumber - 1) * pageSize) // 跳过多少条数据
            .lean() // 转换mongoose查询结果类型，从MongooseDocuments转换为JS Object
            .exec() // 执行查询，返回查询结果，这里是具体的JS Object
        if (list && list.length) {
            ctx.body = {
                status: 0,
                message: '成功',
                data: {
                    total,
                    list
                }
            }
            return next()
        } else {
            ctx.body = questionError.PAGE_BEYOND
            return next()
        }
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
})

// 问题详情
router.get('/detail/:id', async (ctx, next) => {
    const { id } = ctx.params
    const data = await Question.findOne({ id })
        .lean()
        .exec()
    if (data) {
        ctx.body = {
            status: 0,
            message: '成功',
            data
        }
        return next()
    } else {
        ctx.body = questionError.DETAIL_FAILE
        return next()
    }
})

// 
router.get('/the-week-todo', async (ctx, next) => {
    const data = await Question.find()
        .sort({ answerCount: 1, createTime: 1 })
        .limit(1)
        .lean()
        .exec()
    if (data) {
        ctx.body = {
            status: 0,
            message: '成功',
            data: data[0]
        }
        return next()
    } else {
        ctx.body = questionError.DETAIL_FAILE
        return next()
    }

})

export default router
