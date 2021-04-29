<template>
    <div>
        <div class="filter"></div>
        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="id" label="id" align="center">
            </el-table-column>
            <el-table-column prop="name" label="昵称" align="center">
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                    <div>{{ scope.row.status === 1 ? "开启" : "关闭" }}</div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                        @click="handleClick(scope.row, scope.$index)"
                        :type="scope.row.status === 1 ? 'danger' : 'primary'"
                        size="small"
                    >
                        {{ scope.row.status === 1 ? "关闭" : "开启" }}
                    </el-button>
                    <el-button
                        type="primary"
                        size="small"
                        @click="getDetail(scope.row, scope.$index)"
                        >详情</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    props: {},
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["filter", "list"]),
    },
    created() {},
    mounted() {
        const loading = this.$loading({
            lock: true,
            text: "加载中",
        });
        this.$store
            .dispatch("getList", this.filter)
            .then(() => loading.close())
            .catch(loading.close());
    },
    watch: {},
    methods: {
        handleClick(item, index) {
            console.log(item, index);
            let confirmText = `此操作将开起${
                item.status === 1 ? "关闭" : "开启"
            }群,是否继续?`;
            this.$confirm(confirmText, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    const loading = this.$loading({
                        lock: true,
                        text: "加载中",
                    });
                    this.$store
                        .dispatch("setGroupsChange", { item, index })
                        .then(() => {
                            loading.close();
                            this.$message({
                                type: "success",
                                message: "修改成功!",
                            });
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "success",
                        message: "操作取消!",
                    });
                });
        },
        getDetail(item, index) {
            this.$router.push({
                path: `/groupManage/groupDetail`,
                query: {
                    id: item.id,
                },
            });
        },
    },
    components: {},
};
</script>

<style scoped >
.filter {
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
</style>
