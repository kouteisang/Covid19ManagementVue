import { getToken, setToken, removeToken } from '@/utils/auth'
import qs from "qs";
import axios from 'axios'
// 存储用户令牌和角色信息
const state ={
    token: getToken(),
    roles: [],//角色，
    nowid:'',
    nowrole:-1

    ,
}

const mutations ={
    SET_TOKEN: (state,token) => {
        state.token = token;
    },
    SET_ROLES: (state,roles) => {
        state.roles = roles;
    },
    SET_ID: (state,id) => {
        state.nowid = id;
    }
};

const actions = {
    // 用户登录
    login({ commit }, userInfo) {
        var userRole=userInfo.role;
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                            // 保存状态
                            if (userRole == "MANAGER") {
                                state.nowrole=1;
                                commit('SET_TOKEN', 'manager');
                                // 写入cookie
                                setToken('manager')
                            } else {
                                state.nowrole=0;
                                commit('SET_TOKEN', 'user');
                                // 写入cookie
                                setToken('user')
                            }
                            resolve()


            },1)
        })
    },
    // 获取用户角色信息
    getInfo({ commit, state }){
        return new Promise((resolve) => {
            setTimeout(() => {
                const roles = [state.token]
                commit('SET_ROLES',roles)
                resolve({roles})
            },1000)
        })
    },
    // 重置令牌
    resetToken({ commit }){
        return new Promise(resolve => {
            commit('SET_TOKEN','')
            commit('SET_ROLES',[])
            removeToken();
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
