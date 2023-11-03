<script>
import NavigationBar from "./components/NavigationBar.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
    data() {
        return {
            isChatOpen: false,
        };
    },
    components: {
        NavigationBar,
        FooterComponent,
    },
    methods: {
        toggleChatbot() {
            this.isChatOpen = !this.isChatOpen;

            let chatbot_button = document.getElementById("chatbot-button");
            let chatbot = document.getElementById("chatbot");

            if (this.isChatOpen) {
                chatbot_button.style.right = "50px";
                this.animateOpen(true, chatbot);
            } else {
                chatbot_button.style.right = "10px";
                this.animateOpen(false, chatbot);
            }
        },
        animateOpen(isChatOpen, chatbot) {
            let id = null;

            clearInterval(id);
            id = setInterval(frame, 25);

            // console.log(chatbot.style.width);
            function frame() {
                if (isChatOpen) {
                    chatbot.style.width = "100%";
                } else {
                    chatbot.style.width = "0%";
                }
                clearInterval(id);
            }
        },
    },
};
</script>

<template>
    <NavigationBar />
    <div id="content">
        <RouterView />
    </div>
    <div id="chatbot-container" v-show="isChatOpen">
        <iframe
            allow="microphone;"
            src="https://console.dialogflow.com/api-client/demo/embedded/ae2dede1-2cfa-4ba7-8458-062aaf47c01b"
            id="chatbot"
        ></iframe>
    </div>
    <button id="chatbot-button" @click="toggleChatbot">
        <i class="fas fa-comment-alt"></i>
    </button>

    <FooterComponent />
</template>

<style scoped>
#chatbot-button {
    position: fixed;
    bottom: 10px;
    right: 10px;

    width: 40px;
    height: 40px;

    background-color: #007bff;
    text-align: center;
    font-size: 16px;
    color: #fff;

    border: none;
    border-radius: 50%;

    cursor: pointer;
    z-index: 999;
}

#chatbot-container {
    position: fixed;
    bottom: 0;
    right: 0;

    width: 100%;
    height: 100%;

    z-index: 2;
}

#chatbot {
    border: 1px solid black;
    display: block;
    width: 100%;
    height: 100%;
}

@media (min-width: 768px) {
    #chatbot-container {
        width: 50vw;
        height: 60vh;
    }
}

@media (min-width: 1024px) {
    #chatbot-container {
        width: 35vw;
    }
}
</style>
