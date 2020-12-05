<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        class="demo-form-inline" 
        :inline="true"      
        label-width="auto">
        <el-form-item label="请选择上传问题类型：">
          <el-select v-model="exceldata.value" placeholder="请选择上传问题类型">
            <el-option
              v-for= "item in options"
              :key= "item.value"
              :label= "item.label"
              :value= "item.value"
            ></el-option> 
          </el-select>         
        </el-form-item>
        <el-form-item label="选择文件：">
         <el-upload
           class="upload"
           ref="upload"
           action="#"
           :on-success="handleSuccess"
           :on-change="handleChange"
           :file-list="fileListUpload"
           :http-request="uploadExcel"
           accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
           :auto-upload="false">
          <el-button slot="trigger" type="primary" size="small" icon="el-icon-document">选择文件</el-button>
         </el-upload>
        </el-form-item>
        <el-form-item label="确定上传: ">
          <el-button size="small" type="success" @click="uploadExcel">确定上传</el-button> 
        </el-form-item>      
      </el-form> 
  
    </div>
   
  </div>   
</template>
<script>
import {global} from '@/global/global';
import XLSX from 'xlsx';
export default{
  data () {
    return{
      options:[{
        value: 'anguan',
        label: '安管问题'
      },{
        value: 'shipin',
        label: '视频问题'
      },{
        value: 'luyinbi',
        label: '录音笔问题'
      },{
        value: 'lkj',
        label: 'LKJ问题'
      },{
        value: 'jingti',
        label: '警惕问题'
      },{
        value: 'lais',
        label: 'Lais问题'
      }],
      exceldata:{
        value: '',
        Exceljson: '',
      },
      fileListUpload:[],
    }
  },
  methods:{
      handleSuccess(response,file,fileList){
        console.log('1')
      },

      //处理文件改变
      handleChange(file, fileList){
        console.log('handleChange');
        var that = this;
        var reader = new FileReader();
        
        reader.onload = function(e){
          
          var data = e.target.result;
          var workbook = XLSX.read(data,{type:'binary'});
          
          var sheetNames = workbook.SheetNames;
          var worksheet = workbook.Sheets[sheetNames[0]];
          var json = XLSX.utils.sheet_to_json(worksheet);

          var findata = json.map(function(item,index){
            
            var obj={id:'0'};
            item={
              ...obj,
              ...item
            }
            return item;
          })
            
          that.exceldata.Exceljson = findata;

        };
        reader.readAsBinaryString(file.raw)       
      },
 //自定义上传请求
      uploadExcel(){
        var json = this.exceldata;
        var that = this;
        global.post('/api/wenti/handleupload',json,function(res){
          that.$message({
            showClose:true,
            message:res.data.resultMsg,
            type:'success'
          });
          that.$refs.upload.clearFiles();
        },function(res){
        },false)       
      },
      // //处理workbook
      // readWorkbook(workbook){
      //   var sheetNames = workbook.SheetName;
      //   var worksheet = workbook.Sheets[sheetNames[0]];
      //   var csv = XLSX.untils.sheet_to_json(worksheet);
      //   return csv;
      // },
    
  }  
}
</script>
<style>

</style>