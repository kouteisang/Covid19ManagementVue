<template>
  <div class="echarts">
   <div>
      <el-col :xs="24" :sm="24" :md="24" :lg="120" :xl="200" style="margin-bottom: 20px;">
        <Maps />
      </el-col>
   </div>
  </div>

</template>
<script>
import Maps from "./map";
export default {
  components:{
    Maps
  }
}
</script>

