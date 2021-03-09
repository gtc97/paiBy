// 倒入api 将所有接口统一
import axios from './api'

// 文章列表
export const notifyList = data => {
    return axios({
        url: '/articles/alist',
        method: 'post',
        data
    })
}

// 文章详情
export const notifyDetails = data => {
    return axios({
        url: '/articles/info',
        method: 'post',
        data
    })
}

// 商品列表
export const goodsList = data => {
        return axios({
            url: '/goods/goodsList',
            method: 'post',
            data
        })
    }
    // 商品详情
export const goodsDetails = data => {
    return axios({
        url: '/goods/goodsDetail',
        method: 'post',
        data
    })
}

// 注册
export const register = data => {
    return axios({
        url: '/login/register',
        method: 'post',
        data
    })
}

// 登录
export const login = data => {
    return axios({
        url: '/login/login',
        method: 'post',
        data
    })
}

// 退出登录
export const loginOut = data => {
    return axios({
        url: '/login/loginOut',
        method: 'post',
        data
    })
}

// 获取验证码
export const verificationCode = data => {
        return axios({
            url: '/common/sendSms',
            method: 'post',
            data
        })
    }
    // 新增收货地址
export const addAddress = data => {
    return axios({
        url: '/user/addaddress',
        method: 'post',
        data
    })
}

// 获取省市区
export const regionList = data => {
    return axios({
        url: '/common/area',
        method: 'post',
        data
    })
}

// 收款设置微信和支付宝
export const paySething = data => {
    return axios({
        url: '/user/setPay',
        method: 'post',
        data
    })
}

// 收款信息
export const paySetingInfo = data => {
    return axios({
        url: '/user/getpay',
        method: 'post',
        data
    })
}

// 收款设置微信和支付宝
export const homeData = data => {
    return axios({
        url: '/goods/goodsCatList',
        method: 'post',
        data
    })
}

// 删除地址
export const deleteAddress = data => {
    return axios({
        url: '/user/deladdress',
        method: 'post',
        data
    })
}

// 编辑地址
export const editAddress = data => {
    return axios({
        url: '/user/editaddress',
        method: 'post',
        data
    })
}

// 查询地址列表
export const addressList = data => {
    return axios({
        url: '/user/addresslist',
        method: 'post',
        data
    })
}

// 查询默认地址
export const defaultAddress = data => {
        return axios({
            url: '/user/getaddress',
            method: 'post',
            data
        })
    }
    // 设置默认收货地址
export const setDefaultAddress = data => {
    return axios({
        url: '/user/setDefaultAddress',
        method: 'post',
        data
    })
}

// 查询订单
export const queryOrder = data => {
    return axios({
        url: '/user/getOrder',
        method: 'post',
        data
    })
}

// 创建订单
export const createOrder = data => {
    return axios({
        url: '/user/createOrder',
        method: 'post',
        data
    })
}

// 订单列表
export const orderList = data => {
        return axios({
            url: '/user/buyOrderList',
            method: 'post',
            data
        })
    }
    // 取消订单
export const cancelOrder = data => {
        return axios({
            url: '/user/cancelOrder',
            method: 'post',
            data
        })
    }
    // 分享奖励
export const shareReward = data => {
    return axios({
        url: '/user/reward',
        method: 'post',
        data
    })
}

// 提现历史
export const drawHistory = data => {
        return axios({
            url: '/user/drawList',
            method: 'post',
            data
        })
    }
    // 提现
export const draw = data => {
        return axios({
            url: '/user/draw',
            method: 'post',
            data
        })
    }
    // 充值
export const recharge = data => {
    return axios({
        url: '/user/recharge',
        method: 'post',
        data
    })
}

// 卖单列表
export const sellOrderList = data => {
    return axios({
        url: '/user/sellOrderList',
        method: 'post',
        data
    })
}

// 转售
export const sellOrder = data => {
    return axios({
        url: '/user/resell',
        method: 'post',
        data
    })
}

// 确认收款
export const completeOrder = data => {
    return axios({
        url: '/user/completeOrder',
        method: 'post',
        data
    })
}

// 获取用户收款信息
export const getUserPayInfo = data => {
    return axios({
        url: '/common/getUserPay',
        method: 'post',
        data
    })
}

// 上传付款截图
export const payPic = data => {
    return axios({
        url: '/user/payOrder',
        method: 'post',
        data
    })
}

export const getBanner = data => {
        return axios({
            url: '/index/banner',
            method: 'get',
            data
        })
    }
    // 获取好友返佣
export const getFriends = data => {
        return axios({
            url: '/user/friendList',
            method: 'post',
            data
        })
    }
    // 获取后台充值信息
export const getReahargeInfo = data => {
        return axios({
            url: '/user/getRecharge',
            method: 'get',
            data
        })
    }
    // 提交充值截图
export const payRecharge = data => {
        return axios({
            url: '/user/payRecharge',
            method: 'post',
            data
        })
    }
    // 获取好友返佣
export const getFriendOrder = data => {
        return axios({
            url: '/user/friendOrderList',
            method: 'post',
            data
        })
    }
    // 默认全部倒出
export default {
    //订单返佣
    getFriendOrder,
    // banner图
    getBanner,
    // getReachinfo
    getReahargeInfo,
    //  获取好友
    getFriends,
    // 文章列表
    notifyList,
    // 文章详情
    notifyDetails,
    // 商品列表
    goodsList,
    // 商品详情
    goodsDetails,
    // 注册
    register,
    // 登录
    login,
    // 退出登录
    loginOut,
    // 获取验证码
    verificationCode,
    // 新增收货地址
    addAddress,
    // 获取省市区
    regionList,
    // 收款设置
    paySething,
    // 收款信息
    paySetingInfo,
    // 首页数据
    homeData,
    // 查询默认地址
    defaultAddress,
    // 设置默认收货地址
    setDefaultAddress,
    // 删除地址
    deleteAddress,
    // 编辑地址
    editAddress,
    // 查询地址列表
    addressList,
    // 创建订单
    createOrder,
    // 查询订单
    queryOrder,
    // 订单列表
    orderList,
    // 取消订单
    cancelOrder,
    // 分享奖励
    shareReward,
    // 提现历史
    drawHistory,
    // 提现
    draw,
    // 充值
    recharge,
    // 付款码
    payRecharge,
    // 卖单列表
    sellOrderList,
    // 转售
    sellOrder,
    // 确认收款
    completeOrder,
    // 获取用户收款信息
    getUserPayInfo,
    // 上传付款截图
    payPic
}