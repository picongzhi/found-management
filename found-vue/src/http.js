import axios from 'axios'
import {
    Loading,
    Message
} from 'element-ui'
import router from '@/router'

let loading

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

function endLoading() {
    loading.close()
}

axios.interceptors.request.use(config => {
    startLoading()

    if (localStorage.getItem('token')) {
        config.headers['Authorization'] = localStorage.getItem('token')
    }

    return config
}, err => {
    return Promise.reject(err)
})

axios.interceptors.response.use(response => {
    endLoading()

    return response
}, err => {
    endLoading()

    const {
        status
    } = err.response

    if (status == 401) {
        Message.error('token已失效，请重新登录')
        router.push('/login')
    } else {
        Message.error(err.response.data)
    }

    return Promise.reject(err)
});

export default axios