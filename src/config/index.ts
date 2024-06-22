export interface RouteMune {
    path:string,
    name:string,
    label:string,
    icon:string,
    url?:string,
    children?:RouteMune[]
}
const routes:RouteMune[]=[
    {
        path:'/home',
        name:'home',
        label:'首页',
        icon:'HomeOutlined',
        url:'/home/index'
    },{
        path:'/mail',
        name:'mail',
        label:'商品管理',
        icon:'ShopOutlined',
        url:'/mail/index'
    },{
        path:'/user',
        name:'user',
        label:'用户管理',
        icon:'UserOutlined',
        url:'/user/index'
    },{
        path:'/other',
        name:'other',
        label:'其他',
        icon:'SettingOutlined',
        children:[
            {
                path:'/other/otherPage1',
                name:'otherPage1',
                label:'页面1',
                icon:'SettingOutlined'
            },{
                path:'/other/otherPage2',
                name:'therPage2',
                label:'页面2',
                icon:'SettingOutlined',
            }
        ]
    }
]
export default routes