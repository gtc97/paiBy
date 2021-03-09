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
                import ('@/pages/Home/Home')
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
                import ('@/pages/Rewards/Rewards')
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
                import ('@/pages/Notice/Notice')
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
                import ('@/pages/My/My')
        }]
    },
    {
        path: '/',
        component: Layout,
        redirect: '/goods',
        children: [{
            path: 'goods',
            name: '书法上午场',
            meta: { title: '书法上午场' },
            component: () =>
                import ('@/pages/Goods/Goods')
        }]
    },
    {
        path: '/rakeback',
        name: 'RakeBack',
        component: () =>
            import ('@/pages/RakeBack/RakeBack')
    },
    {
        path: '/friends',
        name: 'Friends',
        component: () =>
            import ('@/pages/Friends/Friends')
    },
    {
        path: '/noticeDetails/:id',
        name: 'NoticeDetails',
        component: () =>
            import ('@/pages/NoticeDetails/NoticeDetails')
    },
    {
        path: '/signing',
        name: 'Signing',
        component: () =>
            import ('@/pages/Signing/Signing')
    },
    {
        path: '/wallet',
        name: 'Wallet',
        component: () =>
            import ('@/pages/Wallet/Wallet')
    },
    {
        path: '/addAddress',
        name: 'AddAddress',
        component: () =>
            import ('@/pages/AddAddress/AddAddress')
    },
    {
        path: '/address',
        name: 'Address',
        component: () =>
            import ('@/pages/Address/Address')
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import ('@/pages/Register/Register')
    },
    {
        path: '/seting',
        name: 'Seting',
        component: () =>
            import ('@/pages/Seting/Seting')
    },
    {
        path: '/goodsdetails/:id',
        name: 'GoodsDetails',
        component: () =>
            import ('@/pages/GoodsDetails/GoodsDetails')
    },
    {
        path: '/invitation',
        name: 'Invitation',
        component: () =>
            import ('@/pages/Invitation/Invitation')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('@/pages/Login/Login')
    },
    {
        path: '/pay',
        name: 'Pay',
        component: () =>
            import ('@/pages/Pay/Pay')
    },
    {
        path: '/order',
        name: 'Order',
        component: () =>
            import ('@/pages/Order/Order')
    },
    {
        path: '/guide',
        name: 'Guide',
        component: () =>
            import ('@/pages/Guide/Guide')
    },
    {
        path: '/riskTips',
        name: 'RiskTips',
        component: () =>
            import ('@/pages/RiskTips/RiskTips')
    },
    {
        path: '/guidelines',
        name: 'Guidelines',
        component: () =>
            import ('@/pages/Guidelines/Guidelines')
    },
    {
        path: '/agreement',
        name: 'Agreement',
        component: () =>
            import ('@/components/Agreement')
    },
    {
        path: '/sellOrder',
        name: 'SellOrder',
        component: () =>
            import ('@/pages/SellOrder/SellOrder')
    },
    {
        path: '/withdrawal',
        name: 'Withdrawal',
        component: () =>
            import ('@/pages/Withdrawal/Withdrawal')
    },
    {
        path: '/rechargetype',
        name: 'RechargeType',
        component: () =>
            import ('@/pages/RechargeType/RechargeType')
    }

]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router