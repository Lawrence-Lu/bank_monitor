
<template>
  <div class="container" ref="ruleForm">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>监控面板管理</el-breadcrumb-item>
      <el-breadcrumb-item>监控参数</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- tree形树-->
      <div class="tree">
      <!--将data暂时定为treeSelectorData2作为测试-->
        <el-tree
          :data="treeSelectorData2"  
          
          node-key="id"
          :default-expanded-keys="[1, 11, 111,112]"
          show-checkbox
          highlight-current
          check-on-click-node
          :props="defaultProps"
          ref="treeForm"
          check-strictly
          @check-change="handleCheckChange"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
        
        <!--时间选择控件-->
      <div>
      <span class="demonstration">时间段</span>
        <el-date-picker
        v-model="ruleForm.date"
        value-format="timestamp"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary" @click="submitForm()">查询</el-button>
      </div>

      <!-- 图片显示区域 -->
      <div id="linechart" style="height:400px;width:600px"></div>
      
      
      
      
    </el-card>
  </div>
</template>

<script>
//导入echarts
import echarts from "echarts";
import axios from "axios";
export default {
  
  data() {
    return {
      ruleForm: {
        id:'',
        date: '',
        label:'',
        ip:''
      },
      checkedId: "",
      filterText: "",
      treeSelectorData: [
        {
          id: 1,
          label: "CN-A06支付中心",
          children: [
            {
              id: 11,
              label: "10.24.198.115",
              children: [
                {
                  id: 111,
                  label: "cpu",
                  children: [
                    {
                      id: 1111,
                      label: "cpu_used_total"
                    },
                    {
                      id: 1112,
                      label: "cpu_user_used"
                    },
                    { id: 1113, label: "cpu_system_used" },
                    { id: 1114, label: "cpu_average_5min" },
                    { id: 1115, label: "cpu_io_wait" }
                  ]
                },
                {
                  id: 112,
                  label: "network",
                  children: [
                    {
                      id: 1121,
                      label: "tcp_activeopens"
                    },
                    { id: 1122, label: "tcp_passiveopens" },
                    { id: 1123, label: "close_wait_count" }
                  ]
                }
              ]
            },
            {
              id: 12,
              label: "10.24.198.116",
              children: [
                {
                  id: 121,
                  label: "cpu",
                  children: [
                    {
                      id: 1211,
                      label: "cpu_used_total"
                    },
                    {
                      id: 1212,
                      label: "cpu_user_used"
                    },
                    {
                      id: 1213,
                      label: "cpu_system_used"
                    },
                    {
                      id: 1214,
                      label: "cpu_average_5min"
                    },
                    {
                      id: 1215,
                      label: "cpu_io_wait"
                    }
                  ]
                },
                {
                  id: 122,
                  label: "network",
                  children: [
                    {
                      id: 1221,
                      label: "tcp_activeopens"
                    },
                    {
                      id: 1222,
                      label: "tcp_passiveopens"
                    },
                    {
                      id: 1223,
                      label: "close_wait_count"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "CN-A11离线计算",
          children: [
            {
              id: 21,
              label: "10.24.166.215",
              children: [
                {
                  id: 211,
                  label: "cpu",
                  children: [
                    {
                      id: 2111,
                      label: "cpu_used_total"
                    },
                    {
                      id: 2112,
                      label: "cpu_user_used"
                    },
                    {
                      id: 2113,
                      label: "cpu_system_used"
                    },
                    {
                      id: 2114,
                      label: "cpu_average_5min"
                    },
                    {
                      id: 2115,
                      label: "cpu_io_wait"
                    }
                  ]
                },
                {
                  id: 212,
                  label: "network",
                  children: [
                    {
                      id: 2121,
                      label: "tcp_activeopens"
                    },
                    {
                      id: 2122,
                      label: "tcp_passiveopens"
                    },
                    {
                      id: 2123,
                      label: "close_wait_count"
                    }
                  ]
                }
              ]
            },
            {
              id: 22,
              label: "10.24.198.116",
              children: [
                {
                  id: 221,
                  label: "cpu",
                  children: [
                    {
                      id: 2211,
                      label: "cpu_used_total"
                    },
                    {
                      id: 2212,
                      label: "cpu_user_used"
                    },
                    {
                      id: 2213,
                      label: "cpu_system_used"
                    },
                    {
                      id: 2214,
                      label: "cpu_average_5min"
                    },
                    {
                      id: 2215,
                      label: "cpu_io_wait"
                    }
                  ]
                },
                {
                  id: 222,
                  label: "network",
                  children: [
                    {
                      id: 2221,
                      label: "tcp_activeopens"
                    },
                    {
                      id: 2222,
                      label: "tcp_passiveopens"
                    },
                    {
                      id: 2223,
                      label: "close_wait_count"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 3,
          label: "CN-B03中台商品中心",
          children: [
            {
              id: 31,
              label: "10.24.146.134",
              children: [
                {
                  id: 311,
                  label: "cpu",
                  children: [
                    {
                      id: 3111,
                      label: "cpu_used_total"
                    },
                    {
                      id: 3112,
                      label: "cpu_user_used"
                    },
                    {
                      id: 3113,
                      label: "cpu_system_used"
                    },
                    {
                      id: 3114,
                      label: "cpu_average_5min"
                    },
                    {
                      id: 3115,
                      label: "cpu_io_wait"
                    }
                  ]
                },
                {
                  id: 312,
                  label: "network",
                  children: [
                    {
                      id: 3121,
                      label: "tcp_activeopens"
                    },
                    {
                      id: 3122,
                      label: "tcp_passiveopens"
                    },
                    {
                      id: 3123,
                      label: "close_wait_count"
                    }
                  ]
                }
              ]
            },
            {
              id: 32,
              label: "10.24.198.116",
              children: [
                {
                  id: 321,
                  label: "cpu",
                  children: [
                    {
                      id: 3211,
                      label: "cpu_used_total"
                    },
                    {
                      id: 3212,
                      label: "cpu_user_used"
                    },
                    {
                      id: 3213,
                      label: "cpu_system_used"
                    },
                    {
                      id: 3214,
                      label: "cpu_average_5min"
                    },
                    {
                      id: 3215,
                      label: "cpu_io_wait"
                    }
                  ]
                },
                {
                  id: 322,
                  label: "network",
                  children: [
                    {
                      id: 3221,
                      label: "tcp_activeopens"
                    },
                    {
                      id: 3222,
                      label: "tcp_passiveopens"
                    },
                    {
                      id: 3223,
                      label: "close_wait_count"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      treeSelectorData2:''
      ,
      defaultProps: {
        children: "children",
        label: "label"
      },

    lineChart:'',
      // KPI图形
      lineOption:{
        title: {
            text: 'KPI Performance'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            data: ''
        },
        yAxis: {
            splitLine: {
                show: false
            }
        },
        toolbox: {
            left: 'center',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: [{
          startValue: '2020-01-22 00:00'
        },
            {
            type: 'inside'
        }],
        visualMap: {
            top: 10,
            right: 10,
            pieces: [{
                gt: 0,
                lte: 50,
                color: '#096'
            }, {
                gt: 50,
                lte: 100,
                color: '#ffde33'
            }, {
                gt: 100,
                lte: 150,
                color: '#ff9933'
            }, {
                gt: 150,
                lte: 200,
                color: '#cc0033'
            }, {
                gt: 200,
                lte: 300,
                color: '#660099'
            }, {
                gt: 300,
                color: '#7e0023'
            }],
            outOfRange: {
                color: '#999'
            }
        },
        series: {
            name: 'KPI',
            type: 'line',
            data: '',
            markLine: {
                silent: true,
                data: [{
                    yAxis: 50
                }, {
                    yAxis: 100
                }, {
                    yAxis: 150
                }, {
                    yAxis: 200
                }, {
                    yAxis: 300
                }]
            }
        }
    },
    
    };
  },

  methods: {
    // 设定复选框只能单选
    handleCheckChange(data, checked, node) {
      if (checked === true) {
        this.checkedId = data.id;
        this.$refs.treeForm.setCheckedKeys([data.id]);
      } else {
        if (this.checkedId == data.id) {
          this.$refs.treeForm.setCheckedKeys([data.id]);
        }
      }
    },
    //单击时的操作
    handleNodeClick(data, node) {
      console.log(data.label)
      console.log(data.id)
      this.ruleForm.id=data.id
      this.ruleForm.label=data.label
      this.ruleForm.ip=data.value
    },
     // 查询按钮
    submitForm(){
      alert("Submit!")
      
      // 实际运作时改成 axios.post
      console.log(this.ruleForm); //包括时间（stamp),ip,label-KPI
      const _this=this;

    // 更换为后台URL，获取图形数据，
      axios.get("../../static/line.json").then(function (resp){
      console.log(resp);
      _this.lineOption.series.data=resp.data.KPI;
      _this.lineOption.xAxis.data=resp.data.date;})
      console.log(_this.lineOption)
      
      // 画图setOption
        this.lineChart.setOption(_this.lineOption)
      },

   
  },

  // 导入树形控件数据 ：问题：暂时假定的返回是一个完整树形的data-见tree.json。而不是label+ip。
  
  created() {
    const _this=this;
    // 真正应用时改成URL 注意：希望后台可以生成类似tree.json格式的数据
    axios.get("../../static/tree.json").then(function (resp){
             _this.treeSelectorData2=resp.data.treeSelectorData;
             
         })
  },
  mounted() {
    // 初始化折线图
    this.lineChart = echarts.init(document.getElementById("linechart"));
  }   
}
</script>


<style scoped >
.container {
  width: 100%;
  height: 100%;
  position: relative;
}
.el-card {
  position: relative;
  width: 100%;
  height: 100%;
}
.tree {
  width: 25%;
  height: 100%;
  background-color: aqua;
  float: left;
}
#main {
  float: left;
}
#linechart {
  float: left;
}

</style>