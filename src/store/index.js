import  Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        //token:'',
        username:''
    },
    mutations:{
        login(state,user){
            //state.token = user.token
            state.username = user.username
            //window.localStorage.setItem('token',user.token)
            window.localStorage.setItem('user',user.username)
        },
        // eslint-disable-next-line no-unused-vars
        logout(state){
            //window.localStorage.removeItem('token')
            window.localStorage.removeItem('user')
        }
    },
    actions:{

    },
    modules:{

    }
})

