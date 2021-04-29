import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import router from "@/router"
import { getToken, isEmpty } from '@/utils/auth'

const errMesObj = {
    404: "哎呀~ (ಥ﹏ಥ)网络又开小差了,请稍后刷新重试!",
    403: "暂无操作权限",
    401: "登录状态已过期,请重新登录",
    0: "请求错误",
    500: "服务器错误",
    10: "请求超时"
}

// create an axios instance
const service = axios.create({
    baseURL: "https://dev-courses-admin-api.firesbox.com",
    timeout: 15000
})

// request interceptor
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers["Authorization"] = `Bearer ${getToken() || undefined}`;
        }
        config.headers["Content-Type"] = "application/json";
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
    response => {
        const res = response.data
        if (response.status !== 200) {
            Message({
                message: res.error_description || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.error_description || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        let { response } = error;
        let status = isEmpty(response) ? 0 : response.status;
        if (!isEmpty(response) && response.status === 401) {
            // errMsg = "登录状态已过期,请重新登录";
            store.dispatch('resetToken').then(() => {
                location.reload()
            })
            return
        } else if (isEmpty(response) && error.message.indexOf("timeout") > -1) {
            status = 10;
        } else if (isEmpty(response) && error.message.indexOf("403") > -1) {
            status = 403;
        } else if (isEmpty(response) && error.message.indexOf("500") > -1) {
            status = 500;
        }
        Message({
            message: errMesObj[status] || response.data.error_description,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
export default service
