import mongoose from '../../database'
import { answerSchemaConfig } from '../../config'

const answerSchema = mongoose.Schema({
    id: String, // 回答的id
    questionId: String, // 问题的id
    answerContent: String, // 回复内容
    answerUid: String, // 回复人id
    best: { type: String, default: 2}, // 最佳回答
}, answerSchemaConfig)

const AnswerSchema = mongoose.model('answer', answerSchema)

export default AnswerSchema
