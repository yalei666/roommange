import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../components/layout/HelloWorld.vue'
import Login from '../components/login/login.vue'
import seelifecirel from '../components/lifecirel/seelifecirel.vue'
Vue.use(VueRouter)

const routes = [
  {path: '/login',component:Login},
  {path: '/reset',component:()=>{'../components/login/reset.vue'},hidden:true},
  {
    path: '/',
    hidden:true,
    redirect:'/index/seelifeCirel',
  },
  {
    path: '/index',
    component: Layout,
    redirect: 'noredirect',
    name: '总',
    children:[
      {path: 'seelifeCirel',component:seelifecirel,name:'浏览生活圈'},
      {path: 'writeLifeCirel',component:()=>{('../components/lifecirel/writelifecirel')},name:'创作生活圈'},

    ],
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
