<template>
  <div class="zong">
    <div class="login-container">
      <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="0px" class="login-form">
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
    </div>
    <div class="tanchuang">
      <el-dialog title="请填写注册信息" :visible="dialogVisible" @close="dialogVisible = false">
        <el-form :model="resetForm">
          <el-form-item label="账号" :label-width="formLabelWidth">      
            <el-input v-model="resetForm.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">      
            <el-input v-model="resetForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="再次输入密码" :label-width="formLabelWidth">      
            <el-input v-model="resetForm.conpassword" autocomplete="off"></el-input>
          </el-form-item>                        
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="resetForm.stname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="班级" :label-width="formLabelWidth">
            <el-cascader
              v-model="resetForm.grade"
              separator="-"
              :options="stcloptions"
              :props="{expandTrigger:'hover'}"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="宿舍号" :label-width="formLabelWidth">
            <el-cascader
              v-model="resetForm.sushehao"
              separator="-"
              :options="strmoptions"
              :props="{expandTrigger:'hover'}"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="上传头像" :label-width="formLabelWidth">
            <el-upload ref="upload"
              class="avatar-uploader"
              :show-file-list="true"
              :http-request="uploadAll"
              :auto-upload="false"
              :file-list="fileList"
              action="">
              <el-button size="small" type="primary">选择要上传的头像</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>         
            </el-upload> 
          </el-form-item>          
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible =false">取消</el-button>
          <el-button type="primary" @click="dialogVisible =false;resetsub()">确认提交</el-button>
        </span>
      </el-dialog>       
    </div>    
  </div>
</template>
<script>
  import {global} from '../../global/global.js'
  import stcloptions from '../../global/banji.js'
  import strmoptions from '../../global/sushe.js'
  export default {
    data() {
      return {
        fileList:[],
        formLabelWidth:'120px',
        loading:false,
        ruleForm: {
          account:'',
          password: '',
        },
        resetForm:{
          account:'',
          password:'',
          conpassword:'',
          stname:'',
          grade:[],
          sushehao:[],
        },
        dialogVisible:false,
        stcloptions,
        strmoptions,
        params:"",
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
      uploadAll(params){
        let vm = this;
        let forData = new FormData();
        forData.append('id',0);
        forData.append('file',params.file);
        forData.append('grade',vm.resetForm.grade);
        forData.append('stname',vm.resetForm.stname);
        forData.append('account',vm.resetForm.account);
        forData.append('password',vm.resetForm.password);
        forData.append('sushehao',vm.resetForm.sushehao);
        global.post('/api/login/reset',forData,(res)=>{
          console.log(vm);
          vm.$alert('注册成功,请登录!','通知消息',{
            type:'sucess',
            center:true,
            confirmButtonText:'去登录',
            callback:action =>  {
              if(action == 'confirm'){

              }
            }
          })
        },(res)=>{
          console.log(res)
        })       
      },
      resetsub(){
        this.$refs.upload.submit();
      },

    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" >
.zong{
    .login-container {
        position:relative;
        height: 100vh;
        /*background-color: #2d4a4b;*/
       
        background: url('../../assets/img/bg_sky.jpg') no-repeat;
        background-size: 100% 100%;
        
        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #294444 inset !important;
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
    .tanchuang{
      .el-input{
        width:300px;
      }
          .el-dialog{
          width:30% !important;
        }    
    }

}
   
</style>