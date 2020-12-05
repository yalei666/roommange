<template>
  <el-menu background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" >
    <sidebar-item ></sidebar-item>
  </el-menu>
</template>
<script>
  import SidebarItem from './SidebarItem';
  export default {
    components:{SidebarItem},
  }
</script>
<style lang="less" scoped>

</style>