<template>
  <div class="app-container">
    <!--搜索条件-->
    <div class="filter-container">
      <!-- 选择所属车队 -->
      <el-cascader 
        v-model= "listQuery.belong"
        placeholder="车间/车队/指导组"
        @change="handleBelongChange"
        :options="options"
        :props="{checkStrictly:true}"
        size="medium"
      clearable></el-cascader> 
      <!-- 选择起止时间 -->
      <el-date-picker
        class="time"
        v-model="time"
        @change="changetime(time)"
        range-separator="至"
        type = "daterange"
        start-placeholder = "开始时间"
        end-placeholder = "结束时间"
        :default-time ="['00:00:00','23:59:59']">
      </el-date-picker>
      <!-- 选择人员姓名 -->
      <el-input
        placeholder="请输入姓名"
        v-model="listQuery.peoplename"
        clearable
      ></el-input>
      <!-- 选择问题类型 -->

      <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="handleFilter">搜索</el-button>  
      <el-button class="filter-item" type="primary" icon="el-icon-edit">添加</el-button> 

      <el-button class="filter-item" type="primary" icon="el-icon-document" @click="handleDownload">导出</el-button> 
     
    </div>
    <el-table ref="multipleTable" :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border  highlight-current-row>

      <el-table-column type="selection" width="50"></el-table-column>
       
      <el-table-column align="center" v-for="item in itemArray" :key="item[1]" :prop="item[1]" :label="item[0]"  fixed style="width: 150%">
      </el-table-column>
      <el-table-column align="center"  label="操作" >
        <template slot-scope="scope">               
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
       </template>
     </el-table-column>      
    </el-table>
    <div class="pagination-container">
      <el-pagination 
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.currPage"
        :page-sizes="[5, 10 , 30, 50 ]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listQuery.total">
      </el-pagination>
    </div>

  </div>
  
