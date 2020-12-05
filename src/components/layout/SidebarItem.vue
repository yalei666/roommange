<template>
  <div class="li">
    <template >
      <router-link to="/index/personalInfo">
        <el-menu-item index="/index/personalInfo">
          <i class="iconfont icon-shouye" aria-hidden="true"></i>首页
        </el-menu-item>
      </router-link>
      <router-link to="/movie/newMovie">
        <el-menu-item index="/movie/newMovie">
          <i class="iconfont icon-dianying" aria-hidden="true"></i>数据统计
        </el-menu-item>
      </router-link>
      <router-link to="/movie/movieSearch">
        <el-menu-item index="/movie/movieSearch">
          <i class="iconfont icon-dianying" aria-hidden="true"></i>数据分析
        </el-menu-item>  
      </router-link>
      <router-link to="/wenti/upload">
        <el-menu-item index="/wenti/upload">
          <i class="iconfont icon-biaoge" aria-hidden="true"></i>上传问题
        </el-menu-item>  
      </router-link>
 
      <el-submenu index="查看问题">
        <template slot="title">
          <i class="iconfont icon-icon--" aria-hidden="true"></i>查看问题
        </template>
          <router-link class="menu-indent" to="/wenti/anguan">
            <el-menu-item index="/wenti/anguan">
              安管问题
            </el-menu-item>
          </router-link>
          <router-link class="menu-indent" to="/wenti/shipin">
            <el-menu-item index="/wenti/shipin">
              视频问题
            </el-menu-item>  
          </router-link>
          <router-link class="menu-indent" to="/wenti/luyinbi">
            <el-menu-item index="/wenti/luyinbi">
              录音笔问题
            </el-menu-item>  
          </router-link>
          <router-link class="menu-indent" to="/wenti/LKJ">
            <el-menu-item index="/wenti/LKJ">
              LKJ问题
            </el-menu-item>  
          </router-link>
          <router-link class="menu-indent" to="/wenti/jingti">
            <el-menu-item index="/wenti/jingti">
              警惕问题
            </el-menu-item>  
          </router-link>
          <router-link class="menu-indent" to="/wenti/Lais">
            <el-menu-item index="/wenti/Lais">
              Lais问题
            </el-menu-item>  
          </router-link>             
      </el-submenu>
      <el-submenu index="系统设置">
        <template slot="title">
          <i class="iconfont icon-settingwrenches" aria-hidden="true"></i>系统设置
        </template>
          <router-link class="menu-indent" to="/systemSet/permissionsManage">
            <el-menu-item index="/systemSet/permissionsManage">
              权限管理
            </el-menu-item>  
          </router-link>
          <router-link class="menu-indent" to="/systemSet/loginLog">
            <el-menu-item index="/systemSet/loginLog">
              登录日志
            </el-menu-item>  
          </router-link>
      </el-submenu>
      <el-submenu index="数据统计分析" > 
          <template slot="title">
              <i class="iconfont icon-settingwrenches" aria-hidden="true"></i> 数据统计分析
          </template>
              <router-link  class="menu-indent" to="/studentsManage/studentList" >
                  <el-menu-item index="/studentsManage/studentList">
                      学生信息列表
                  </el-menu-item>
              </router-link>
              <router-link  class="menu-indent" to="/studentsManage/studentAdd" >
                  <el-menu-item index="/studentsManage/studentAdd">
                      学生信息添加
                  </el-menu-item>
              </router-link>
              <router-link  class="menu-indent" to="/studentsManage/studentUpdate" >
                  <el-menu-item index="/studentsManage/studentUpdate">
                      学生信息修改
                  </el-menu-item>
              </router-link>        
      </el-submenu>           
    </template>
  </div>
</template>
<script>
  export default{
    name:'SidebarItem',
    data () {
      return {

    }
    }
  }
</script>
<style>
.li{width:180px;}
.iconfont{margin-right: 10px; font-color:#bfcbd9;}

</style>