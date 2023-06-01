import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      component: () => import('../components/Login/Login.vue'),
      meta: {
        title: '登录页',
      },
    },
    {
      path: '/index',
      component: () => import('./views/Index/Index.vue'),
      meta: {
        title: '首页',
      },
      children: [
        // 重定向默认展示页面
        { path: '', redirect: 'backstage' },
        //   后台首页
        {
          path: 'backstage',
          component: () => import('./views/Index/BackstAge/BackstAge.vue'),
          meta: {
            title: '后台首页',
          },
        },
        //   订单管理
        {
          path: 'order',
          component: () => import('./views/Index/OrdeR/OedeR.vue'),
          meta: {
            title: '订单管理',
          },
        },
        //   商品列表
        {
          path: 'comlist',
          component: () => import('./views/Index/CommodityList/CommodityList.vue'),
          meta: {
            title: '商品列表',
          },
        },
        //   商品添加
        {
          path: 'comadd',
          component: () => import('./views/Index/ComAdd/ComAdd.vue'),
          meta: {
            title: '商品添加',
          },
        },
        //     商品分类
        {
          path: 'comclassify',
          component: () => import('./views/Index/ComClassify/ComClassify.vue'),
          meta: {
            title: '商品分类',
          },
        },
        // 店铺管理
        {
          path: 'shopadmin',
          component: () => import('./views/Index/ShopAdmin/ShopAdmin.vue'),
          meta: {
            title: '店铺管理',
          },
        },
        //     账号列表
        {
          path: 'accountlist',
          component: () => import('./views/Index/AccountList/AccountList.vue'),
          meta: {
            title: '账号列表',
          },
        },
        // 添加账号
        {
          path: 'accountadd',
          component: () => import('./views/Index/AccountAdd/AccountAdd.vue'),
          meta: {
            title: '添加账号',
          },
        },
        // 修改密码
        {
          path: 'changepwd',
          component: () => import('./views/Index/ChangePwd/ChangePwd.vue'),
          meta: {
            title: '修改密码',
          },
        },
        // 商品统计
        {
          path: 'comstatistics',
          component: () => import('./views/Index/ComStatistics/ComStatistics.vue'),
          meta: {
            title: '商品统计',
          },
        },
        // 订单统计
        {
          path: 'orderstatistics',
          component: () => import('./views/Index/OrderStatistics/OrderStatistics.vue'),
          meta: {
            title: '订单统计',
          },
        },
        // 个人中心
        {
          path: 'individualcenter',
          component: () => import('./views/Index/IndividualCenter/IndividualCenter.vue'),
          meta: {
            title: '个人中心',
          },
        },
      ],
    },
  ],
  mode: 'history',
});

// 解决沉余
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => {
    }, () => {
    });
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => {
    }, () => {
    });
  }
};

router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  // next()
  const token = localStorage.getItem('token');
  if (to.path === '/index') {
    if (token) {
      next();
    } else {
      alert('密码错误');
      next(false);
    }
  } else {
    next();
  }
});

export default router;
