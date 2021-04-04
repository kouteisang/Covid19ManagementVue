<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 表单
        </el-breadcrumb-item>
        <el-breadcrumb-item>基本表单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="110px">
          <el-form-item label="姓名">
            <el-input v-model="form.realName" placeholder="请输入姓名" style="width:200px" ></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="form.identityId" placeholder="请输入身份证号" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.phone" placeholder="请输入手机号" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="所属区域选择">
            <el-cascader :options="cityAllList" v-model="form.options" placeholder="请选择所属区域" @change="handleChange"></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="form.community" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人姓名">
            <el-input v-model="form.emergencyName" placeholder="请输入紧急联系人姓名" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人电话">
            <el-input v-model="form.emergencyPhone" placeholder="请输入紧急联系人电话" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">添加用户</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addcommunityuserinfo',
  data() {
    return {
      cityAllList,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: true,
        type: ['步步高'],
        resource: '小天才',
        desc: '',
        options: []
      }
    };
  },
  methods: {
    onSubmit() {
      this.$message.success('提交成功！');
    }
  }
};
</script>