import axios from 'axios'
import {
    Loading,
    Message
} from 'element-ui'

let loading;

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    });
}

function endLoading() {
    loading.close();
}

axios.interceptors.request.use(config => {
    startLoading();

    return config;
}, err => {
    return Promise.reject(err);
});

axios.interceptors.response.use(response => {
    endLoading();

    return response;
}, err => {
    endLoading();
    Message.error(err.response.data);

    return Promise.reject(err);
});

export default axios;