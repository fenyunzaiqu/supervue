import Vue from 'vue'
import VueRouter from "vue-router";
import ElementUI, {Loading} from "element-ui";
import Login from "../views/Login"
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(Loading);

const routes=[
    {path: '/',redirect:"/login"},
    {path: '/login',component: Login},
    {
        path:'/home',
        name:'home',
        component: ()=>import('../views/Home'),
        children:[
            /*
            {
                path:'staffsInfo',
                component:()=>import('../components/')
            },
            */
            {
                path:'sellRecord',
                component:()=>import('../components/sell/sellRecord')
            },
            {
                path:'sellOrder',
                component:()=>import('../components/sell/sellOrder')
            },
            {
                path:'purchaseRecord',
                component:()=>import('../components/purchase/purchaseRecord')
            },
            {
                path:'purchaseOrder',
                component:()=>import('../components/purchase/purchaseOrder')
            },
            {
                path:'goodsDetails',
                component:()=>import('../components/good/goodsDetails')
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router