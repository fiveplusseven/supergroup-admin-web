import { getGroupList, groupDetail, groupsChange, updataGroups, getUserLists, sendMessage } from '@/api/group'
import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
    showSettings: showSettings,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
    filter: {
        start: 1,
        limit: 100,
        keyword: "",
    },
    list: [],
    groupDetail: {
        group_owner: {}
    },
    userList: [],
    confirmList: [],
    addUserList: "",
    groupId: "",
    activeName: ""

}

const getters = {
    filter: state => state.filter,
    list: state => state.list,
    groupDetail: state => state.groupDetail,
    userList: state => state.userList,
    confirmList: state => state.confirmList,
    addUserList: state => state.addUserList,
    activeName: state => state.activeName,
    groupId: state => state.groupId,
}
const mutations = {
    GET_LIST: (state, data) => {
        state.list = data.items;
        state.total = data.total;
        return state;
    },
    CHANGE_GROUPS: (state, data) => {
        let { obj, index } = data;
        state.list[index].status = obj.status;
        return state
    },
    GROUP_DETAIL: (state, data) => {
        let { groupDetail } = state;
        groupDetail = data;
        state.groupDetail = groupDetail;
        return state
    },
    SELECT_GROUP_DETAIL: (state, data) => {
        let { userList } = state;
        userList = data.item || [];
        state.userList = userList;
        return state
    },
    CHANGE_STATE: (state, data) => {
        let keys = Object.keys(data);
        keys.forEach(item => {
            state[item] = data[item]
        });
        return state
    }
}

const actions = {
    // 获取群列表
    getList({ commit }, data) {
        return new Promise((resolve, reject) => {
            getGroupList(data).then(response => {
                const { items, total } = response;
                commit("GET_LIST", { items, total });
                resolve(items, total)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 开起/关闭群
    setGroupsChange({ commit }, data) {
        return new Promise((resolve, reject) => {
            groupsChange(data.item).then(response => {
                const obj = response;
                commit("CHANGE_GROUPS", { obj, index: data.index });
                resolve()
            }).catch(error => reject(error))
        })
    },
    // 获取群信息
    getGroupDetail({ commit }, data) {
        return new Promise((resolve, reject) => {
            groupDetail(data).then(response => {
                const obj = response;
                commit("GROUP_DETAIL", obj);
                resolve()
            }).catch(error => reject(error))
        })
    },
    // 选择用户获取群信息
    getUserList({ commit }, data) {
        return new Promise((resolve, reject) => {
            getUserLists(data).then(response => {
                const obj = response;
                commit("SELECT_GROUP_DETAIL", obj);
                resolve()
            }).catch(error => reject(error))
        })
    },
    changeState({ commit }, data) {
        commit("CHANGE_STATE", data)
    },
    // 更新群信息
    updataGroup({ commit }, data) {
        return new Promise((resolve, reject) => {
            updataGroups(data).then(response => {
                const obj = response;
                commit("GROUP_DETAIL", obj);
                resolve()
            }).catch(error => reject(error))
        })
    },
    // 群发消息
    addSendMessage({ commit }, data) {
        return new Promise((resolve, reject) => {
            sendMessage(data).then(response => {
                resolve(response)
            }).catch(error => reject(error))
        })
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}

