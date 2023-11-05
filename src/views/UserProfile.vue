<script>
import { userStore } from "../main.js";
import router from "../router/router.js";

export default {
    data() {
        return {};
    },
    beforeMount() {
        setTimeout(function () {
            if (userStore.getUserID()) {
                // console.log(userStore.getUserID());
            } else {
                router.push("/login");
            }
        }, 2000);
    },
    created() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },
};
</script>

<template>
    <div id="Profile">
        <div id="Profile-Top" class="border border-1 mx-auto row">
            <div class="col-4 rounded-4 border border-danger ratio-1x1">
                <img src="" />
            </div>
            <div class="col">
                <div>User name</div>
                <div>
                    <div>Stars Review</div>
                    <div>Description</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#Profile-Top {
    width: 75%;
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
}
</style>
