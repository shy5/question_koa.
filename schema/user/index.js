import mongoose from '../../database'
import { schemaConfig } from '../../config'

const userSchema = mongoose.Schema({
    id: { type: String },
    account: { type: String },
    password: { type: String },
    username: { type: String },
    userPhone: { type: String },
    email: { type: String },
    avatar: { type: String },
}, schemaConfig)

const User = mongoose.model('user', userSchema)

export default User
