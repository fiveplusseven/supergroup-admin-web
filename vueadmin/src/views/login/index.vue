<template>
    <div class="login-container"></div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {};
    },
    mounted() {
        let url = window.location.href;
        if (url.indexOf("code") > -1) {
            let data = url
                .split("&")[1]
                .substring(
                    url.split("&")[1].indexOf("code=") + "code=".length,
                    url.split("&")[1].length
                );
            this.getLogin(data);
        } else {
            window.location.href = `https://mixin-oauth.firesbox.com/?client_id=f52bd230-145a-4db5-ae47-8a74859ec2dc&scope=PROFILE%3AREAD%20PHONE%3AREAD&response_type=code&return_to=${url}`;
        }
    },
    methods: {
        getLogin(data) {
            let { redirect } = this.$route.query;
            this.$store
                .dispatch("login", data)
                .then(() => {
                    this.$router.push({ path: redirect || "/" });
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
