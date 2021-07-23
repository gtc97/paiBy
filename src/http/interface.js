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
// 商品详情
export const getGoodsDetail = data => {
    return axios({
        url: '/Goods/goodsDetail?id=' + data,
        method: 'get',
        // data
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

// 微信登录
export const WXLogin = () => {
    return axios({
        url: '/login/wxlogin',
        method: 'get',
    })
}

// 微信登录2
export const wxlogin2 = () => {
    return axios({
        url: '/login/wxlogin2',
        method: 'get',
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

// 首页classification
export const classification = data => {
    return axios({
        url: '/goods/goodsCatList',
        method: 'post',
        data
    })
}

// 微信支付返回支付参数
export const WXPay = data => {
    return axios({
        url: '/user/we_pay',
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
// 获取好友返佣
export const getFriends2 = data => {
    return axios({
        url: '/user/friendList2',
        method: 'post',
        data
    })
}
// 获取好友返佣
export const getFriends3 = data => {
    return axios({
        url: '/user/friendList3',
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
// 获取主题颜色
export const getcolor = data => {
    return axios({
        url: '/Common/coloron',
        method: 'post',
        data
    })
}

// 兑换商品列表
export const dhgoodsList = data => {
    return axios({
        url: '/Dhgoods/goodsList',
        method: 'post',
        data
    })
}
// 兑换商品详情
export const dhgoodsDetails = data => {
    return axios({
        url: '/Dhgoods/goodsDetail',
        method: 'post',
        data
    })
}
// 佣金申请提现
export const drawcredit3 = data => {
    return axios({
        url: '/user/drawcredit3',
        method: 'post',
        data
    })
}

// 佣金提现列表
export const credit3drawList = data => {
    return axios({
        url: '/user/credit3drawList',
        method: 'post',
        data
    })
}

// 我的买入订单详情
export const buyOrderInfo = data => {
    return axios({
        url: '/user/buyOrderInfo',
        method: 'post',
        data
    })
}

// 我的卖出订单详情
export const sellOrderInfo = data => {
    return axios({
        url: '/user/sellOrderInfo',
        method: 'post',
        data
    })
}
// 我的卖出商品详情
export const blinfo = data => {
    return axios({
        url: '/user/blinfo',
        method: 'post',
        data
    })
}

// // 好友列表
// export const friendList = data => {
//     return axios({
//         url: '/user/friendList',
//         method: 'post',
//         data
//     })
// }

// 邀请推荐奖励列表
export const tjFriendList = data => {
    return axios({
        url: '/user/friendList',
        method: 'get',
        data
    })
}

// 邀请好友订单返佣列表
// export const friendOrderList = data => {
//     return axios({
//         url: '/user/friendOrderList',
//         method: 'get',
//         data
//     })
// }

// 购买会员卡成为会员
export const payCard = data => {
    return axios({
        url: '/user/payCard',
        method: 'post',
        data
    })
}
// 用户资金情况
export const finance = data => {
    return axios({
        url: '/user/finance',
        method: 'get',
        data
    })
}
// 订单置换元宝
export const zhihuan = data => {
    return axios({
        url: '/user/zhihuan',
        method: 'get',
        data
    })
}
// 银币兑换商品
export const goodsCreateorder = data => {
    return axios({
        url: '/dhgoods/createOrder',
        method: 'post',
        data
    })
}

// 用户提货
export const tihuo = data => {
    return axios({
        url: '/user/tihuo?id=' + data.id + '&addressId=' + data.addressId,
        method: 'get',
    })
}

// 我的提货订单
export const orderTihuo = data => {
    return axios({
        url: '/user/myOrdertihuo',
        method: 'post',
        data
    })
}
// 入场券列表
export const cardlist = data => {
    return axios({
        url: '/user/cardlist',
        method: 'get',
        data
    })
}

// 分享佣金页面邀请好友数量 推荐奖励金额 推荐订单金额
export const yjinfo = data => {
    return axios({
        url: '/user/yjinfo',
        method: 'post',
        data
    })
}
// 判断用户设置收款码
export const ckpayinfo = data => {
    return axios({
        url: '/index/ckpayinfo',
        method: 'get',
        data
    })
}
// 个人中心调取头像会员等级等
export const userinfo = data => {
    return axios({
        url: '/user/userinfo',
        method: 'get',
        data
    })
}
// 积分兑换
export const convert = data => {
    return axios({
        url: '/user/convert',
        method: 'post',
        data
    })
}

// 首页调取头像会员级别
export const indexUserinfo = data => {
    return axios({
        url: '/index/userinfo',
        method: 'post',
        data
    })
}
// 会员级别需购买入场卷
export const goodsquan = data => {
    return axios({
        url: '/user/goodquan',
        method: 'post',
        data
    })
}
// 转拍获取单价 转拍费 ， 余额
export const zhuanpaiinfo = data => {
    return axios({
        url: '/user/zhuanpaiinfo',
        method: 'post',
        data
    })
}

// 卖单 流拍列表
export const liupai = data => {
    return axios({
        url: '/user/liupai',
        method: 'post',
        data
    })
}

// 卖单 的已锁单列表
export const yisuodan = data => {
    return axios({
        url: '/user/yisuodan',
        method: 'get',
    })
}

// 买入订单的置换
export const mairuzhihuan = data => {
    return axios({
        url: '/user/mairuzhihuan',
        method: 'post',
        data
    })
}

// 卖出订单的置换
export const maichuzhihuan = data => {
    return axios({
        url: '/user/maichuzhihuan',
        method: 'post',
        data
    })
}

// 卖出订单带被买
export const daibeimai = data => {
    return axios({
        url: '/user/daibeimai',
        method: 'post',
        data
    })
}


// 佣金 银币转增
export const zhuanzeng = data => {
    return axios({
        url: '/user/zhuanzeng',
        method: 'post',
        data
    })
}

// 提现手续费
export const fee = data => {
    return axios({
        url: '/user/fee_sel',
        method: 'post',
        data
    })
}
// 卖单  待确认收款
export const shoukuan = data => {
    return axios({
        url: '/user/shoukuan',
        method: 'post',
        data
    })
}

// 卖单  已完成
export const yiwancheng = data => {
    return axios({
        url: '/user/yiwancheng',
        method: 'post',
        data
    })
}


// 余额提现明细
export const yunelog = data => {
    return axios({
        url: '/user/yunelog',
        method: 'post',
        data
    })
}

// 佣金提现明细
export const credit3log = data => {
    return axios({
        url: '/user/credit3log',
        method: 'post',
        data
    })
}


// 积分兑换
export const jfdh = data => {
    return axios({
        url: '/user/jfdh',
        method: 'post',
        data
    })
}

// 是否关注公众号
export const isSubscribe = data => {
    return axios({
        url: '/common/isSubscribe',
        method: 'post',
        data
    })
}

// 银币
export const credit1log = data => {
    return axios({
        url: '/user/credit1log',
        method: 'post',
        data
    })
}

// 开放时间
export const jifenduihuantanchuang = data => {
    return axios({
        url: '/Dhgoods/jifenduihuantanchuang',
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
    //  获取好友
    getFriends2,
    //  获取好友
    getFriends3,
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
    // 微信登陆
    WXLogin,
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
    payPic,
    // 微信支付
    WXPay,
    // 获取主题颜色
    getcolor,
    // 兑换商品
    dhgoodsList,
    // 兑换商品详情
    dhgoodsDetails,
    // 佣金申请提现
    drawcredit3,
    // 佣金提现列表
    credit3drawList,
    // 我的买入订单详情
    buyOrderInfo,
    // 我的卖出订单详情
    sellOrderInfo,
    // 好友列表
    // friendList,
    // 邀请推荐奖励列表
    tjFriendList,
    // 邀请好友订单返佣列表
    // friendOrderList,
    // 购买会员卡成为会员
    payCard,
    // 首页分类
    classification,
    // 用户资金情况
    finance,
    // 订单置换元宝
    zhihuan,
    // 银币兑换商品
    goodsCreateorder,
    // 用户提货
    tihuo,
    // 我的提货订单
    orderTihuo,
    // 微信登陆测试
    wxlogin2,
    // 入场券列表
    cardlist,
    // 分享佣金页面邀请好友数量 推荐奖励金额 推荐订单金额
    yjinfo,
    // 判断用户设置收款码
    ckpayinfo,
    // 个人中心调取头像会员等级等
    userinfo,
    // 积分兑换
    convert,
    // 首页调取头像会员级别
    indexUserinfo,
    // get 商品详情
    getGoodsDetail,
    // 会员级别需购买入场卷
    goodsquan,
    // 转拍查询余额等
    zhuanpaiinfo,
    // 卖单  已流拍列表
    liupai,
    // 买入订单的置换
    mairuzhihuan,
    // 卖出订单的置换
    maichuzhihuan,
    // 卖单 的已锁单列表
    yisuodan,
    // 带被买
    daibeimai,
    // 我的卖出商品详情 
    blinfo,
    // 转增
    zhuanzeng,
    // 提现手续费
    fee,
    // 卖单  待确认收款
    shoukuan,
    // 卖单  已完成
    yiwancheng,
    // y余额
    yunelog,
    // 佣金
    credit3log,
    // 积分
    jfdh,
    // 是否关注公众号
    isSubscribe,
    // 银币记录
    credit1log,
    // 积分开放时间
    jifenduihuantanchuang,
}