</template>
<script>
  import {global} from '@/global/global';
  export default {
    props:["itemArray","propArray"],
    data () {
      return {        
        jsonUpload:[],
        tempfile:null,
        time:'',
        list:[],
        temp:{
          "chnlId" : "",
          "hisChnlId" : "",
          "chnlName" : "",
          "state" : "",
          "isavailable" : "",
          "orderNum":10
        },
        listLoading:true,
        listQuery:{
          currPage:1,
          pageSize:5,
          total:0,
          belong:'',
          starttime:'',
          endtime:'',
          tablename:'',
          zerenren:''
        },
        multipleSelection:[],
        options: [{
          value: '石家庄运用车间',
          label: '石运车间',
          children: [{
            value: '石榆队',
            label: '石榆',
            children: [{
              value: '第一指导组',
              label: '第一指导组'
            }, {
              value: '第二指导组',
              label: '第二指导组'
            }, {
              value: '第三指导组',
              label: '第三指导组'
            }, {
              value: '第四指导组',
              label: '第四指导组'
            }]
          }, {
            value: '石阳队',
            label: '石阳',
            children: [{
              value: '第一指导组',
              label: '第一指导组'
            }, {
              value: '第二指导组',
              label: '第二指导组'
            }, {
              value: '第三指导组',
              label: '第三指导组'
            }, {
              value: '第四指导组',
              label: '第四指导组'
            }, {
              value: '第五指导组',
              label: '第五指导组'
            }, {
              value: '第六指导组',
              label: '第六指导组'
            }, {
              value: '第七指导组',
              label: '第七指导组'
            }, {
              value: '第八指导组',
              label: '第八指导组'                
            }, {
              value: '第九指导组',
              label: '第九指导组'
            }]
          }, {
            value: '石太队',
            label: '石太',
            children: [{
              value: '第一指导组',
              label: '第一指导组'
            }, {
              value: '第二指导组',
              label: '第二指导组'
            }, {
              value: '第三指导组',
              label: '第三指导组'
            }, {
              value: '第四指导组',
              label: '第四指导组'
            }, {
              value: '第五指导组',
              label: '第五指导组'
            }, {
              value: '第六指导组',
              label: '第六指导组'
            }, {
              value: '第七指导组',
              label: '第七指导组'
            }, {
              value: '第八指导组',
              label: '第八指导组'
            }]
          }]
        }, {
          value: '石家庄北运用车间',
          label: '石北车间',
          children: [{
            value: '石津队',
            label: '石津',
            children: [{
              value: '第一指导组',
              label: '第一指导组'
            }, {
              value: '第二指导组',
              label: '第二指导组'
            }, {
              value: '第三指导组',
              label: '第三指导组'
            }, {
              value: '第四指导组',
              label: '第四指导组'
            }, {
              value: '第五指导组',
              label: '第五指导组'
            }, {
              value: '第六指导组',
              label: '第六指导组'
            }, {
              value: '第七指导组',
              label: '第七指导组'
            }, {
              value: '第八指导组',
              label: '第八指导组'
            }]
          }, {
            value: '石济队',
            label: '石济',
            children: [{
              value: '第一指导组',
              label: '第一指导组'
            }, {
              value: '第二指导组',
              label: '第二指导组'
            }, {
              value: '第三指导组',
              label: '第三指导组'
            }, {
              value: '第四指导组',
              label: '第四指导组'
            }, {
              value: '第五指导组',
              label: '第五指导组'
            }, {
              value: '第六指导组',
              label: '第六指导组'
            }, {
              value: '第七指导组',
              label: '第七指导组'
            }, {
              value: '第八指导组',
              label: '第八指导组'
            }, {
              value: '第九指导组',
              label: '第九指导组'
            }, {
              value: '第十指导组',
              label: '第十指导组'
            }]
          }, {
            value: '石德货队',
            label: '石德货',
            children: [{
              value: '第一指导组',
              label: '第一指导组'
            }, {
              value: '第二指导组',
              label: '第二指导组'
            }, {
              value: '第三指导组',
              label: '第三指导组'
            }, {
              value: '第四指导组',
              label: '第四指导组'
            }, {
              value: '第五指导组',
              label: '第五指导组'
            }, {
              value: '第六指导组',
              label: '第六指导组'
            }]
          }, {
            value: '石德客队',
            label: '石德客',
            children: [{
              value: '第一指导组',
              label: '第一指导组'
            }, {
              value: '第二指导组',
              label: '第二指导组'
            }, {
              value: '第三指导组',
              label: '第三指导组'
            }, {
              value: '第四指导组',
              label: '第四指导组'
            }, {
              value: '第五指导组',
              label: '第五指导组'
            }]
          }, {
            value: '石聊队',
            label: '石聊',
            children: [{
              value: '第一指导组',
              label: '第一指导组'
            }, {
              value: '第二指导组',
              label: '第二指导组'
            }, {
              value: '第三指导组',
              label: '第三指导组'
            }, {
              value: '第四指导组',
              label: '第四指导组'
            }, {
              value: '第五指导组',
              label: '第五指导组'
            }]
          }]
        }, {
          value: '阳泉运用车间',
          label: '阳泉运用',
          children: [{
            value: '第一机车队',
            label: '第一机车队',
            children: [{
              value: '第一指导组',
              label: '第一指导组'
            }, {
              value: '第二指导组',
              label: '第二指导组'
            }, {
              value: '第三指导组',
              label: '第三指导组'
            }, {
              value: '第四指导组',
              label: '第四指导组'
            }, {
              value: '第五指导组',
              label: '第五指导组'
            }]
          }, {
            value: '第二机车队',
            label: '第二机车队',
            children: [{
              value: '第一指导组',
              label: '第一指导组'
            }, {
              value: '第二指导组',
              label: '第二指导组'
            }, {
              value: '第三指导组',
              label: '第三指导组'
            }, {
              value: '第四指导组',
              label: '第四指导组'
            }, {
              value: '第五指导组',
              label: '第五指导组'
            }]
          }, {
            value: '第三机车队',
            label: '第三机车队',
            children: [{
              value: '第一指导组',
              label: '第一指导组'
            }, {
              value: '第二指导组',
              label: '第二指导组'
            }, {
              value: '第三指导组',
              label: '第三指导组'
            }, {
              value: '第四指导组',
              label: '第四指导组'
            }, {
              value: '第五指导组',
              label: '第五指导组'
            }]
          }]
        }, {
          value: '保定运用车间',
          label: '保定运用',
          children: [{
            value: '一机车',
            label: '一机车',
            children: [{
              value: '第一指导组',
              label: '第一指导组'
            }, {
              value: '第二指导组',
              label: '第二指导组'
            }, {
              value: '第三指导组',
              label: '第三指导组'
            }, {
              value: '第四指导组',
              label: '第四指导组'
            }]
          }, {
            value: '二机车',
            label: '二机车',
            children: [{
              value: '第一指导组',
              label: '第一指导组'
            }, {
              value: '第二指导组',
              label: '第二指导组'
            }, {
              value: '第三指导组',
              label: '第三指导组'
            }, {
              value: '第四指导组',
              label: '第四指导组'
            }]
          }, {
            value: '三机车',
            label: '三机车',
            children: [{
              value: '第一指导组',
              label: '第一指导组'
            }, {
              value: '第二指导组',
              label: '第二指导组'
            }, {
              value: '第三指导组',
              label: '第三指导组'
            }, {
              value: '第四指导组',
              label: '第四指导组'
            }]
          }, {
            value: '四机车',
            label: '四机车(调车)',
            children: [{
              value: '第一指导组',
              label: '第一指导组'
            }, {
              value: '第二指导组',
              label: '第二指导组'
            }, {
              value: '第三指导组',
              label: '第三指导组'
            }]
          }]
        }, {
          value: '调车车间',
          label: '调车车间',
          children: [{
            value: '调车队',
            label: '调车队',
            children: [{
              value: '第一指导组',
              label: '第一指导组'
            }, {
              value: '第二指导组',
              label: '第二指导组'
            }, {
              value: '第三指导组',
              label: '第三指导组'
            }]
          }, {
            value: '调小队',
            label: '调小队',
            children: [{
              value: '第一指导组',
              label: '第一指导组'
            }, {
              value: '第二指导组',
              label: '第二指导组'
            }, {
              value: '第三指导组',
              label: '第三指导组'
            }]
          }]
        }, {
          value: '高铁车间',
          label: '高铁车间',
          children: [{
            value: '石济客专',
            label: '石济客专',
            children: [{
              value: '第一指导组',
              label: '第一指导组'
            }, {
              value: '第二指导组',
              label: '第二指导组'
            }, {
              value: '第三指导组',
              label: '第三指导组'
            }, {
              value: '第四指导组',
              label: '第四指导组'
            }]
          }]
        }]               
      }
    },
    mounted () {
      let vm=this;
      vm.getList(); 
    },
    methods:{
      switchTimeFormat (vm,time) {

          const dateTime = new Date(time)
          const year = dateTime.getFullYear()
          const month = dateTime.getMonth() + 1
          const date = dateTime.getDate()
          const hour = dateTime.getHours()
          const minute = dateTime.getMinutes()
          const second = dateTime.getSeconds()
          return `${year}-${vm.$options.methods.addZero(month)}-${vm.$options.methods.addZero(date)} ${vm.$options.methods.addZero(hour)}:${vm.$options.methods.addZero(minute)}:${vm.$options.methods.addZero(second)}`
            },
      addZero (v) {
        return v < 10 ? '0' + v : v
      },
      //处理车队改变
      handleBelongChange (value) {
        console.log(value)
      },
      //获取开始结束时间
      changetime(time){
        let vm = this;

        vm.listQuery.starttime = vm.time[0];
        vm.listQuery.endtime = vm.time[1];

      },
      initTemp(){
        let vm=this;
        vm.temp = {
          "chnlId" : "",
          "hisChnlId" : "",
          "chnlName" : "",
          "state" : "",
          "isavailable" : "",
          "orderNum":10
        }
      },
      //获取列表数据
      getList() {
        let vm = this;
        vm.listLoading = true;
        global.get('/api/wenti/tableList',vm.listQuery,function(res){
         
          let data= res.data;
          if(data.resultCode == 0){
            var findata = data.data.tablelist.map(function(item,index){
              
            item["riqi"]=vm.$options.methods.switchTimeFormat(vm,item["riqi"]);
            return item;
            })
            vm.list = findata;
            console.log('列表数据',vm.list);
            vm.listQuery.currPage = Number(data.data.currPage);
            vm.listQuery.pageSize = Number(data.data.pageSize);
            
            vm.listQuery.total = data.data.total;

            vm.listLoading = false;
          } else {
            Message({
              showClose : true,
              message : data.resultMsg,
              type:'error'
            });
            vm.listLoading = false;
          }
        },function(res){
 
        },false)


      },
      //编辑
      handleEdit(index,row){
        let vm = this;
        console.log('编辑的row:',index,'.....',row);
        this.$router.push({path:'/example/form',query:{id:row.child}});
      },
      //单个删除
      handleDelete(index,row){
        let vm = this;
        console.log('单个删除选择的row:',index,'.....',row);
        //前端删除
        vm.list.splice(index,1)
      },
      //批量删除
      handleDelAll(){
        let vm = this;
        console.log('批量删除选择的row:',vm.multipleSelection)
      },
      //搜索
      handleFilter(){
        this.getList();
      },
      //操作分页
      handleSizeChange(val){
        this.listQuery.pageSize = val;
        this.getList();
      },
      //操作分页
      handleCurrentChange(val){
        console.log('....',val)
        this.listQuery.currPage = val;
        this.getList();
      },
      //新增
      handleCreate() {
          //每次点击新增时 重置下新增表单数据，避免双向绑定的影响
          this.initTemp();
          this.dialogFormVisible = true;
      },      
      //新增提交
      handleCreateSubmit(){
          let vm = this;
          console.log('新增入参：',vm.temp)
          //这里作演示用，正式新增 请提交到接口
          vm.list.push(vm.temp)
          console.log('新增后',vm.list)
          
          this.dialogFormVisible = false;
      },
      handleDownload() {
        let vm = this;
        global.get('/api/example/download',vm.listQuery,function (res){

          let data =res.data;

          require.ensure([], () => {
            const { export_json_to_excel } = require('@/Excel/Export2Excel');
            const tHeader = ['字段1', '字段2', '字段3', '字段4', '字段5'];
            const filterVal = ['chnlId', 'hisChnlId', 'chnlName', 'state', 'orderNum'];
            const list = data.data.tablelist;
            const data = vm.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '导出的列表excel');
          })
     
        },function(res){

        },false)
     },
    handleInput(){

    },
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    }
  };
</script>
<style>
.inline-block {
  display: inline-block;
  margin-left: 10px;
}
</style>