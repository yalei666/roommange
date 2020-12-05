<template>
  <div class="app-container">
    <el-row :gutter="20" type="flex">
      <el-col :span="8" >
        <div class="user_img">
          <img :src="personalInfo.avatar" alt="用户头像">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"   :show-file-list="false" >
          <el-button type="primary" class="el-button filter-item el-button-peimary" style="margin-top:10px">
              <i class="iconfont icon-ziyuan" aria-hidden="true"></i>
              <span>上传头像</span>
            </el-button>
          </el-upload>  
        </div>
      </el-col>
      <el-col :span="16">
        <div class="user_info">
          <h2>个人信息<el-button size="small" style="float:right;" class="el-icon-edit">编辑</el-button></h2>
          <div class="user_info_form" v-if="editable">

            <el-form label-position="right" label-width="100px" :model="personalInfo">
              <el-form-item label="昵称">
                <el-input v-model="personalInfo.nickname"></el-input>  
              </el-form-item>
              <el-form-item label="真实姓名">
                <el-input v-model="personalInfo.trueName"></el-input>  
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="personalInfo.sex">
                  <el-radio label="man">男</el-radio>
                  <el-radio label="woman">女</el-radio>
                </el-radio-group>  
              </el-form-item>
              <el-form-item label="邮件地址">
                <el-input v-model="personalInfo.email" disabled=""></el-input>  
              </el-form-item>        
              <el-form-item label="个人简介">
                <el-input type="textarea" v-model="personalInfo.introduction"></el-input>  
              </el-form-item> 
              <el-form-item>
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="resetForm()">取消</el-button>
              </el-form-item>   
            </el-form>
          </div>
          <div class="user_info_text" v-else>
            <el-form label-position="right" label-width="100px" :model="personalInfo">
              <el-form-item label="昵称:">
              {{personalInfo.nickname}}  
              </el-form-item>
              <el-form-item label="真实姓名">
                {{personalInfo.trueName}}
              </el-form-item>
              <el-form-item label="性别：">
                <span v-if="personalInfo.sex=='男'">男</span>
                <span v-else>女</span>
              </el-form-item>
              <el-form-item label="邮件地址：">
                {{personalInfo.email}}
              </el-form-item>
              <el-form-item label="个人简介 :">
                {{personalInfo.introduction}}
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>   
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="8">
        <div id="income">
          
        </div>
      </el-col>  
      <el-col :span="12">
        <div id="interset">
          
        </div>
      </el-col>  
    </el-row>

  </div>
</template>
<script>  
  import {mapGetters} from 'vuex';
  var echarts = require('echarts');

  export default {
    data () {
      return {
        editable:false,
        personalInfo:{},
        newImageUrl:'',
      }
    },
    computed: {
      ...mapGetters({

        personalInfo_init:'userInfo'
      })
    },
    mounted () {
      var vm = this;

      var myChart1 = echarts.init(document.getElementById('income'));
      var myChart2 = echarts.init(document.getElementById('interset'));

      myChart1.setOption({
        title: {text:'最近收入'},
        tooltip:{},
        xAxis:{
          data:["3月","4月","5月","6月","7月","8月"]
        },
        yAxis:{},
        series:[{
          name:'收入',
          type:'bar',
          data:[800,1200,1360,1100,1100,1800]
        }]
      });
      //绘制兴趣图表
      myChart2.setOption({
        title: {text:'兴趣爱好'},
        series: [
          {
            name:'兴趣',
            type:'pie',
            radius:'55%',
            data:[
              {value:500,name:'吃饭'},
              {value:250,name:'睡觉'},
              {value:100,name:'打豆豆'},
              {value:100,name:'看电影'},
              {value:50,name:'其他'}
            ]
          }
        ]
      })
    },
    methods:{
      submitForm () {
        var vm=this;
        vm.editable = false;
        var par = {
          "account": vm.personalInfo.account,
          "nickname": vm.personalInfo.nickname,
          "trueName": vm.personalInfo.trueName,
          "sex": vm.personalInfo.sex,
          "email": vm.personalInfo.email,
          "introduction":vm.personalInfo.introduction, 
        };
        console.log('修改信息入参为：',par)
      },
    }
  }
</script>
<style lang="scss" scoped>
  .user_img{
    padding: 20px;
    text-align: center;
    border:1px solid #dee1e2;
    img {
      max-width:162px;
      max-height:162px;
      border-radius:50%;
    }
  }
  .user_info{
    border:1px solid #dee1e2;
    h2{
      margin:0;
      font-weight:normal;
      padding:10px 20px;
      border-bottom:1px solid #dee1e2;
      .i_edit{
        float:right;
        font-size:16px;
        color:#7ab8ed;
      }
    }
  }
  .user_info_form,.user_info_text{
    padding:20px;
  }
  #income,#interset{
    width:100%;
    height:400px;
  }
  .el-form-item{
    margin-bottom:0;
  }
  .avatar-uploader{
    margin-bottom:32px;
  }
</style>