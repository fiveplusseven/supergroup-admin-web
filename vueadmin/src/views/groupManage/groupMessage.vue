<template>
    <div class="padding20">
        <el-row align="top" :gutter="20" type="flex">
            <el-col :span="2">群消息:</el-col>
            <el-col :span="22">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入待发送消息"
                    v-model="newsText"
                >
                </el-input>
            </el-col>
        </el-row>
        <el-row
            align="middle"
            :gutter="20"
            type="flex"
            style="margin-top: 20px"
        >
            <el-col :span="2">选择用户:</el-col>
            <el-col :span="22">
                <span>{{ activeName === "1" ? groupId : addUserList }}</span>
                <el-button
                    @click="openModal"
                    style="margin: 5px"
                    type="primary"
                    size="mini"
                    >选择用户</el-button
                >
            </el-col>
        </el-row>
        <el-row
            align="middle"
            justify="center"
            :gutter="20"
            type="flex"
            style="margin-top: 20px"
        >
            <el-col :span="24">
                <el-button size="mini" @click="cancel()" style="margin: 5px"
                    >取消</el-button
                >
                <el-button
                    size="mini"
                    type="primary"
                    @click="confrim()"
                    style="margin: 5px"
                    >发送</el-button
                >
            </el-col>
        </el-row>
        <el-dialog title="用户选择" :visible="visible">
            <SelectUser :id="id" :colseFun="colseModal"></SelectUser>
        </el-dialog>
    </div>
</template>

<script>
import { isEmpty } from "@/utils/auth";
import { mapGetters } from "vuex";
import SelectUser from "../../components/SelectUser";
export default {
    props: {},
    data() {
        return {
            newsText: "",
            visible: false,
            id: "",
        };
    },
    computed: {
        ...mapGetters(["confirmList", "addUserList", "activeName", "groupId"]),
    },
    created() {
        let { id } = this.$route.query;
        this.id = id;
    },
    mounted() {},
    watch: {},
    methods: {
        cancel() {
            this.$router.push({
                path: "/groupManage/groupList",
            });
        },
        confrim() {
            let activeName = this.activeName;
            let newsText = this.newsText;
            let { id } = this.$route.query;
            let addUserList = this.addUserList.split(/[(\r\n)\r\n]+/);
            let groupId = this.groupId;
            if (isEmpty(newsText)) {
                this.$message({
                    type: "warning",
                    message: "群消息不能为空!",
                });
                return;
            }
            let obj = {
                reciever_id: addUserList,
                message: newsText,
                broadcast: activeName === "2" ? false : true,
                groupId: activeName === "2" ? id : groupId,
            };
            if (activeName === "2" && addUserList.length === 0) {
                this.$message({
                    type: "warning",
                    message: "发送用户不能为空!",
                });
                return;
            }
            const loading = this.$loading({
                lock: true,
                text: "加载中",
            });
            this.$store
                .dispatch("addSendMessage", obj)
                .then(() => {
                    loading.close();
                    this.$router.go(-1);
                })
                .catch(loading.close());
        },
        openModal() {
            this.visible = true;
        },
        colseModal() {
            this.visible = false;
        },
    },
    components: { SelectUser },
};
</script>

<style scoped >
.padding20 {
    padding: 20px;
}
</style>
