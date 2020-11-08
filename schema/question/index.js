import mongoose from '../../database'
import { questionSchemaConfig } from '../../config'

const questionSchema = mongoose.Schema({
    id: { type: String },
    title: { type: String },
    description: { type: String },
    uid: { type: String },
    pending: { type: Number },
    labelType: [Number]
}, questionSchemaConfig)

const QuestionSchema = mongoose.model('question', questionSchema)

export default QuestionSchema
