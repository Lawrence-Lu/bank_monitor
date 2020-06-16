
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>资源管理</el-breadcrumb-item>
      <el-breadcrumb-item>资源浏览</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入设备标签进行查找" v-model="queryInfo.query">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="showAddDialog()">添加资源</el-button>
        </el-col>
      </el-row>

      <el-table :data="resourceList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="设备标签" prop="tag"></el-table-column>
        <el-table-column label="型号" prop="model"></el-table-column>
        <el-table-column label="IP地址" prop="ip"></el-table-column>
        <el-table-column label="类型" prop="type"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240px">
          <!--slot-scope="scope"-->
          <template slot-scope="scope">
            <el-tooltip effect="light" content="加入监控" placement="top" :enterable="false">
              <el-button type="success" icon="el-icon-circle-plus-outline" size="mini" round></el-button>
            </el-tooltip>
            <el-tooltip effect="light" content="取消监控" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-remove"
                size="mini"
                round
                @click="delMoniterBYId(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                round
                @click="showEditDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除资源" placement="top" :enterable="false">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                round
                @click="removeResourceById(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加资源的对话框 -->
    <el-dialog title="添加资源" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 添加的表单验证区 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="设备标签" prop="tag">
          <el-input v-model="addForm.tag"></el-input>
        </el-form-item>
        <el-form-item label="型号" prop="model">
          <el-input v-model="addForm.model"></el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="ip">
          <el-input v-model="addForm.ip"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="addForm.type"></el-input>
        </el-form-item>
      </el-form>
      <!-- 控制按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addResource">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改资源的对话框 -->
    <el-dialog title="修改资源信息" :visible.sync="editDialogVisible" width="50%">
      <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="100px">
        <el-form-item label="设备标签" prop="tag">
          <el-input v-model="editForm.tag"></el-input>
        </el-form-item>
        <el-form-item label="型号" prop="model">
          <el-input v-model="editForm.model"></el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="ip">
          <el-input v-model="editForm.ip" disabled></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="editForm.type"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 取消监控对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="50%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var checkIp = (rule, value, callback) => {
      var regIp = /^((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)$/;
      if (regIp.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的ip地址"));
    };
    return {
      resourceList: [
        {
          id: 1,
          tag: "广州xxx行1",
          model: "H3C MSR20-1",
          ip: "52.82.122.115",
          type: "交换机1",
          state: "true"
        },
        {
          id: 2,
          tag: "广州xxx行2",
          model: "H3C MSR20-2",
          ip: "52.82.122.116",
          type: "交换机2",
          state: "true"
        },
        {
          id: 3,
          tag: "广州xxx行3",
          model: "H3C MSR20-3",
          ip: "52.82.122.116",
          type: "交换机3",
          state: "true"
        },
        {
          id: 4,
          tag: "广州xxx行4",
          model: "H3C MSR20-4",
          ip: "52.82.122.116",
          type: "交换机4",
          state: "flase"
        },
        {
          id: 5,
          tag: "广州xxx行5",
          model: "H3C MSR20-5",
          ip: "52.82.122.116",
          type: "交换机5",
          state: "true"
        }
      ],
      queryInfo: {
        quert: ""
      },
      // 控制添加资源对话框的展示
      addDialogVisible: false,
      // 表单
      addForm: {
        tag: "",
        model: "",
        ip: "",
        type: ""
      },
      // 表单验证规则
      addFormRules: {
        tag: [{ required: true, message: "请输入设备标签", trigger: "blur" }],
        model: [{ required: true, message: "请输入设备型号", trigger: "blur" }],
        ip: [
          { required: true, message: "请输入ip地址", trigger: "blur" },
          { validator: checkIp, trigger: "blur" }
        ],
        type: [{ required: true, message: "请输入设备类型", trigger: "blur" }]
      },
      //edit对话框是否显示
      editDialogVisible: false,
      // edit对话框打开时显示的内容
      editForm: {},
      delDialogVisible: false
    };
  },
  methods: {
    //展示添加资源对话框
    showAddDialog() {
      this.addDialogVisible = true;
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击按钮，添加资源
    addResource() {
      this.$refs.addFormRef.validate(valid => {
        // 打印表单验证结果
        console.log(valid);
        if (!valid) return;
        //发起添加资源的api请求
      });
    },
    // 展示编辑用户的对话框
    showEditDialog(id) {
      this.editDialogVisible = true;
      // 获取到要修改的资源的id
      console.log(id);
      //发送请求获取对应id的信息

      var data = this.resourceList.find(function(item) {
        return item.id == id;
      });

      // this.editForm = data
      // console.log(editForm)
      // 可以输出获取到的ip
      this.editForm = data;
      // console.log(this.editForm)
    },
    //根据id取消监控
    async delMoniterBYId(id) {
      console.log(id)
      const confirmResult = await this.$confirm("此操作将取消监控", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(err => err)
      if(confirmResult =='confirm'){
        return this.$message.success('已取消')
      }
    },
    async removeResourceById(id){
      console.log(id)
      const confirmResult = await this.$confirm("此操作将永久删除改资源", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "danger"
      }).catch(err => err)
      if(confirmResult !=='confirm'){
        return this.$message.info('已取消删除')
      }
      return this.$message.success('已删除')
    }
    
  }
};
</script>

<style>
</style>