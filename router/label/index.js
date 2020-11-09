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
        let labelList = await Label.find() // 查找条件，全部
            .sort({ _id: -1 }) // 倒序
            .lean() // 转换mongoose查询结果类型，从MongooseDocuments转换为JS Object
            .exec() // 执行查询，返回查询结果，这里是具体的JS Object
        if (labelList && labelList.length == 0) {
            await Label.create({
                id: 5,
                labelName: 'taro篇',
                labelType: 1,
                sort: 0,
                status: 1
            })
            await Label.create({
                id: 6,
                labelName: 'vue篇',
                labelType: 1,
                sort: 0,
                status: 1
            })
            await Label.create({
                id: 7,
                labelName: '业务篇',
                labelType: 1,
                sort: 0,
                status: 1
            })
            await Label.create({
                id: 8,
                labelName: 'react篇',
                labelType: 1,
                sort: 0,
                status: 1
            })
            await Label.create({
                id: 9,
                labelName: '移动端',
                labelType: 1,
                sort: 0,
                status: 1
            })
            await Label.create({
                id: 10,
                labelName: '微信篇',
                labelType: 1,
                sort: 0,
                status: 1
            })
            labelList = await Label.find() // 查找条件，全部
            .sort({ id: 1 }) // 倒序
            .lean() // 转换mongoose查询结果类型，从MongooseDocuments转换为JS Object
            .exec() // 执行查询，返回查询结果，这里是具体的JS Object
        }
        ctx.body = {
            status: 0,
            message: '成功',
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
