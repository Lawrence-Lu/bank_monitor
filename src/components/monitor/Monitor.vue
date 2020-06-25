
<template>
  <div class="container" ref="ruleForm">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>监控面板管理</el-breadcrumb-item>
      <el-breadcrumb-item>监控参数</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div id="Selectors" class="block">
      <el-select 
      @change="ipChange"
      v-model="ruleForm.ip" 
      placeholder="请选择一个设备">
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
    interval1:'',
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
              data: (function (){
                var now = new Date();
                var res = [];
                var len = 20;
                while (len--) {
                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                    now = new Date(now - 2000);
                }
                return res;
            })()
        },
        yAxis: [
            {type :'value',
            name: 'rate: %',
             max : 100,
             min :0
            }
            
        ],
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
            data: (function (){
                var res = [];
                var len = 0;
                while (len < 20) {
                    res.push((Math.random(1)*55 + 40).toFixed(1) - 0);
                    len++;
                }
                return res;
            })()
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
            data: (function (){
                var res = [];
                var len = 0;
                while (len < 20) {
                    res.push((Math.random(2)*40 + 5).toFixed(1) - 0);
                    len++;
                }
                return res;
            })()
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
            data: (function (){
                var res = [];
                var len = 0;
                while (len < 20) {
                    res.push((Math.random(3)*40 + 4).toFixed(1) - 0);
                    len++;
                }
                return res;
            })()
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
              data: (function (){
                var now = new Date();
                var res = [];
                var len = 20;
                while (len--) {
                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                    now = new Date(now - 2000);
                }
                return res;
            })()
        },
        yAxis: [
            {type :'value',
             name: 'rate: %',
             min : 0,
             max : 100
            }
        ],
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
            data: (function (){
                var res = [];
                var len = 0;
                while (len < 20) {
                    res.push((Math.random(4)*55 + 40).toFixed(1) - 0);
                    len++;
                }
                return res;
            })()
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
            data: (function (){
                var res = [];
                var len = 0;
                while (len < 20) {
                    res.push((Math.random(5)*40 + 4).toFixed(1) - 0);
                    len++;
                }
                return res;
            })()
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
            data: (function (){
                var res = [];
                var len = 0;
                while (len < 20) {
                    res.push((Math.random(6)*40 + 5).toFixed(1) - 0);
                    len++;
                }
                return res;
            })()
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
              data: (function (){
                var now = new Date();
                var res = [];
                var len = 20;
                while (len--) {
                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                    now = new Date(now - 2000);
                }
                return res;
            })()
        },
        yAxis: [
           { type :'value',
             name : 'b/s'
           
           }
        ],
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
            data: (function (){
                var res = [];
                var len = 0;
                while (len < 20) {
                    res.push((Math.random(7)*60 + 5).toFixed(1) - 0);
                    len++;
                }
                return res;
            })()
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
            data: (function (){
                var res = [];
                var len = 0;
                while (len < 20) {
                    res.push((Math.random(8)*40 + 5).toFixed(1) - 0);
                    len++;
                }
                return res;
            })()
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
            data: (function (){
                var res = [];
                var len = 0;
                while (len < 20) {
                    res.push((Math.random(9)*30 + 5).toFixed(1) - 0);
                    len++;
                }
                return res;
            })()
        }

        ]
           
      },
    
    
    
    }
  },

  methods: {

      ipChange(){
          const _this=this
          console.log(this.ruleForm.ip)
          
          var option=this.lineOption
          var option2=this.lineOption2
          var option3=this.lineOption3


          app.count = 11;
           this.interval1=setInterval(function (){

               var data0 = option.series[0].data; // CPU_used_total
               var data1 = option.series[1].data;  // CPU_used_user
               var data2 = option.series[2].data;   // CPU_used_system
               var data3 = option2.series[0].data;   // memory
                var data4 = option2.series[1].data;
                var data5 = option2.series[2].data;
                var data6 = option3.series[0].data;  // IO
                var data7 = option3.series[1].data;
                var data8 = option3.series[2].data;
                var now

            // 当使用接口 将剩下部分注销，即556-592行
                /*  axios.post('',this.ruleForm.ip).then(function(resp){
                    if(resp.data.message=='sucess'){
                    _this.$message('添加成功')
                    // 后台产生现在的时间
                    this.now=resp.data.now

                    // 单个时间点的数据值
                    this.data0.shift()
                   this.data0.push(resp.data.CPU_used_total)
                   this.data1.shift()
                    this.data1.push(resp.data.CPU_used_user)
                    this.data2.shift()
                    this.data2.push (resp.data.CPU_used_system)

                    this.data3.shift()
                    this.data3.push(resp.data.dev_io_read_rate)
                    this.data4.shift()
                    this.data4.push(resp.data.dev_io_write_rate)
                    this.data5.shift()
                    this.data5.push(resp.data.dev_io_usage_rate)

                    this.data6.shift()
                    this.data6.push(resp.data.mem_usage_rate)
                    this.data7.shift()
                    this.data7.push(resp.data.swap_usage_rate)
                    this.data8.shift()
                    this.data8.push(resp.data.available_memory)
                }

             })  */


                var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, ''); //现在时间点
                
                // CPU
                
                data0.shift();
                data0.push((Math.random(1) * 55 + 40).toFixed(1) - 0);  //  随机数
                data1.shift();
                data1.push((Math.random(2) * 40 + 5).toFixed(1) - 0);
                data2.shift();
                data2.push((Math.random(3) * 40 + 4).toFixed(1) - 0);

                // Memory
                
                data3.shift();
                data3.push((Math.random(1) * 55 + 40).toFixed(1) - 0);
                data4.shift();
                data4.push((Math.random(2) * 30 + 15).toFixed(1) - 0);
                data5.shift();
                data5.push((Math.random(3) * 30 + 15).toFixed(1) - 0);

                //IO
                
                data6.shift();
                data6.push((Math.random(1) * 30 + 5).toFixed(1) - 0);
                data7.shift();
                data7.push((Math.random(2) * 20 + 5).toFixed(1) - 0);
                data8.shift();
                data8.push((Math.random(3) * 20 + 5).toFixed(1) - 0);


                // 时间刷新
                option.xAxis.data.shift();
                option.xAxis.data.push(axisData);
                option2.xAxis.data.shift();
                option2.xAxis.data.push(axisData);
                option3.xAxis.data.shift();
                option3.xAxis.data.push(axisData);
                
                // 别注销这三行，画图语句
                _this.lineChart.setOption(option);
                _this.lineChart2.setOption(option2);
                _this.lineChart3.setOption(option3);
         }, 2100);
      },
   
     // 查询按钮
    submitForm(){
      const _this=this;
    
      clearInterval(this.interval1)
      
      // 实际运作时改成 axios.post，数据形式参考line.json
      console.log(this.ruleForm); //包括时间（stamp),ip,label-KPI
      console.log(this.lineOption3.series[0].data) //测试用
      /* axios.post("",this.ruleForm).then(function(resp){
        console.log(resp)
        if(resp.data.message=='success'){
          _this.$message('查询成功')
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
#Selectors {
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