import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '@/Layout/Layout'

export const constantRoutes = [{
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/',
    children: [{
        path: '/',
        name: '竞拍',
        meta: { title: '竞拍' },
        component: () =>
            import('@/pages/Home/Home')
    }]
},
{
    path: '/',
    component: Layout,
    redirect: '/dhgoods',
    children: [{
        path: 'dhgoods',
        name: '兑换中心',
        meta: { title: '兑换中心' },
        component: () =>
            import('@/pages/Dhgoods/goods')
    }]
},

// {
//     path: '/',
//     component: Layout,
//     redirect: '/dhgoodsdetails',
//     children: [{
//         path: 'dhgoodsdetails',
//         name: '兑换中心',
//         meta: { title: '兑换中心' },
//         component: () =>
//             import('@/pages/DhgoodsDetails/GoodsDetails')
//     }]
// }, 
{
    path: '/',
    component: Layout,
    redirect: '/rewardsNew',
    children: [{
        path: 'rewardsNew',
        name: '分享奖励',
        meta: { title: '分享奖励' },
        component: () =>
            import('@/pages/RewardsNew/RewardsNew')
    }]
},
{
    path: '/',
    component: Layout,
    redirect: '/rewards',
    children: [{
        path: 'rewards',
        name: '分享奖励',
        meta: { title: '分享奖励' },
        component: () =>
            import('@/pages/Rewards/Rewards')
    }]
},
{
    path: '/',
    component: Layout,
    redirect: '/notice',
    children: [{
        path: 'notice',
        name: '公告',
        meta: { title: '公告' },
        component: () =>
            import('@/pages/Notice/Notice')
    }]
},
{
    path: '/',
    component: Layout,
    redirect: '/my',
    children: [{
        path: 'my',
        name: '会员中心',
        meta: { title: '会员中心' },
        component: () =>
            import('@/pages/My/My')
    }]
},
{// 兑换商品详情
    path: '/dhgoodsDetails/:id',
    name: 'DhgoodsDetails',
    component: () =>
        import('@/pages/DhgoodsDetails/GoodsDetails')
},
{// 订单返佣
    path: '/goods',
    name: 'Goods',
    component: () =>
        import('@/pages/Goods/Goods')
},
// {
//     path: '/',
//     component: Layout,
//     redirect: '/goods',
//     children: [{
//         path: 'goods',
//         name: '书法上午场',
//         meta: { title: '书法上午场' },
//         component: () =>
//             import ('@/pages/Goods/Goods')
//     }]
// },
{// 订单返佣
    path: '/rakeback',
    name: 'RakeBack',
    component: () =>
        import('@/pages/RakeBack/RakeBack')
},
    {// 订单返佣
        path: '/RakeBackContent',
        name: 'RakeBackContent',
        component: () =>
            import('@/pages/RakeBackContent/RakeBackContent')
    },
{//好友佣金明细
    path: '/friends',
    name: 'Friends',
    component: () =>
        import('@/pages/Friends/Friends')
},
{// 文本
    path: '/noticeDetails/:id',
    name: 'NoticeDetails',
    component: () =>
        import('@/pages/NoticeDetails/NoticeDetails')
},
{//我的签约
    path: '/signing',
    name: 'Signing',
    component: () =>
        import('@/pages/Signing/Signing')
},
{//我的钱包
    path: '/wallet',
    name: 'Wallet',
    component: () =>
        import('@/pages/Wallet/Wallet')
},
{//添加地址
    path: '/addAddress',
    name: 'AddAddress',
    component: () =>
        import('@/pages/AddAddress/AddAddress')
},
{//地址
    path: '/address',
    name: 'Address',
    component: () =>
        import('@/pages/Address/Address')
},
{//注册
    path: '/register',
    name: 'Register',
    component: () =>
        import('@/pages/Register/Register')
},
{//收款设置
    path: '/seting',
    name: 'Seting',
    component: () =>
        import('@/pages/Seting/Seting')
},
{//商品详情
    path: '/goodsdetails/:id',
    name: 'GoodsDetails',
    component: () =>
        import('@/pages/GoodsDetails/GoodsDetails')
},
{//邀请二维码
    path: '/invitation',
    name: 'Invitation',
    component: () =>
        import('@/pages/Invitation/Invitation')
},
{//登陆
    path: '/login',
    name: 'Login',
    component: () =>
        import('@/pages/Login/Login')
},
{//支付 订单列表
    path: '/pay',
    name: 'Pay',
    component: () =>
        import('@/pages/Pay/Pay')
},
{// 分享奖励
    path: '/order',
    name: 'Order',
    component: () =>
        import('@/pages/Order/Order')
},
{//用户指南
    path: '/guide',
    name: 'Guide',
    component: () =>
        import('@/pages/Guide/Guide')
},
{//风险提示
    path: '/riskTips',
    name: 'RiskTips',
    component: () =>
        import('@/pages/RiskTips/RiskTips')
},
{//用户须知
    path: '/guidelines',
    name: 'Guidelines',
    component: () =>
        import('@/pages/Guidelines/Guidelines')
},
{//规则说明
    path: '/agreement',
    name: 'Agreement',
    component: () =>
        import('@/components/Agreement')
},

{//注册规则说明
    path: '/zhuceAgreement',
    name: 'zhuceAgreement',
    component: () =>
        import('@/components/zhuceAgreement')
},
{//我的卖单
    path: '/sellOrder',
    name: 'SellOrder',
    component: () =>
        import('@/pages/SellOrder/SellOrder')
},
{//我的卖单详情
    path: '/SellGoodsDetails',
    name: 'SellGoodsDetails',
    component: () =>
        import('@/pages/SellOrder/SellGoodsDetails')
},
{//提现
    path: '/withdrawal',
    name: 'Withdrawal',
    component: () =>
        import('@/pages/Withdrawal/Withdrawal')
},
{// 佣金提现
    path: '/WithdrawalCommission',
    name: 'WithdrawalCommission',
    component: () =>
        import('@/pages/WithdrawalCommission/Withdrawal')
},
{//充值
    path: '/rechargetype',
    name: 'RechargeType',
    component: () =>
        import('@/pages/RechargeType/RechargeType')
},
{// 佣金列表
    path: '/commissionList',
    name: 'commissionList',
    component: () =>
        import('@/pages/commissionList/commissionList')
},
{// 入场卷
    path: '/AdmissionTicket',
    name: 'AdmissionTicket',
    component: () =>
        import('@/pages/AdmissionTicket/AdmissionTicket')
},
{// 订单详情
    path: '/OrderDetails',
    name: 'OrderDetails',
    component: () =>
        import('@/pages/OrderDetails/OrderDetails')
},
{// 银元转送
    path: '/Silver',
    name: 'Silver',
    component: () =>
        import('@/pages/Silver/Silver')
},
{// 积分兑换银元
    path: '/integral',
    name: 'integral',
    component: () =>
        import('@/pages/integral/integral')
},
{// 银元明细
    path: '/SilverBack',
    name: 'SilverBack',
    component: () =>
        import('@/pages/Silver/SilverBack')
},
{// 银元转赠
    path: '/SilverGive',
    name: 'SilverGive',
    component: () =>
        import('@/pages/Silver/SilverGive')
},
{// 佣金转赠
    path: '/RewardsGive',
    name: 'RewardsGive',
    component: () =>
        import('@/pages/rewardsNew/RewardsGive')
},
{// 微信登陆
    path: '/wxLogin',
    name: 'wxLogin',
    component: () =>
        import('@/pages/wxLogin/wxLogin')
},

{// 规则指引
    path: '/guize',
    name: 'guize',
    component: () =>
        import('@/pages/guize/guize')
},

{// 积分兑换
    path: '/convertIntegral',
    name: 'convertIntegral',
    component: () =>
        import('@/pages/convertIntegral/convertIntegral')
},
{//  卖出订单详情
    path: '/SellOrderDetails',
    name: 'SellOrderDetails',
    component: () =>
        import('@/pages/SellOrder/SellOrderDetails')
},
{//  实物订单
    path: '/dingdan',
    name: 'dingdan',
    component: () =>
        import('@/pages/dingdan/dingdan')
},
{//  余额提现明细
    path: '/balanceType',
    name: 'balanceType',
    component: () =>
        import('@/pages/balanceType/balanceType')
},
{//  佣金提现明细
    path: '/commissionType',
    name: 'commissionType',
    component: () =>
        import('@/pages/commissionType/commissionType')
}

]

const createRouter = () => new Router({
    mode: 'hash', // require service support  history
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
