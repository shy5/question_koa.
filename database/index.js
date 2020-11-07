import mongoose from 'mongoose'
import { mongoConfig } from '../config'

mongoose.connect(mongoConfig.url, mongoConfig.options)

const db = mongoose.connection

db.once('error', () => console.log('MongoDB connect fail'))
db.once('connected', () => console.log('MongoDB connect success'))
db.once('disconnected', () => console.log('MongoDB connect disconnected'))

export default mongoose
