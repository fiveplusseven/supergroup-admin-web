<template>
    <div>
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="群组导入" name="1">
                <el-row align="top" :gutter="20" type="flex">
                    <el-col :span="24">
                        <el-input
                            v-model="groupId"
                            placeholder="请输入群号"
                            @change="getSelectGroup()"
                        ></el-input>
                    </el-col>
                </el-row>
                <el-row
                    align="middle"
                    :gutter="20"
                    type="flex"
                    class="marginTop20"
                >
                    <el-col :span="24" class="err-text" v-show="errVisible">
                        这是一个无效的群号
                    </el-col>
                </el-row>
                <!-- <el-row
                    align="middle"
                    :gutter="20"
                    type="flex"
                    class="marginTop20"
                >
                    <el-col :span="4">
                        <el-avatar
                            size="medium"
                            :src="selectUserGroup.group_owner.avatar"
                        ></el-avatar>
                    </el-col>
                    <el-col :span="20">
                        {{ selectUserGroup.name }}
                    </el-col>
                </el-row> -->
                <el-row
                    align="middle"
                    :gutter="20"
                    type="flex"
                    class="marginTop20"
                >
                    <el-col :span="24">合计:{{ userList.length }}人</el-col>
                </el-row>
                <el-row
                    align="middle"
                    :gutter="20"
                    type="flex"
                    class="marginTop20"
                >
                    <el-col :span="24">
                        <el-button
                            style="float: right; margin: 5px"
                            type="primary"
                            size="mini"
                            @click="confirm()"
                            :disabled="groupId.length === 0"
                            >确认导入</el-button
                        >
                        <el-button
                            style="float: right; margin: 5px"
                            size="mini"
                            @click="cancel()"
                            >取消</el-button
                        >
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="纯文本" name="2">
                <el-row
                    align="middle"
                    :gutter="20"
                    type="flex"
                    class="marginTop20"
                >
                    <el-col :span="24"> 每行输入一个用户ID </el-col>
                </el-row>
                <el-row
                    align="top"
                    :gutter="20"
                    type="flex"
                    class="marginTop20"
                >
                    <el-col :span="24">
                        <el-input
                            type="textarea"
                            placeholder="输入用户ID(每行输入一个ID)"
                            v-model="userId"
                        ></el-input>
                    </el-col>
                </el-row>
                <el-row
                    align="middle"
                    :gutter="20"
                    type="flex"
                    class="marginTop20"
                >
                    <el-col :span="24">合计:2333人</el-col>
                </el-row>
                <el-row
                    align="middle"
                    :gutter="20"
                    type="flex"
                    class="marginTop20"
                >
                    <el-col :span="24">
                        <el-button
                            style="float: right; margin: 5px"
                            type="primary"
                            size="mini"
                            @click="confirm()"
                            :disabled="userId.length === 0"
                            >确认导入</el-button
                        >
                        <el-button
                            style="float: right; margin: 5px"
                            size="mini"
                            @click="cancel()"
                            >取消</el-button
                        >
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="上传文件" name="3">
                <el-row align="top" :gutter="20" type="flex">
                    <el-col :span="24">
                        <el-upload
                            class="upload-demo"
                            drag
                            :headers="getHeaders()"
                            action="https://dev-courses-admin-api.firesbox.com/v1/profits/cny_records/feedback"
                            :limit="1"
                            :on-success="onSuccess"
                        >
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">
                                将文件拖到此处，或<em>点击上传</em>
                            </div>
                        </el-upload>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { isEmpty } from "@/utils/auth";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
export default {
    props: {
        id: {
            type: String,
            default: "",
        },
        colseFun: {
            type: Function,
            default: null,
        },
    },
    data() {
        return {
            groupId: "",
            activeName: "1",
            errVisible: false,
            userId: "",
        };
    },
    computed: { ...mapGetters(["userList", "token"]) },
    created() {
        this.groupId = this.id;
        // download({})
        //     .then((response) => {
        //         var aaaa = "data:text/csv;charset=utf-8,\ufeff" + response;
        //         var link = document.createElement("a");
        //         link.setAttribute("href", aaaa);
        //         var filename = moment().format("YYYY-MM-DD HH:mm:ss");
        //         link.setAttribute("download", filename + ".csv");
        //         link.click();
        //         console.log(response);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    },
    mounted() {
        let groupId = this.groupId;
        if (!isEmpty(groupId)) {
            this.getSelectGroup();
        }
    },
    watch: {},
    methods: {
        cancel() {
            this.colseFun();
        },
        onSuccess(response) {
            this.$message({
                type: "success",
                message: "上传成功",
            });
        },
        onError(err) {
            this.$message({
                type: "warning",
                message: "上传成功",
            });
        },
        confirm() {
            let activeName = this.activeName;
            let userId = this.userId;
            let groupId = this.groupId;
            if (activeName === "1" && isEmpty(groupId)) {
                this.$message({
                    type: "warning",
                    message: "群号不能为空",
                });
                return;
            } else if (activeName === "2" && isEmpty(userId)) {
                this.$message({
                    type: "warning",
                    message: "用户ID不能为空",
                });
                return;
            }
            this.$confirm("是否确认导入?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    let userId = this.userId;
                    let groupId = this.groupId;
                    let activeName = this.activeName;
                    this.$store.dispatch("changeState", {
                        groupId,
                        addUserList: userId,
                        activeName,
                    });
                    this.colseFun();
                })
                .catch(() => {
                    this.$message({
                        type: "success",
                        message: "操作取消!",
                    });
                });
        },
        // addUser() {
        //     let userId = this.userId;
        //     // console.log(userId.split(/[(\r\n)\r\n]+/));
        // },
        getSelectGroup() {
            let id = this.groupId;
            const loading = this.$loading({
                lock: true,
                text: "加载中",
            });
            this.$store
                .dispatch("getUserList", { id })
                .then(() => loading.close())
                .catch(loading.close());
        },
        getHeaders() {
            return {
                Authorization: `Bearer ${getToken() || undefined}`,
            };
        },
    },
    components: {},
};
</script>

<style scoped >
.err-text {
    color: red;
}
.marginTop20 {
    margin-top: 20px;
}
</style>
