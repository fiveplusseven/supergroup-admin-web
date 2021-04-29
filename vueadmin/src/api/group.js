import request from '@/utils/request'

export function getGroupList(data) {
    return request({
        url: `/v1/groups?start=${data.start || 1}&limit=${data.limit || 100}&keyword=${data.keyword || ""}`,
        method: 'GET',
        data
    })
}

export function groupsChange(data) {
    const type = data.status === 1 ? "stop" : "start";
    return request({
        url: `/v1/groups/${data.id}/${type}`,
        method: 'POST',
        data
    })
}

export function groupDetail(data) {
    return request({
        url: `/v1/groups/${data.id}`,
        method: 'GET',
        data
    })
}

export function updataGroups(data) {
    return request({
        url: `/v1/groups/${data.id}`,
        method: 'PATCH',
        data
    })
}
export function download(data) {
    return request({
        url: `/v1/profits/cny_records/download`,
        method: 'POST',
        data
    })
}
export function getUserLists(data) {
    return request({
        url: `/v1/groups/${data.id}/users?start=0&limit=100&keyword=""`,
        method: 'GET',
        data
    })
}
export function sendMessage(data) {
    return request({
        url: `/v1/groups/${data.groupId}/send_message`,
        method: 'POST',
        data
    })
}