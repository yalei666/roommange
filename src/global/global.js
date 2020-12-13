import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import {Loading} from 'element-ui';
Vue.use(VueAxios,axios);
export const global = {
  post:function(url,body,sucCb,errorCb,config,isLoading=true,isLogin){
    if(!url){
      console.log('接口url不能为空！');
      return false;
    }
    if(isLoading){
      var loadingInstance = Loading.service({text:"拼命加载中"});
    }
     Vue.axios.post(url,body,config)
     .then((response) => {
         //响应成功回调
         console.log('成功回调')
         sucCb(response);
         if(isLoading){
            loadingInstance.close();
         }
    })
     .catch((response) => {
          console.log('失败回调')
          errorCb(response);
          if(isLoading){
            loadingInstance.close();
          }
     })
 },  
  get:function (url,options={},sucCb,errorCb,isLoading=true,isLogin){
    if(!url) {
      console.log('接口url不能为空！');
      return false;
    }
    if(isLoading){
      var loadingInstance = Loading.service({text:"拼命加载中"});
    }
    Vue.axios.get(url,{params:options})
    .then((response) =>{
      setTimeout(function() {
        //成功回调

        sucCb(response);
        if(isLoading){
          loadingInstance.close();
        }
      },500)
    })
    .catch(function(response){
      //失败回调
      errorCb(response);
      if(isLoading){
         loadingInstance.close();       
      }
    })
  },
};
;