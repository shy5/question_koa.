import mongoose from '../../database'
import { questionSchemaConfig } from '../../config'

const solveListSchema = new mongoose.Schema({
    id: String, // 回答的id
    questionId: String, // 问题的id
    answerContent: String, // 回复内容
    answerUid: String, // 回复人id
    best: { type: String, default: 2}, // 最佳回答
}, {
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }
})

const questionSchema = mongoose.Schema({
    id: { type: String },
    title: { type: String },
    description: { type: String },
    uid: { type: String },
    pending: { type: Number, default: 2 },
    labelType: { type: Number },
    questionSolve: [solveListSchema],
}, questionSchemaConfig)

const QuestionSchema = mongoose.model('question', questionSchema)

export default QuestionSchema
