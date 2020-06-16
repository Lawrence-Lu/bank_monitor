import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import ResourceBrowse from "@/components/resource/ResourceBrowse"
import Monitor from "@/components/monitor/Monitor"
import ResourceGroup from "@/components/resource/ResourceGroup"
Vue.use(VueRouter)

  const routes = [
    { path: '/', redirect: 'login' },
    { path: '/login', component: Login },
    { path: '/home', 
      component: Home,
      redirect:'/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/resourceBrowse', component: ResourceBrowse},
        { path: '/monitor', component: Monitor},
        { path: '/resourceGroup', component: ResourceGroup}
      ] }
]

const router = new VueRouter({
  routes
})

export default router
