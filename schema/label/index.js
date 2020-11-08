import mongoose from '../../database'
import { labelSchemaConfig } from '../../config'

const labelSchema = mongoose.Schema({
    id: { type: String },
    parentType: { type: Number },
    labelType: { type: Number },
    labelName: { type: String },
    sort: { type: Number },
    status: { type: Number }
}, labelSchemaConfig)

const LabelSchema = mongoose.model('label', labelSchema)

export default LabelSchema
