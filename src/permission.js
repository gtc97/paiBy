import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

router.beforeEach((to, from, next) => {
  NProgress.start()
  const ids = localStorage.getItem('IDS')
  const user = localStorage.getItem('USER')
  const token = localStorage.getItem('TOKEN')
  const whiteList = ['/login', '/register', '/agreement', '/home']

  if ( token ) {
    next()
  } else {
    // 清理本地缓存
    // localStorage.clear()
    // localStorage.removeItem('TOKEN')
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/?redirect=${to.path}')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
