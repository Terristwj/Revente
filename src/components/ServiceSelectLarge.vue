<template>
    <div id="ServiceSelectLarge">
        <div class="w-full rounded-2xl bg-custom-color custom-height">
            <div class="flex justify-between p-2">
                <div class="text-lg ml-2 text-gray-900 mt-14">
                    {{ text }}
                </div>
                <div class="mt-3 mr-1">
                    <img
                        :width="imageWidth"
                        :src="'img/uber/' + image + '.png'"
                        alt=""
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { toRefs, defineProps } from "vue";
const props = defineProps({
    text: String,
    imageWidth: String,
    image: String,
});
const { text, imageWidth, image } = toRefs(props);
</script>

<style lang="scss" scoped>
#ServiceSelectLarge {
    .bg-custom-color {
        background-color: rgb(237, 237, 237);
    }
    .custom-height {
        height: 100px;
    }
}
</style>
