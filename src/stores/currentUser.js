import { ref } from "vue";
import { defineStore } from "pinia";

export const useCurrentUserStore = defineStore("currentUser", () => {
    const isLoggedIn = ref(false);
    function toggleLoggedIn() {
        isLoggedIn.value = !isLoggedIn.value;
    }

    return { isLoggedIn, toggleLoggedIn };
});
