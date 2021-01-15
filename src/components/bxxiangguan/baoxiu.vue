<template>
  <div class="container">
    <el-form ref="form" :model="bxform" label-width="80px" size="medium">
      <el-form-item label="报修人:">
        <el-input  type="text" v-model="userInfo.stname" :disabled=true></el-input>  
      </el-form-item>
      <el-form-item label="报修宿舍:">
        <el-input  type="text" v-model="userInfo.sushehao" :disabled=true></el-input>  
      </el-form-item>      
      <el-form-item label="报修类别:">
        <el-radio-group class="left" v-model="bxform.liebie" >
          <el-radio label="木工"></el-radio>
          <el-radio label="电工"></el-radio>
          <el-radio label="水工"></el-radio>
        </el-radio-group>  
      </el-form-item> 
      <el-form-item label="报修详情">
        <el-input  type="textarea" v-model="bxform.xiangqing"></el-input>  
      </el-form-item> 
      <el-form-item label="报修图片">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>      
            <div slot="file" slot-scope="{file}">
              <img 
                class="el-upload-list_item-thumbnail" 
                :src="file.src" alt="">
              <span class="el-upload-list_item-actions">
                
              </span>  
            </div>
        </el-upload>   
      </el-form-item>    
    </el-form> 
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  export default{
    name:'baoxiu',
    data(){
      return {
        bxform:{
          liebie:'',
        },
      }
    },
    computed:{
      ...mapGetters([
        'userInfo'
      ])
    }


  }
</script>
<style>
  .container{
    margin-left:70px; 
  }
  .el-form{
    width: 460px;
  }
  .lef{
    margin-left:80px; 
  }
</style>