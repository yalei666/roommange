import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../components/layout/HelloWorld.vue'
import Login from '../components/login/login.vue'
Vue.use(VueRouter)

const routes = [
  {path: '/login',component:Login},
  {path: '/reset',component:()=>{'../components/login/reset.vue'},hidden:true},
  {
    path: '/',
    hidden:true,
    redirect:'/index/seeLifeCirel',
  },
  {
    path: '/index',
    component: Layout,
    redirect: 'noredirect',
    name: '',
    children:[
      {path: 'seeLifeCirel',component:()=>{import('../components/lifecirel/seelifecirel')},name:'浏览生活圈'},
      {path: 'writeLifeCirel',component:()=>{import('../components/lifecirel/writelifecirel')},name:'创作生活圈'},

    ],
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
