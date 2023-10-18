import { ref } from "vue";
import { defineStore } from "pinia";

export const useCurrentUserStore = defineStore("currentUser", () => {
    const userID = ref(null);

    function setUserID(uid) {
        userID.value = uid;
    }
    function getUserID() {
        return userID.value;
    }

    return {
        userID,
        setUserID,
        getUserID,
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
