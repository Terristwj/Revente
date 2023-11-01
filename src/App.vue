<script>
import NavigationBar from "./components/NavigationBar.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
    data() {
        return {
            isOpen: false,
        };
    },
    components: {
        NavigationBar,
        FooterComponent,
    },
    methods: {
        toggleChatbot() {
            this.isOpen = !this.isOpen;
        },
    },

};
</script>

<template>
    <NavigationBar />
    <div id="content">
        <RouterView />
        <div class="chatbot-container" v-if="isOpen">
            <iframe allow="microphone;"
                src="https://console.dialogflow.com/api-client/demo/embedded/ae2dede1-2cfa-4ba7-8458-062aaf47c01b"
                class="chatbot"></iframe>
        </div>

    </div>
    <button id="chatbot-button" @click="toggleChatbot">
        <i class="fas fa-comment-alt"></i>
    </button>


    <FooterComponent />
</template>

<style scoped>
#chatbot-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 24px;
    cursor: pointer;
z-index: 999;
}

.chatbot-container {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 2;
}

.chatbot {
    border: none;
    overflow: hidden;
    margin: auto;
    display: block;
    width: 25dvw;
    height: 50dvh;
}

@media(max-width: 425px) {
    .chatbot {
        width: 75vw;
        height: 50dvh;
    }
}

@media(min-width:768px) {
    .chatbot {
        width: 50vw;
        height: 50dvh;
    }
}

@media(min-width:1024px) {
    .chatbot {
        width: 25vw;
        height: 50dvh;
    }
}


</style>
