<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>资源管理</el-breadcrumb-item>
      <el-breadcrumb-item>资源组管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card :gutter="20">
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-table :data="resourceGroupData" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="资源组名称"></el-table-column>
        <el-table-column label="资源组成员"></el-table-column>
        <el-table-column label="创建日期"></el-table-column>
        <el-table-column label="操作" width="240px">
          <template>
            <el-tooltip effect="dark" content="编辑资源组" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" round></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除资源组" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-delete" size="mini" round></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resourceGroupData: []
    };
  }
};
</script>

<style scoped>
</style>