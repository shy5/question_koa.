import mongoose from '../../database'
import { questionSchemaConfig } from '../../config'

const questionSchema = mongoose.Schema({
    id: { type: String },
    title: { type: String },
    description: { type: String },
    uid: { type: String },
    pending: { type: Number, default: 2 },
    labelType: { type: Number },
    answerCount: { type: Number, default: 0}
}, questionSchemaConfig)

const QuestionSchema = mongoose.model('question', questionSchema)

export default QuestionSchema
