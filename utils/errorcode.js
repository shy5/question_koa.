const userError = {
    ACCOUNT_EXISTS: {
        status: 400,
        message: '账号已存在！'
    },
    RESGISTER_FAIL: {
        status: 401,
        message: '注册失败！'
    },
    LOGIN_FAIL: {
        status: 410,
        message: '账户或者密码错误！'
    },
}

export {
    userError
}
