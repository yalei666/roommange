import Vue from 'vue';
import store from './store';
import App from './App.vue';
import router from './router';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false;
Vue.use(ElementUI);

const whiteList = ['/login','/reset'];
router.beforeEach((to,from,next) => {
  console.log(to.path)
  NProgress.start();//开启Progress
  if(store.getters.token) {
    if(to.path === '/login') {
        next({path:'/'});
    } else if(to.path == '/401'){
      next();
    } 
    else if(to.path == '/404'){
      next();
    } else {
      if(!store.getters.userInfo){
        console.log('未获取到用户信息',store.getters.userinfo)
          store.dispatch('GetInfo').then(res =>{
            console.log("waingxia");
            
            next();
            console.log("waingxssss");
          }).catch(err =>{
            console.log(err)
          });
      }else{
        console.log(to.path);
        if(store.getters.permission_routers[to.path] == undefined){
          next({path:'/404'});
          NProgress.done();
        }else if(store.getters.permission_routers[to.path] == false){
          next({path:'/401'});
          NProgress.done();
        } 
        else{
          console.log('1');
          next();
        }
      }
    }
  } else{
    if(whiteList.indexOf(to.path) !==-1){
      console.log(to.path);
      next()
    }else{
      next('/login');
      NProgress.done();
    }
  }
  NProgress.done();
});


router.afterEach(()=>{
  NProgress.done();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
