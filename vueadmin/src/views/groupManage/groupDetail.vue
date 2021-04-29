<template>
    <div>
        <el-card shadow="never">
            <div slot="header" class="clearfix">
                <span>群信息</span>
                <el-button
                    @click="openModal"
                    style="float: right; margin: 5px"
                    type="primary"
                    size="mini"
                >
                    编辑
                </el-button>
                <el-button
                    style="float: right; margin: 5px"
                    type="primary"
                    @click="openMessageModal"
                    size="mini"
                    >发消息</el-button
                >
            </div>
            <el-row align="middle" :gutter="20" type="flex">
                <el-col :span="5">
                    <el-row align="middle" type="flex">
                        <el-col :span="6">头像:</el-col>
                        <el-col :span="18">
                            <el-avatar
                                size="medium"
                                :src="groupDetail.group_owner.avatar"
                            ></el-avatar>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="5"> 群名称:{{ groupDetail.name }} </el-col>
                <el-col :span="5"> 群id:{{ groupDetail.id }} </el-col>
                <el-col :span="5">
                    群状态:{{ groupDetail.status === 1 ? "打开" : "关闭" }}
                </el-col>
                <el-col :span="5">
                    默认语言:{{ groupDetail.country_name }}
                </el-col>
            </el-row>
            <el-row align="middle" :gutter="20" type="flex">
                <el-col :span="24">
                    群简介:{{ groupDetail.group_mode }}
                </el-col>
            </el-row>
        </el-card>
        <el-card shadow="never">
            <el-row align="middle" :gutter="20" type="flex">
                <el-col :span="8">
                    创建时间:{{ groupDetail.created_at }}
                </el-col>
                <el-col :span="8">
                    更新时间:{{ groupDetail.updated_at }}
                </el-col>
                <el-col :span="8">
                    client_id:{{ groupDetail.client_id }}
                </el-col>
            </el-row>
        </el-card>
        <el-dialog title="编辑群信息" :visible="dialogVisible" width="300px">
            <el-row type="flex" align="middle" class="margin">
                <el-col :span="24" class="modal-avatar">
                    <el-avatar
                        :size="100"
                        :src="groupDetail.group_owner.avatar"
                    ></el-avatar>
                </el-col>
            </el-row>
            <el-row type="flex" align="middle" class="margin">
                <el-col :span="6"> 群名称: </el-col>
                <el-col :span="24">
                    <el-input v-model="name" placeholder="群名称"></el-input>
                </el-col>
            </el-row>
            <el-row type="flex" align="middle" class="margin">
                <el-col :span="6"> 群状态: </el-col>
                <el-col :span="24">
                    <el-switch
                        active-text="开启"
                        inactive-text="关闭"
                        active-value="1"
                        inactive-value="0"
                        v-model="status"
                    ></el-switch>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editDetail">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { isEmpty } from "@/utils/auth";
import { Message } from "element-ui";
import { mapGetters } from "vuex";
export default {
    props: {},
    data() {
        return {
            name: "",
            status: 1,
            dialogVisible: false,
        };
    },
    computed: { ...mapGetters(["groupDetail"]) },
    created() {},
    mounted() {
        const loading = this.$loading({
            lock: true,
            text: "加载中",
        });
        let { id } = this.$route.query;
        this.$store
            .dispatch("getGroupDetail", { id })
            .then(() => loading.close())
            .catch(loading.close());
    },
    watch: {},
    methods: {
        openMessageModal() {
            let { id } = this.$route.query;
            this.$router.push({
                path: "/groupManage/groupMessage",
                query: {
                    id,
                },
            });
        },
        editDetail() {
            let { id } = this.$route.query;
            let name = this.name;
            let status = this.status;
            if (isEmpty(name)) {
                Message({
                    message: "群名称不能为空",
                    type: "warning",
                    duration: 2 * 1000,
                });
            }
            this.$confirm("是否更新群信息?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    const loading = this.$loading({
                        lock: true,
                        text: "更新中",
                    });
                    this.$store
                        .dispatch("updataGroup", {
                            id,
                            name,
                            status: Number(status),
                        })
                        .then(() => {
                            loading.close();
                            this.dialogVisible = false;
                            Message({
                                message: "更新成功",
                                type: "success",
                                duration: 5 * 1000,
                            });
                        })
                        .catch(loading.close());
                })
                .catch(() => {
                    this.$message({
                        type: "success",
                        message: "操作取消!",
                    });
                });
        },
        openModal() {
            this.name = this.groupDetail.name;
            this.status = String(this.groupDetail.status);
            this.dialogVisible = true;
        },
    },
    components: {},
};
</script>

<style scoped >
.margin {
    margin: 10px;
}
.modal-avatar {
    /* margin: auto; */
    text-align: center;
}
</style>
