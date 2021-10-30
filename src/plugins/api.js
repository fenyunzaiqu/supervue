import axios from "axios";
import {Message} from "element-ui";

const instance = axios.create({
        timeout: 1000*12,
        baseURL: 'http://127.0.0.1:8080/'
    }
)

instance.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';

/*
instance.interceptors.request.use(config=>{
    const token=localStorage.getItem('token');
    token &&(config.headers.Authorization = token);
    return config;
},error => {
    Message.error({message:'请求超时，请稍后重试'});
    return Promise.resolve(error);
})
*/

instance.interceptors.response.use(resp=>{
    if(resp.status&&resp.status===200&&resp.data.status===500){
        Message.error({message:resp.data.msg});
        return;
    }
    if(resp.data.msg){
        Message.success({message:resp.data.msg})
    }
    return resp.data;
},error => {
    if(error.response.data.msg){
        Message.error({message:error.response.data.msg})
    }
})

export default instance;