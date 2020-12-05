<template>
  <div class="login-container">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="login-form">
      <h3 class="title">系统登录<i class="" aria-hidden="true"></i></h3>
      <el-form-item prop="email">
        <el-input type="text" v-model="ruleForm.account" autocomplete="off" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item  prop="pass">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="密码"></el-input>
      </el-form-item>
        <el-button type="primary"  @click="submitForm()">登录</el-button>
        <el-button  class="middle" type="success" @click="dialogVisible = true">注册</el-button>
        <el-button class="right">忘记密码</el-button>
      </el-form-item>
    </el-form>
    <el-dialog tile="请填写注册信息" :visible="dialogVisible">
      <el-form :model="resetForm">
        <el-form-item label="姓名" >
          <el-input v-model="resetForm.stname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" >
          <el-cascader
            v-model="resetForm.grade"
            :options="stoptions"
            :props="{expandTrigger:'hover'}"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible =false">取消</el-button>
        <el-button @click="dialogVisible =false;resetsub()">确认提交</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import {global} from '../../global/global.js'
  export default {
    data() {
      return {
        loading:false,
        ruleForm: {
          account:'',
          password: '',
        },
        resetForm:{
          stname:'',
          grade:[],
        },
        dialogVisible:false,
        stoptions:[{
          value:'2017',
          label:'2017级',
          children:[{
            value:'信息',
            label:'信息系',
            children:[{
              value:'计算机1',
              label:'计算机1班',
            },{
              value:'计算机2',
              label:'计算机2班',
            },{
              value:'信管1',
              label:'信管1班',
            },{
              value:'信管2',
              label:'信管2班',
            },{
              value:'电子1',
              label:'电子1班',              
            },{
              value:'电子2',
              label:'电子2班',              
            }]
          },{
            value:'管理',
            label:'管理系',
            children:[{
              value:'财管1',
              label:'财务管理1班',
            },{
              value:'财管2',
              label:'财务管理2班',
            },{
              value:'财管3',
              label:'财务管理2班',
            },{
              value:'审计1',
              label:'审计1班',
            },{
              value:'审计2',
              label:'审计2班',              
            },{
              value:'人力1',
              label:'人力资源管理2班',              
            }]            
          },{
            value:'会计',
            label:'会计系',
            children:[{
              value:'会计1',
              label:'会计1班',
            },{
              value:'会计2',
              label:'会计2班',
            },{
              value:'会计3',
              label:'会计3班',
            },{
              value:'会计4',
              label:'会计4班',
            },{
              value:'会计5',
              label:'会计5班',              
            },{
              value:'会计6',
              label:'会计6班',              
            }]            
          }]
        },{
          value:'2018',
          label:'2018级',
          children:[{
            value:'信息',
            label:'信息系',
            children:[{
              value:'计算机1',
              label:'计算机1班',
            },{
              value:'计算机2',
              label:'计算机2班',
            },{
              value:'信管1',
              label:'信管1班',
            },{
              value:'信管2',
              label:'信管2班',
            },{
              value:'电子1',
              label:'电子1班',              
            },{
              value:'电子2',
              label:'电子2班',              
            }]
          },{
            value:'管理',
            label:'管理系',
            children:[{
              value:'财管1',
              label:'财务管理1班',
            },{
              value:'财管2',
              label:'财务管理2班',
            },{
              value:'财管3',
              label:'财务管理2班',
            },{
              value:'审计1',
              label:'审计1班',
            },{
              value:'审计2',
              label:'审计2班',              
            },{
              value:'人力1',
              label:'人力资源管理2班',              
            }]            
          },{
            value:'会计',
            label:'会计系',
            children:[{
              value:'会计1',
              label:'会计1班',
            },{
              value:'会计2',
              label:'会计2班',
            },{
              value:'会计3',
              label:'会计3班',
            },{
              value:'会计4',
              label:'会计4班',
            },{
              value:'会计5',
              label:'会计5班',              
            },{
              value:'会计6',
              label:'会计6班',              
            }]            
          }]
        },{
          value:'2019',
          label:'2019级',
          children:[{
            value:'信息',
            label:'信息系',
            children:[{
              value:'计算机1',
              label:'计算机1班',
            },{
              value:'计算机2',
              label:'计算机2班',
            },{
              value:'信管1',
              label:'信管1班',
            },{
              value:'信管2',
              label:'信管2班',
            },{
              value:'电子1',
              label:'电子1班',              
            },{
              value:'电子2',
              label:'电子2班',              
            }]
          },{
            value:'管理',
            label:'管理系',
            children:[{
              value:'财管1',
              label:'财务管理1班',
            },{
              value:'财管2',
              label:'财务管理2班',
            },{
              value:'财管3',
              label:'财务管理2班',
            },{
              value:'审计1',
              label:'审计1班',
            },{
              value:'审计2',
              label:'审计2班',              
            },{
              value:'人力1',
              label:'人力资源管理2班',              
            }]            
          },{
            value:'会计',
            label:'会计系',
            children:[{
              value:'会计1',
              label:'会计1班',
            },{
              value:'会计2',
              label:'会计2班',
            },{
              value:'会计3',
              label:'会计3班',
            },{
              value:'会计4',
              label:'会计4班',
            },{
              value:'会计5',
              label:'会计5班',              
            },{
              value:'会计6',
              label:'会计6班',              
            }]            
          }]
        },{
          value:'2020',
          label:'2020级',
          children:[{
            value:'信息',
            label:'信息系',
            children:[{
              value:'计算机1',
              label:'计算机1班',
            },{
              value:'计算机2',
              label:'计算机2班',
            },{
              value:'信管1',
              label:'信管1班',
            },{
              value:'信管2',
              label:'信管2班',
            },{
              value:'电子1',
              label:'电子1班',              
            },{
              value:'电子2',
              label:'电子2班',              
            }]
          },{
            value:'管理',
            label:'管理系',
            children:[{
              value:'财管1',
              label:'财务管理1班',
            },{
              value:'财管2',
              label:'财务管理2班',
            },{
              value:'财管3',
              label:'财务管理2班',
            },{
              value:'审计1',
              label:'审计1班',
            },{
              value:'审计2',
              label:'审计2班',              
            },{
              value:'人力1',
              label:'人力资源管理2班',              
            }]            
          },{
            value:'会计',
            label:'会计系',
            children:[{
              value:'会计1',
              label:'会计1班',
            },{
              value:'会计2',
              label:'会计2班',
            },{
              value:'会计3',
              label:'会计3班',
            },{
              value:'会计4',
              label:'会计4班',
            },{
              value:'会计5',
              label:'会计5班',              
            },{
              value:'会计6',
              label:'会计6班',              
            }]            
          }]
        }]
      };
    },
    methods: {
      submitForm() {
        var vm = this;
        var par = JSON.parse(JSON.stringify(vm.ruleForm));
        vm.$store.dispatch('LoginByEmail',par).then((res)=>{
          console.log('登录成功即将跳转。。。。。。')
          vm.$router.push({path:'/'});
        })   
      },
      resetsub(){
        let vm = this;
        let par = JSON.parse(JSON.stringify(vm.resetForm));
        global.post('/api/login/reset',par,(res)=>{
          console.log(res)
        },(res)=>{
          console.log(res)
        })
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
    .login-container {
        position:relative;
        height: 100vh;
        /*background-color: #2d3a4b;*/
       
        background: url('../../assets/img/bg_sky.jpg') no-repeat;
        background-size: 100% 100%;
        
        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
            -webkit-text-fill-color: #fff !important;
        }
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: #eeeeee;
            height: 47px;
        }
        el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
        }
        .title {
            font-size: 26px;
            font-weight: 400;
            color: #eeeeee;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 400px;
            padding: 35px 35px 15px 35px;
            margin: 120px auto;
        }
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
        .middle{
          margin-left:80px !important;
        }
    }
</style>