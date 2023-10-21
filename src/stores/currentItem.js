import { ref } from "vue";
import { defineStore } from "pinia";

export const useCurrentItemID = defineStore("currentItemID", () => {
    const ItemID = ref(null);

    function setItemID(uid) {
        ItemID.value = uid;
    }
    function getItemID() {
        return ItemID.value;
    }

    return {
        ItemID,
        setItemID,
        getItemID,
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

