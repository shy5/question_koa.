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

const questionError = {
    CREAT_FAIL: {
        status: 301,
        message: '创建失败！'
    },
    UPDATE_FAIL: {
        status: 302,
        message: '更新失败'
    },
    PAGE_BEYOND: {
        status: 303,
        message: '超出查询范围'
    },
    DETAIL_FAILE: {
        status: 310,
        message: '查询出错，请检查'
    }
}

const serverError = {
    SERVER_ERROR: {
        status: 500,
        message: '系统出错，请稍后再试'
    }
}

export {
    userError,
    questionError,
    serverError
}
