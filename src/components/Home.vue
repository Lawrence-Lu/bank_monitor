<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <div class="logo">
        </div>
        <span>平台</span>
      </div>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 router-->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" 
        unique-opened router :collapse="isCollapse" :collapse-transition="false" :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id " v-for="item in menulist" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <!--<i :class="el-icon-coin"></i>-->
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id"
              @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>            
          </el-submenu>
        </el-menu>
        
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
  export default{
    data(){
      return{
        menulist:[
          {
            "id":"01",
            "authName":"资源管理",
            "children":[
              { "id":"011",
                "path":"resourceBrowse",
                "authName":"资源浏览"
              },
              { "id":"012",
                "path":"resourceGroup",
                "authName":"资源组管理"
              },
              { "id":"013",
                "path":"strategy",
                "authName":"资源策略管理"
              }]
          },
          {
            "id":"02",
            "authName":"监控面板管理",
            "children":[
              { "id":"021",
                "path":"monitor",
                "authName":"监控参数"
              },
              { "id":"022",
                "path":"warning",
                "authName":"最近警告"
              },
              ]
            },
            {
            "id":"03",
            "authName":"警告功能",
            "children":[
              { "id":"031",
                "path":"warningToDefine",
                "authName":"警告定义"
              },
              { "id":"022",
                "path":"tonerLow",
                "authName":"警告处理"
              },
              ]
            }
          ],
        
        isCollapse: false,
        activePath:''
      }
    },
    created() {
    },
    methods : {
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
      },
      saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
      }
    }
  }
</script>


<style scoped >


.home-container {
  height: 100%;
}

.logo{
  height : 60px;
  width : 60px;
  background-image: url(../assets/logo.png);
  background-size: 60px 60px ;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  
}

.el-aside {
  background-color: #333744;
  
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>

