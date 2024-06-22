//@ts-ignore
import mock from 'mockjs'
//@ts-ignore
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'

mock.mock(/home\/getData/,homeApi.getStatisticalData)
mock.mock(/user\/getuser/,userApi.getUserList)
mock.mock(/user\/createUser/,'post',userApi.createUser)
mock.mock(/user\/updateUser/,'post',userApi.updateUser)
mock.mock(/user\/deleteUser/,'post',userApi.deleteUser)
mock.mock(/user\/getMenu/,'post',permissionApi.getMenu)