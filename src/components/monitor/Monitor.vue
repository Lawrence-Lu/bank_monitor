
<template>
  <div class="container" ref="ruleForm">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>监控面板管理</el-breadcrumb-item>
      <el-breadcrumb-item>监控参数</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div id="timeSelector" class="block">
      <el-select v-model="ruleForm.ip" placeholder="请选择一个设备">
       <el-option
        v-for="item in ipOption"
        :key="item"
        :label="item"
        :value="item">
        </el-option>
    </el-select>
      
      
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
    <div id="linechart2" style="height:400px;width:600px"></div>
    <div id="linechart3" style="height:400px;width:1100px"></div>
      
      
      
      
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
        date: '',
         ip:''
      },

      ipOption: ''

      ,
      
      // checkedId: "",
      // filterText: "",
      
      
      
      // defaultProps: {
      //   children: "children",
      //   label: "label"
      // },

    lineChart:'',
    lineChart2:'',
    lineChart3:'',
      // KPI图形
      lineOption:{
        title: {
            text: 'CPU'
        },
        tooltip: {
            trigger: 'axis'
            
        },
        legend: {
                    data: ['CPU_used_total', 'CPU_used_user','CPU_used_system'],
                    bottom: '3%',
                    
                },
         
        xAxis: {
            type: 'category',
             boundaryGap: false,
              data: ["2020-01-22 00:00",
        "2020-01-22 01:00",
        "2020-01-22 02:00",
        "2020-01-22 03:00",
        "2020-01-22 04:00",
        "2020-01-22 05:00",
        "2020-01-22 06:00",
        "2020-01-22 07:00",
        "2020-01-22 08:00",
        "2020-01-22 09:00",
        "2020-01-22 10:00",]
        },
        yAxis: {
            type :'value'
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
       
        series: [
          {
            name: 'CPU_used_total',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                }, {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                }])
            },
            data: [30,40,50,45,66,60,53,47,50,52,60]
        },
        {
            name: 'CPU_used_user',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                color: 'rgb(226, 40, 131)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                }, {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                }])
            },
            data: [25,34,44,39,60,50,45,40,38,40,52]
        },
        {
            name: 'CPU_used_system',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                color: 'rgb(210, 38, 226)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                }, {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                }])
            },
            data: [10,12,14,11,9,12,8,7,12,10,14]
        }

        ]
           
        
        
    },

     lineOption2:{
        title: {
            text: 'Memory'
        },
        tooltip: {
            trigger: 'axis'
            
        },
        legend: {
                    data: ['mem_usage_rate', 'swap_usage_rate','available_memory'],
                    bottom: '3%',
                    
                },
         
        xAxis: {
            type: 'category',
             boundaryGap: false,
              data: ["2020-01-22 00:00",
        "2020-01-22 01:00",
        "2020-01-22 02:00",
        "2020-01-22 03:00",
        "2020-01-22 04:00",
        "2020-01-22 05:00",
        "2020-01-22 06:00",
        "2020-01-22 07:00",
        "2020-01-22 08:00",
        "2020-01-22 09:00",
        "2020-01-22 10:00",]
        },
        yAxis: {
            type :'value'
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
       
        series: [
          {
            name: 'mem_usage_rate',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                color: 'rgb(38, 166, 226)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(14, 98, 194)'
                }, {
                    offset: 1,
                    color: 'rgb(38, 166, 226)'
                }])
            },
            data: [30,40,50,45,66,60,53,47,50,52,60]
        },
        {
            name: 'swap_usage_rate',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                color: 'rgb(26, 133, 210)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(14, 98, 194)'
                }, {
                    offset: 1,
                    color: 'rgb(38, 166, 226)'
                }])
            },
            data: [25,34,44,39,60,50,45,40,38,40,52]
        },
        {
            name: 'available_memory',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                color: 'rgb(14, 98, 194)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(14, 98, 194)'
                }, {
                    offset: 1,
                    color: 'rgb(38, 166, 226)'
                }])
            },
            data: [10,12,14,11,9,12,8,7,12,10,14]
        }

        ]
           
    },


    lineOption3:{
        title: {
            text: 'IO'
        },
        tooltip: {
            trigger: 'axis'
            
        },
        legend: {
                    data: ['dev_io_read_rate', 'dev_io_write_rate','dev_io_usage_rate'],
                    bottom: '3%',
                    
                },
         
        xAxis: {
            type: 'category',
             boundaryGap: false,
              data: ["2020-01-22 00:00",
        "2020-01-22 01:00",
        "2020-01-22 02:00",
        "2020-01-22 03:00",
        "2020-01-22 04:00",
        "2020-01-22 05:00",
        "2020-01-22 06:00",
        "2020-01-22 07:00",
        "2020-01-22 08:00",
        "2020-01-22 09:00",
        "2020-01-22 10:00",]
        },
        yAxis: {
            type :'value'
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
       
        series: [
          
          {
            name: 'dev_io_read_rate',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                color: 'rgb(138, 197, 156)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(67, 202, 85)'
                }, {
                    offset: 1,
                    color: 'rgb(138, 197, 156)'
                }])
            },
            data: [30,40,50,45,66,60,53,47,50,52,60]
        },
        {
            name: 'dev_io_write_rate',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                color: 'rgb(100, 202, 85)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(67, 202, 85)'
                }, {
                    offset: 1,
                    color: 'rgb(138, 197, 156)'
                }])
            },
            data: [25,34,44,39,60,50,45,40,38,40,52]
        },
        {
            name: 'dev_io_usage_rate',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                color: 'rgb(67, 202, 85)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(67, 202, 85)'
                }, {
                    offset: 1,
                    color: 'rgb(138, 197, 156)'
                }])
            },
            data: [10,12,14,11,9,12,8,7,12,10,14]
        }

        ]
           
      },
    
    
    
    };
  },

  methods: {
   
     // 查询按钮
    submitForm(){
      const _this=this;
      
      
      // 实际运作时改成 axios.post，数据形式参考line.json
      console.log(this.ruleForm); //包括时间（stamp),ip,label-KPI
      console.log(this.lineOption3.series[0].data) //测试用
      /* axios.post("",this.ruleForm).then(function(resp){
        console.log(resp)
        if(resp.data.message=='success'){
          _this.$message('添加成功')
          _this.lineOption.xAxis.data=resp.data.date
           _this.lineOption2.xAxis.data=resp.data.date
           _this.lineOption3.xAxis.data=resp.data.date
      
      

        _this.lineOption.series[0].data=resp.data.CPU_used_total
        _this.lineOption.series[1].data=resp.data.CPU_used_user
        _this.lineOption.series[2].data=resp.data.CPU_used_system

        _this.lineOption2.series[0].data=resp.data.dev_io_read_rate
        _this.lineOption2.series[1].data=resp.data.dev_io_write_rate
        _this.lineOption2.series[2].data=resp.data.dev_io_usage_rate

        _this.lineOption3.series[0].data=resp.data.mem_usage_rate
        _this.lineOption3.series[1].data=resp.data.swap_usage_rate
        _this.lineOption3.series[2].data=resp.data.available_memory
        }
         })
      */
      
    
   // 此处get请求只是模拟的，真实操作时，使用post请求
      axios.get("../../static/line.json").then(function (resp){
     
     // 时间部分赋值
      _this.lineOption.xAxis.data=resp.data.date
      _this.lineOption2.xAxis.data=resp.data.date
      _this.lineOption3.xAxis.data=resp.data.date
      
      
     // 数据部分
      _this.lineOption.series[0].data=resp.data.CPU_used_total
      _this.lineOption.series[1].data=resp.data.CPU_used_user
      _this.lineOption.series[2].data=resp.data.CPU_used_system

      _this.lineOption2.series[0].data=resp.data.dev_io_read_rate
      _this.lineOption2.series[1].data=resp.data.dev_io_write_rate
      _this.lineOption2.series[2].data=resp.data.dev_io_usage_rate

      _this.lineOption3.series[0].data=resp.data.mem_usage_rate
      _this.lineOption3.series[1].data=resp.data.swap_usage_rate
      _this.lineOption3.series[2].data=resp.data.available_memory



      ;})
      
      
      // 画图setOption
        this.lineChart.setOption(_this.lineOption)
        this.lineChart2.setOption(_this.lineOption2)
         this.lineChart3.setOption(_this.lineOption3)
      },

   
  },

  
  
  created() {
    const _this=this;
    // 真正应用时改成URL 注意：希望后台可以生成类似tree.json格式的数据
    axios.get("../../static/ipList.json").then(function (resp){
             _this.ipOption=resp.data.ips;
             
         })
  },
  mounted() {
    // 初始化折线图
    this.lineChart = echarts.init(document.getElementById("linechart"));
    this.lineChart2 = echarts.init(document.getElementById("linechart2"))
    this.lineChart3 = echarts.init(document.getElementById("linechart3"))
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
  background-color: rgb(107, 218, 122);
  float: left;
}
#main {
  float: left;
}
#timeSelector {
  float: right;
}
#linechart {
  float: left;
}
#linechart2 {
  float: right;
}
#linechart3 {
  float: left;
}

</style>