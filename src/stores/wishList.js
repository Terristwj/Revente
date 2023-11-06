import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";


export const useCurrentWishList = defineStore("currentWishList", () => {
    const wishList = useLocalStorage("wishList", []);

    function addWish(uid) {
        wishList.value.push(uid);
    }
    function getWishList() {
        return wishList.value;
    }

    function removeWish(uid) {
        console.log("remove");
        wishList.value.splice(wishList.value.indexOf(uid), 1);
        window.location.reload();
    }
    return {
        wishList,
        addWish,
        getWishList,
        removeWish
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
