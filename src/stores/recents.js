import { ref } from "vue";
import { defineStore } from "pinia";

export const useCurrentRecents = defineStore("currentRecents", () => {
    const recentsView = ref([]);

    function addRecents(uid) {
        recentsView.value.push(uid);
    }
    function getRecents() {
        return recentsView.value;
    }

    return {
        recentsView,
        addRecents,
        getRecents,
    };
});

/**
 *  Used to retrieve the current user that is logged in.
 *  Note: If using mounted, must call timeout()
 *  How to use:
 *
 *  1|   import { userStore } from "../main.js";
 *  2|
 *  3|   export default {
 *  4|      mounted() {
 *  5|          setTimeout(function () {
 *   6|              console.log(userStore.getUserID());
 *  7|          }, 2000);
 *  8|      },
 *  9|   }
 */
