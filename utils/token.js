const JWT = require('jsonwebtoken')

const JWT_SECRET = 'token'

exports.createToken = (data, expiresIn = '1h') => {
    const { account, userId } = data
    const opt = { account, userId }

    // 过期时间
    const exp = { expiresIn }
    return JWT.sign(opt, JWT_SECRET, exp)
}

// 用户请求其他需要鉴权接口是解析 header,返回 authorization
// 请求头 authorization 携带 token 时 需拼接 Bearer 格式如: `Bearer ${token}`,否则会报错
// 因此,解析token时需要对 authorization 字段做处理
exports.parseHader = ctx => {
    if (!ctx || !ctx.request || !ctx.request.header || !ctx.request.header.authorization) return null
    return ctx.request.header.authorization
}

// 解析 token
exports.decodeToken = token => {
    return JWT.decode(token)
}

exports.JWT_SECRET = JWT_SECRET
